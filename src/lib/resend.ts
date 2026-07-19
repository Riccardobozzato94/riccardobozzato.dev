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

// Production sender: riccardobozzato@gmail.com via Resend verified sender.
// Switch to hello@riccardobozzato.com once Resend domain verification completes.
export const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "riccardobozzato@gmail.com";
export const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "riccardobozzato@gmail.com";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.com";
