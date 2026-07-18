/**
 * HTML-escape a string for safe insertion into HTML templates.
 * Prevents XSS when rendering user-supplied values in emails or pages.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validate email format (basic but robust).
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Sanitize a string: trim, strip control characters, enforce max length.
 */
export function sanitizeInput(
  value: string,
  maxLength: number = 5000
): string {
  return value
    .trim()
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control chars
    .slice(0, maxLength);
}

/**
 * Validate and sanitize an email address.
 * Returns `null` if invalid, otherwise the sanitized email.
 */
export function sanitizeEmail(email: string): string | null {
  const sanitized = email.trim().toLowerCase().slice(0, 254);
  return isValidEmail(sanitized) ? sanitized : null;
}
