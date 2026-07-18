// Centralized social profiles for Riccardo Bozzato's PERSONAL site (riccardobozzato.dev).
// Single source of truth — used by Footer, Navbar, and any share components.
// Update handles here once, reflected everywhere.
//
// NOTE: riccardobozzato.dev is Riccardo's personal brand with a real identity.
// The faceless content channels (Instagram / YouTube / Twitch) belong to a
// SEPARATE faceless brand and are NOT surfaced here — they are kept only as
// placeholders, marked `placeholder: true`, and must not be linked/rendered
// on this personal site until the separate brand sites exist.

export type SocialProfile = {
  key: string;
  label: string;
  href: string;
  handle: string;
  // true = belongs to a separate (faceless) brand, not active on this personal site.
  placeholder?: boolean;
};

// Real, active profiles for the personal brand.
export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/Riccardobozzato94",
    handle: "@Riccardobozzato94",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/riccardobozzato/",
    handle: "in/riccardobozzato",
  },
  {
    key: "email",
    label: "Email",
    href: "mailto:riccardobozzato@gmail.com",
    handle: "riccardobozzato@gmail.com",
  },
  // --- Faceless channels: SEPARATE brand, placeholder only, do NOT render ---
  {
    key: "instagram",
    label: "Instagram",
    href: "https://instagram.com/riccardobozzato.com",
    handle: "@riccardobozzato.com",
    placeholder: true, // collegato al brand faceless separato — non attivo qui
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@riccardobozzato-dev",
    handle: "@riccardobozzato-dev",
    placeholder: true, // collegato al brand faceless separato — non attivo qui
  },
  {
    key: "twitch",
    label: "Twitch",
    href: "https://twitch.tv/riccardobozzato",
    handle: "riccardobozzato",
    placeholder: true, // collegato al brand faceless separato — non attivo qui
  },
];

// Active profiles only — use this in Navbar/Footer so faceless placeholders
// never appear on the personal site.
export const ACTIVE_PROFILES = SOCIAL_PROFILES.filter((p) => !p.placeholder);

// The 3 faceless content channels (priority for the SEPARATE faceless brand kit).
// Kept for reference; they are marked placeholder and excluded from ACTIVE_PROFILES.
export const FACELESS_CHANNELS = SOCIAL_PROFILES.filter((p) =>
  ["instagram", "youtube", "twitch"].includes(p.key),
);
