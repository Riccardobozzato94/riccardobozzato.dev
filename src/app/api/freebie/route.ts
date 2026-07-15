import { NextResponse } from "next/server";
import { getResendClient, FROM_EMAIL, TO_EMAIL } from "@/lib/resend";
import { createLead, markStepSent } from "@/lib/lead-store";
import { welcomeTemplate } from "@/lib/email/templates";
import { SEQUENCE } from "@/lib/email/sequence";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Resend client
    const resend = getResendClient();
    if (!resend) {
      console.log("📬 [DEV] Freebie download request:", { name, email });
      return NextResponse.json({
        success: true,
        directDownload: true,
        downloadUrl: "/files/ai-ops-security-playbook.pdf",
        message: "Here's your playbook! Download it directly below.",
      });
    }

    // ── 1. Save the lead ──
    const lead = await createLead(name, email);

    // ── 2. Send Welcome Email (Step 0) ──
    const welcomeHtml = welcomeTemplate({
      name: lead.name,
      email: lead.email,
      unsubscribeToken: lead.unsubscribeToken,
    });

    await resend.emails.send({
      from: `Riccardo Bozzato <${FROM_EMAIL}>`,
      to: lead.email,
      subject: SEQUENCE[0].subject,
      html: welcomeHtml,
    });

    // Mark step 0 as sent
    await markStepSent(lead.email, 0);

    // ── 3. Notify me ──
    await resend.emails.send({
      from: `Freebie Alert <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `🎯 New Lead: ${lead.name} <${lead.email}>`,
      html: `
        <h2>New Playbook Download</h2>
        <table style="border-collapse:collapse;width:100%;max-width:400px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Name</td><td style="padding:8px;border:1px solid #ddd;">${lead.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:8px;border:1px solid #ddd;">${lead.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Date</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toLocaleString()}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Lead ID</td><td style="padding:8px;border:1px solid #ddd;">${lead.id}</td></tr>
        </table>
        <p style="margin-top:16px;font-size:13px;color:#666;">
          Welcome email sent. Follow-up sequence started (Day 1 in 24h).
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Check your inbox! The playbook is on its way.",
    });
  } catch (error) {
    console.error("Freebie download error:", error);
    return NextResponse.json(
      { error: "Failed to send the playbook. Please try again." },
      { status: 500 }
    );
  }
}
