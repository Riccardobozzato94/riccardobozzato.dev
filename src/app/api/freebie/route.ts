import { NextResponse } from "next/server";
import { getResendClient, FROM_EMAIL, FROM_NAME, TO_EMAIL, APP_URL } from "@/lib/resend";
import { createLead } from "@/lib/lead-store";
import { confirmationTemplate } from "@/lib/email/templates";
import { rateLimit } from "@/lib/rate-limit";
import { escapeHtml, sanitizeInput, sanitizeEmail } from "@/lib/escape";

export async function POST(request: Request) {
  // ── CSRF check: only accept requests from the site's own origin ──
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowedOrigins = [
    "https://riccardobozzato.com",
    "https://www.riccardobozzato.com",
    "https://idyllic-cranachan-b2c666.netlify.app",
    "http://localhost:3000",
    "http://localhost:3001",
  ];
  const isAllowed = (url: string | null) =>
    url && allowedOrigins.some((o) => url.startsWith(o));
  if (!isAllowed(origin) && !isAllowed(referer)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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

  try {
    const { name: rawName, email: rawEmail, consent: rawConsent } = await request.json();
    const name = sanitizeInput(rawName, 100);
    const email = sanitizeEmail(rawEmail);
    const consent = !!rawConsent;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "You must consent to receive the email sequence." },
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
        downloadUrl: "/files/operational-chaos-diagnostic.pdf",
        message: "Here's your diagnostic! Download it directly below.",
      });
    }

    // ── 1. Save the lead (status = pending, confirmToken generated) ──
    const lead = await createLead(name, email);

    // ── 2. Send Confirmation Email (double opt-in) + notify (resilient) ──
    const confirmUrl = `${APP_URL}/confirm?token=${lead.confirmToken}`;
    const confirmHtml = confirmationTemplate({
      name: lead.name,
      email: lead.email,
      confirmUrl,
      unsubscribeToken: lead.unsubscribeToken,
    });

    let emailSent = false;
    try {
      await resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: lead.email,
        subject: "Please confirm your subscription",
        html: confirmHtml,
      });
      emailSent = true;
    } catch (sendError) {
      console.error("Freebie confirmation email failed:", {
        email: lead.email,
        error: sendError instanceof Error ? sendError.message : sendError,
      });
    }

    // Notify me (best-effort, never blocks the user)
    try {
      await resend.emails.send({
        from: `${FROM_NAME} (Alert) <${FROM_EMAIL}>`,
        to: TO_EMAIL,
        subject: `New Pending Lead: ${lead.name}`,
        html: `
          <h2>New Playbook Download (Pending Confirmation)</h2>
          <table style="border-collapse:collapse;width:100%;max-width:400px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Name</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(lead.name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(lead.email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Date</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toLocaleString()}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Lead ID</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(lead.id)}</td></tr>
          </table>
          <p style="margin-top:16px;font-size:13px;color:#666;">
            Confirmation email sent: ${emailSent}. Sequence starts after double opt-in.
          </p>
        `,
      });
    } catch {
      // ignore notify failure
    }

    // If the confirmation email failed, still deliver the playbook directly
    // so the user is never blocked. The lead is saved for manual follow-up.
    if (!emailSent) {
      return NextResponse.json({
        success: true,
        directDownload: true,
        downloadUrl: "/files/operational-chaos-diagnostic.pdf",
        message: "Here's your diagnostic! Download it directly below.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Check your inbox! Click the confirmation link to get your diagnostic.",
    });
  } catch (error) {
    console.error("Freebie download error:", error);
    // Last-resort: never block the user. Offer direct download.
    return NextResponse.json({
      success: true,
      directDownload: true,
      downloadUrl: "/files/operational-chaos-diagnostic.pdf",
      message: "Here's your diagnostic! Download it directly below.",
    });
  }
}
