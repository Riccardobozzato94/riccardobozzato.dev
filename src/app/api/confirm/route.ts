import { NextResponse } from "next/server";
import { confirmLead } from "@/lib/lead-store";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  // ── Rate limiting (20 req/IP/60s) ──
  const limit = rateLimit(request, 20);
  if (limit.limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfter),
          "X-RateLimit-Limit": "20",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Missing confirmation token." },
        { status: 400 }
      );
    }

    const lead = await confirmLead(token);

    if (!lead) {
      return NextResponse.json(
        { error: "Invalid or expired confirmation token." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      name: lead.name,
    });
  } catch (error) {
    console.error("Confirmation error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
