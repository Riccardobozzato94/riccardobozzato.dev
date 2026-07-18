import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { appendContactFallback } from "@/lib/contact-fallback";
import { escapeHtml, sanitizeInput, sanitizeEmail } from "@/lib/escape";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const fromEmail = process.env.CONTACT_FROM_EMAIL || "riccardobozzato@gmail.com";
const toEmail = process.env.CONTACT_TO_EMAIL || "riccardobozzato@gmail.com";

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
    const raw = await request.json();
    const name = sanitizeInput(raw.name, 100);
    const email = sanitizeEmail(raw.email);
    const message = sanitizeInput(raw.message, 5000);

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
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
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
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
