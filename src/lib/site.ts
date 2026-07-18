// Single source of truth for site-wide URLs and identity.
// Replaces scattered `process.env.NEXT_PUBLIC_APP_URL || "..."` fallbacks.

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.com";

export const SITE_NAME = "riccardobozzato.com";

export const SITE_DESCRIPTION =
  "The personal site of Riccardo Bozzato — builder of AI-powered dev tools (VulnClaw, ShipKit, OmniVoice) and independent consultant helping solo developers and small teams ship secure, serverless, AI-integrated systems. Fractional CTO, DevSecOps and AI integration, from €1,500.";

export const OG_IMAGE = "/assets/shipkit-banner-1600x900.png";
