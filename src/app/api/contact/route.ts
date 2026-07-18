import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { appendContactFallback } from "@/lib/contact-fallback";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
const toEmail = process.env.CONTACT_TO_EMAIL || "riccardobozzato@gmail.com";

export async function POST(request: Request) {
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
    const { name, email, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // If Resend is not configured, return success (dev mode)
    const resend = getResend();
    if (!resend) {
      console.log("📬 [DEV] Contact form submission:", { name, email, message });
      return NextResponse.json({
        success: true,
        message: "Message received (dev mode — no email sent).",
      });
    }

    // Send email via Resend. If it fails, we must NOT lose the lead: persist a
    // fallback record and still return success so the user isn't blocked.
    try {
      await resend.emails.send({
        from: `Contact Form <${fromEmail}>`,
        to: toEmail,
        subject: `New Contact from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch (sendError) {
      console.error("Contact form email failed — saving fallback lead:", {
        name,
        email,
        messageLength: message.length,
        error: sendError instanceof Error ? sendError.message : sendError,
      });
      await appendContactFallback({ name, email, message });
      // Lead is safely stored; inform the user of success without exposing the
      // delivery failure. The fallback file is the source of truth for recovery.
      return NextResponse.json({
        success: true,
        message: "Message received! We'll get back to you soon.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
