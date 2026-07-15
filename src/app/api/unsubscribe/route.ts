import { NextResponse } from "next/server";
import { getLeadByToken, unsubscribeLead } from "@/lib/lead-store";

export async function GET(request: Request) {
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
