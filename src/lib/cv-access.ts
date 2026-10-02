import crypto from "crypto";
import fs from "fs";
import path from "path";

/**
 * Signed, expiring access to the CV file.
 *
 * WHY NOT JUST LINK THE PDF: anything under public/ is fetchable by URL. A
 * gate that only adds a form in front of a static file is a form, not a gate —
 * the address it collects proves nothing when the file is one `curl` away.
 *
 * So the PDF lives OUTSIDE public/ and is streamed by /api/cv/file only for a
 * request carrying a token minted by /api/cv. The token is an HMAC over the
 * expiry with a server-side secret, so it cannot be forged and cannot be
 * replayed forever.
 *
 * This is deliberately not DRM. Someone who captures a token can share it until
 * it expires (15 minutes). What it does buy: no permanent public URL, no
 * scraper-friendly link in the HTML, and an access log that has an email in it.
 */

const CV_PATH = path.join(process.cwd(), "private", "CV-Riccardo-Bozzato.pdf");

/** Short enough that a leaked link dies on its own. */
const TOKEN_TTL_MS = 15 * 60 * 1000;

function secret(): string | null {
  // JWT_SECRET is already required in production by the admin auth, so reuse it
  // rather than asking for one more environment variable.
  return process.env.JWT_SECRET || null;
}

/** `expiry.signature`, both base64url. */
export function issueCvToken(now: number = Date.now()): string | null {
  const key = secret();
  if (!key) return null;

  const expiry = now + TOKEN_TTL_MS;
  const sig = crypto
    .createHmac("sha256", key)
    .update(`cv:${expiry}`)
    .digest("base64url");

  return `${expiry}.${sig}`;
}

export function verifyCvToken(token: string | null, now: number = Date.now()): boolean {
  const key = secret();
  if (!key || !token) return false;

  const [expiryRaw, sig] = token.split(".");
  const expiry = Number(expiryRaw);
  if (!Number.isFinite(expiry) || !sig) return false;
  if (now > expiry) return false;

  const expected = crypto
    .createHmac("sha256", key)
    .update(`cv:${expiry}`)
    .digest("base64url");

  // Constant-time: a length-independent string compare would leak the
  // signature one byte at a time.
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function readCvPdf(): Buffer | null {
  try {
    return fs.readFileSync(CV_PATH);
  } catch (error) {
    // Loud: a missing CV must not look like a permissions problem.
    console.error("CV file not readable at", CV_PATH, error);
    return null;
  }
}