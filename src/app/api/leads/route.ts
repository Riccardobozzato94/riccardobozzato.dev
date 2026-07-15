import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/lead-store";

/**
 * GET /api/leads — Returns all leads (admin only).
 * Protected by a simple API key check.
 */
export async function GET(request: Request) {
  // Simple auth: check for a secret key in the header
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.LEADS_API_KEY;

  if (adminKey && authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getAllLeads();

    return NextResponse.json({
      success: true,
      total: leads.length,
      active: leads.filter((l) => !l.unsubscribed).length,
      unsubscribed: leads.filter((l) => l.unsubscribed).length,
      leads: leads.map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        signupDate: l.signupDate,
        lastStepSent: l.lastStepSent,
        unsubscribed: l.unsubscribed,
        // Don't expose unsubscribeToken
      })),
    });
  } catch (error) {
    console.error("Leads API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}
