/**
 * Abuse protection for public form endpoints.
 *
 * Layered, cheapest-first:
 *   1. honeypot     — a field no human ever sees; kills naive scripted submits
 *   2. timing       — a submit faster than a human can type is a bot
 *   3. per-IP limit — the in-memory sliding window from lib/rate-limit
 *   4. optional     — Cloudflare Turnstile, enabled by setting
 *                     TURNSTILE_SECRET_KEY + NEXT_PUBLIC_TURNSTILE_SITE_KEY
 *
 * Everything here fails CLOSED on the abuse check and OPEN on the user path:
 * a rejected submit must look like nothing happened to a scraper, but a real
 * visitor must never lose a submission because a protection layer misfired.
 */

import { rateLimit, type RateLimitResult } from "./rate-limit";

export type AbuseConfig = {
  /** Requests allowed per window. */
  max: number;
  /** Window length in seconds. */
  windowSeconds: number;
};

export type AbuseInput = {
  request: Request;
  /** Value of the honeypot field. Any non-empty value is a bot. */
  honeypot?: unknown;
  /** Timestamp (ms) when the form was rendered. */
  formLoadedAt?: unknown;
  /** Minimum seconds between render and submit. */
  minSeconds?: number;
  config: AbuseConfig;
  /** Turnstile token from the widget, when the widget is enabled. */
  turnstileToken?: unknown;
};

export type AbuseResult =
  | { ok: true; rateLimit: RateLimitResult }
  | { ok: false; reason: "rate_limit" | "honeypot" | "too_fast" | "turnstile"; retryAfter?: number };

function parseTimestamp(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  // Heuristic: values that look like seconds are promoted to ms.
  return n < 1e12 ? n * 1000 : n;
}

/**
 * Runs every check in order of cost. Returns on the first failure.
 */
export async function checkAbuse(input: AbuseInput): Promise<AbuseResult> {
  const { request, config } = input;

  // 3. Rate limit first: it is in-memory and free.
  const rl = rateLimit(request, config.max);
  if (rl.limited) {
    return { ok: false, reason: "rate_limit", retryAfter: rl.retryAfter };
  }

  // 1. Honeypot. Empty string / undefined is what a real browser sends.
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") {
    return { ok: false, reason: "honeypot" };
  }

  // 2. Timing. A human cannot read a page and submit in under two seconds.
  const loadedAt = parseTimestamp(input.formLoadedAt);
  const minSeconds = input.minSeconds ?? 2;
  if (loadedAt !== null && Date.now() - loadedAt < minSeconds * 1000) {
    return { ok: false, reason: "too_fast" };
  }

  // 4. Turnstile, when configured.
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const token = input.turnstileToken;
    if (typeof token !== "string" || token.length < 10) {
      return { ok: false, reason: "turnstile" };
    }
    const verified = await verifyWithCloudflare(token, request);
    if (!verified) return { ok: false, reason: "turnstile" };
  }

  return { ok: true, rateLimit: rl };
}

async function verifyWithCloudflare(token: string, request: Request): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Cloudflare unreachable: fail open so a real user is not locked out.
    return true;
  }
}

/** Standard 429 payload. */
export function tooManyRequests(retryAfter: number) {
  return {
    status: 429,
    body: { error: "Too many requests. Please try again later." },
    headers: {
      "Retry-After": String(retryAfter),
      "X-RateLimit-Remaining": "0",
    },
  };
}
