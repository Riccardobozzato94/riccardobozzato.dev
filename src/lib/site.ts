// Single source of truth for site-wide URLs and identity.
// Replaces scattered `process.env.NEXT_PUBLIC_APP_URL || "..."` fallbacks.

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.com";

export const SITE_NAME = "riccardobozzato.com";

export const SITE_DESCRIPTION =
  "AI Product Manager & AI Transformation Lead (PMP®, ex Accenture). Agenti AI, automazioni e processi enterprise con risultati misurabili. Disponibile subito — remote EU (CET ±2).";

export const OG_IMAGE = "/images/og-default.svg";
