import { NextResponse } from "next/server";
import { getAllLeads, getAllCvDownloads, backendInfo } from "@/lib/lead-store";
import { rateLimit } from "@/lib/rate-limit";

/**
 * GET /api/leads — Returns all leads (admin only).
 * Protected by a simple API key check.
 */
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

  // Simple auth: check for a secret key in the header
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.LEADS_API_KEY;

  // Fail-closed: if LEADS_API_KEY is not set, block access instead of allowing it
  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getAllLeads();
    const info = backendInfo();
    // CV downloads live in their own collection (see recordCvDownload) and are
    // NOT part of the sequence. Surfaced here so they are visible at all.
    const cvDownloads = await getAllCvDownloads();

    return NextResponse.json({
      success: true,
      storage: info,
      total: leads.length,
      pending: leads.filter((l) => l.status === "pending").length,
      confirmed: leads.filter((l) => l.status === "confirmed").length,
      active: leads.filter((l) => !l.unsubscribed).length,
      unsubscribed: leads.filter((l) => l.unsubscribed).length,
      cvDownloads: cvDownloads.length,
      leads: leads.map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        status: l.status,
        signupDate: l.signupDate,
        lastStepSent: l.lastStepSent,
        unsubscribed: l.unsubscribed,
        // Don't expose unsubscribeToken / confirmToken
      })),
      cv: cvDownloads.map((c) => ({
        id: c.id,
        email: c.email,
        requestedAt: c.requestedAt,
        source: c.source,
      })),
    });
  } catch (error) {
    console.error("Leads API error:", error);
    // Surface the backend failure — this endpoint is how the funnel gets
    // diagnosed, so a generic 500 here is not enough.
    return NextResponse.json(
      {
        error: "Failed to fetch leads.",
        storage: backendInfo(),
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
