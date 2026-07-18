import { NextResponse } from "next/server";
import { getLeadByToken, unsubscribeLead } from "@/lib/lead-store";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  // ── Rate limiting (5 req/IP/60s) ──
  const limit = rateLimit(request);
  if (limit.limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfter),
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing unsubscribe token." },
      { status: 400 }
    );
  }

  // Verify token exists
  const lead = await getLeadByToken(token);
  if (!lead) {
    return NextResponse.json(
      { error: "Invalid or expired unsubscribe link." },
      { status: 404 }
    );
  }

  // Already unsubscribed?
  if (lead.unsubscribed) {
    return NextResponse.json({
      success: true,
      message: "You're already unsubscribed.",
      alreadyUnsubscribed: true,
    });
  }

  // Process unsubscribe
  await unsubscribeLead(token);

  return NextResponse.json({
    success: true,
    message: "You've been unsubscribed successfully.",
  });
}
