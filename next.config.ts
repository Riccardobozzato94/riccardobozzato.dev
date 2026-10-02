import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Security headers applied by Next for every route.
//
// ATTENTION: this is the ONLY place that actually takes effect in production.
// The Netlify Next.js Runtime serves these from the Next build and overrides
// the `[[headers]]` block in netlify.toml (verified 2026-10-02: live HSTS was
// 31536000 — the Netlify default — not the 63072000 declared in netlify.toml,
// and Permissions-Policy was missing entirely). Keep both in sync.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Le seguenti due erano solo in netlify.toml, che in produzione NON viene
  // applicato: HSTS live era il default Netlify (31536000) e Permissions-Policy
  // era assente. Riprodotte qui per non perderle.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data: https:",
      // 'unsafe-inline' è richiesto da Next per i payload RSC/flight inline.
      // unpkg = Decap CMS admin, identity.netlify.com = Netlify Identity widget.
      // www.googletagmanager.com + google-analytics = GA4 (gtag.js in layout.tsx).
      // Senza questi domini GA era bloccato in produzione.
      "script-src 'self' 'unsafe-inline' https://unpkg.com https://identity.netlify.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.resend.com https://identity.netlify.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
         unoptimized: true, //
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // ric2brain -> Synapse rebrand (301). Old URLs keep working.
  async redirects() {
    return [
      {
        source: "/:locale/projects/ric2brain",
        destination: "/:locale/projects/synapse",
        permanent: true,
      },
      {
        source: "/projects/ric2brain",
        destination: "/en/projects/synapse",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
