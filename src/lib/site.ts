// Single source of truth for site-wide URLs and identity.
// Replaces scattered `process.env.NEXT_PUBLIC_APP_URL || "..."` fallbacks.

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.com";

export const SITE_NAME = "riccardobozzato.com";

export const SITE_DESCRIPTION =
  "Delivery Manager & Head of Operations (PMP®) da Legnaro, PD. Rendo i team digitali più veloci, meno caotici e più prevedibili. €500K+ consegnati, team 8-12, -40% time-to-market. Disponibile da subito.";

export const OG_IMAGE = "/images/og-default.svg";
