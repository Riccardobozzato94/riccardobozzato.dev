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

// IMPORTANT: In production, set CONTACT_FROM_EMAIL to a verified sender domain in Resend.
// Default below only works in dev mode (Resend sandbox delivers only to owner).
export const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "hello@riccardobozzato.com";
export const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "riccardobozzato@gmail.com";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.com";
