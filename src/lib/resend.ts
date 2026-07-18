import { Resend } from "resend";

let _client: Resend | null = null;

export function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_client) {
    _client = new Resend(key);
  }
  return _client;
}

// Production sender: emails are sent FROM riccardobozzato@gmail.com.
// Resend allows sending from a verified Gmail address via the "Verified
// Senders" feature (Personal, one-time confirmation) — no domain DNS needed.
// Override with CONTACT_FROM_EMAIL env var if a custom sender is configured later.
export const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "riccardobozzato@gmail.com";
export const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "riccardobozzato@gmail.com";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.com";
