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

// Sender configuration:
// ✅ riccardobozzato@gmail.com — verified in Resend as single sender
//    Used for all transactional emails (contact, freebie, confirm, etc.)
//
// 💡 Set CONTACT_FROM_EMAIL in Netlify env vars to override if needed.
export const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "riccardobozzato@gmail.com";
export const FROM_NAME = process.env.CONTACT_FROM_NAME || "Riccardo Bozzato";
export const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "riccardobozzato@gmail.com";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.com";
