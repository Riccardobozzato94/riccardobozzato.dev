/**
 * In-memory sliding-window rate limiter.
 *
 * Protects public API routes from abuse / token-drain (e.g. bursting the
 * contact form, freebie, leads, unsubscribe endpoints).
 *
 * LIMITS: max 5 requests per IP per 60s window. Exceeding returns a 429.
 *
 * ⚠️ PRODUCTION NOTE: Netlify serverless functions are stateless and run across
 * many instances/lambdas, so this in-memory map is NOT shared between
 * invocations or function instances. It only mitigates bursts within a single
 * warm instance. The production-grade fix is a shared store (Netlify Blobs,
 * Upstash/Redis, or Cloudflare KV) keyed by IP. Replace `store` below with a
 * backed store to get global enforcement.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

// IP -> array of request timestamps (ms) within the current window.
const store = new Map<string, number[]>();

function getClientIp(request: Request): string {
  // Netlify / standard proxies forward the real IP here.
  const forwarded = request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list; take the first hop.
    return forwarded.split(",")[0]!.trim();
  }
  return "unknown";
}

export interface RateLimitResult {
  limited: boolean;
  remaining: number;
  retryAfter: number;
}

export function rateLimit(request: Request): RateLimitResult {
  const ip = getClientIp(request);
  const now = Date.now();

  const timestamps = store.get(ip) ?? [];
  // Drop timestamps outside the window.
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0]!;
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);
    store.set(ip, recent);
    return { limited: true, remaining: 0, retryAfter: Math.max(retryAfter, 1) };
  }

  recent.push(now);
  store.set(ip, recent);

  return {
    limited: false,
    remaining: Math.max(MAX_REQUESTS - recent.length, 0),
    retryAfter: 0,
  };
}
