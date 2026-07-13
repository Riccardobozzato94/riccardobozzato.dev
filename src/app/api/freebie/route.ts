import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

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

    // If Resend is not configured, log and return success (dev mode)
    const resend = getResend();
    if (!resend) {
      console.log("📬 [DEV] Freebie download request:", { name, email });
      return NextResponse.json({
        success: true,
        message: "Check your inbox! The playbook is on its way. (dev mode — no email sent)",
      });
    }

    // Send the playbook via Resend
    await resend.emails.send({
      from: `Riccardo Bozzato <${fromEmail}>`,
      to: email,
      subject: "Your AI Ops Security Playbook is here!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #22C55E;">Your Playbook Has Arrived 🚀</h1>
          <p>Hey ${name},</p>
          <p>Thanks for downloading the <strong>AI Ops Security Playbook</strong>.</p>
          <p>Here's your download link:</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.netlify.app"}/files/ai-ops-security-playbook.pdf"
               style="background: #22C55E; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Download the Playbook →
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, reply to this email and I'll send it directly.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
          <p style="color: #999; font-size: 12px;">
            Riccardo Bozzato — Head of Ops & AI Security Builder<br>
            <a href="https://riccardobozzato.netlify.app" style="color: #22C55E;">riccardobozzato.netlify.app</a>
          </p>
        </div>
      `,
    });

    // Also notify me
    await resend.emails.send({
      from: `Freebie Alert <${fromEmail}>`,
      to: "riccardobozzato@gmail.com",
      subject: `New Playbook Download: ${name} <${email}>`,
      html: `<p>New download: ${name} (${email})</p>`,
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
