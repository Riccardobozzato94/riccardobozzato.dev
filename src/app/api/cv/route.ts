import { NextResponse } from "next/server";
import { recordCvDownload } from "@/lib/lead-store";
import { checkAbuse } from "@/lib/abuse";
import { sanitizeEmail, sanitizeInput } from "@/lib/escape";
import { issueCvToken } from "@/lib/cv-access";

/**
 * POST /api/cv — Gate in front of the CV download.
 *
 * WHY: the CV used to be a plain link to a file under public/. Two problems:
 *   1. the file was a 1-page text-only stub, so the "download" handed over
 *      almost nothing;
 *   2. it was fetchable by URL, so collecting an email in front of it would have
 *      proven nothing.
 *
 * The PDF now lives outside public/ and is streamed by /api/cv/file against a
 * short-lived signed token. See lib/cv-access.ts.
 *
 * The address is stored in its own collection (see recordCvDownload) and starts
 * NO email sequence. The form says so, because "leave your email" with no
 * stated purpose is exactly what people bounce from.
 */

const ALLOWED_ORIGINS = [
  "https://riccardobozzato.com",
  "https://www.riccardobozzato.com",
  "https://riccardobozzato.dev",
  "https://www.riccardobozzato.dev",
  "https://idyllic-cranachan-b2c666.netlify.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const isAllowed = (url: string | null) =>
    !!url && ALLOWED_ORIGINS.some((o) => url.startsWith(o));

  if (!isAllowed(origin) && !isAllowed(referer)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const abuse = await checkAbuse({
    request,
    honeypot: payload?.website,
    formLoadedAt: payload?.ts,
    turnstileToken: payload?.turnstileToken,
    // Lower than /api/freebie: this endpoint sends no email, it mints one token
    // and writes one row. The limit caps store writes, not outbound mail.
    config: { max: 10, windowSeconds: 60 },
  });

  // Without a secret nothing can be signed, so there is nothing to gate. Say so
  // instead of pretending the download worked.
  const token = issueCvToken();
  if (!token) {
    console.error("JWT_SECRET missing: cannot issue a CV token.");
    return NextResponse.json(
      { error: "Download temporarily unavailable." },
      { status: 503 }
    );
  }
  const downloadUrl = `/api/cv/file?t=${encodeURIComponent(token)}`;

  if (!abuse.ok) {
    if (abuse.reason === "rate_limit") {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(abuse.retryAfter ?? 60),
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
    // Bots get the same shape of answer a person gets. Reporting the honeypot
    // would be a free fingerprinting oracle.
    console.warn("[abuse] cv rejected", { reason: abuse.reason });
    return NextResponse.json({ success: true, downloadUrl });
  }

  try {
    const email = sanitizeEmail(
      typeof payload?.email === "string" ? payload.email : ""
    );
    const consent = payload?.consent === true;

    if (!email) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Required because the address is stored and read by a human.
    if (!consent) {
      return NextResponse.json(
        { error: "Consent is required to store the address." },
        { status: 400 }
      );
    }

    const source = sanitizeInput(
      typeof payload?.source === "string" ? payload.source : "unknown",
      40
    );

    try {
      await recordCvDownload(email, source);
    } catch (storeError) {
      // The visitor still gets the CV. Losing the row is bad; blocking the
      // download over a storage blip is worse — but it is logged loudly.
      console.error("CV download store FAILED (lead not recorded):", {
        email,
        error: storeError instanceof Error ? storeError.message : storeError,
      });
    }

    return NextResponse.json({ success: true, downloadUrl });
  } catch (error) {
    console.error("CV gate error:", error);
    // Never strand the visitor: hand the file over regardless.
    return NextResponse.json({ success: true, downloadUrl });
  }
}