import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import { Analytics } from "@/components/Analytics";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Footer, CookieConsent, SiteChatbot } from "@/components/ClientOnlyComponents";
import "@/styles/globals.css";

const baseUrl = SITE_URL;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("site");

  const title = t("title");
  const description = t("description");
  const localeMap: Record<string, string> = { en: "en_US", it: "it_IT" };
  const lang = localeMap[locale] || "en_US";
  const altLang = locale === "en" ? "it_IT" : "en_US";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${title}`,
      default: `${title} — ${t("tagline")}`,
    },
    description,
    openGraph: {
      title: `${title} — Head of Operations | Delivery Manager | PMP®`,
      description,
      url: baseUrl,
      siteName: title,
      locale: lang,
      alternateLocale: [altLang],
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${title} — ${t("tagline")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/og-default.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
    // PWA / mobile: manifest gives the home-screen name and icon.
    // `themeColor` does NOT belong here — Next 15+ reads it from the
    // `viewport` export below, and silently drops it from `metadata`.
    manifest: "/site.webmanifest",
    appleWebApp: {
      // Next emits `mobile-web-app-capable`, which iOS ignores: it only reads
      // the `apple-` prefix. So the legacy tag goes in <head> by hand below.
      capable: true,
      title: "Riccardo Bozzato",
      statusBarStyle: "black-translucent",
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        it: `${baseUrl}/it`,
      },
    },
  };
}

// Tints the mobile browser chrome so the address bar blends into the dark UI.
// Kept out of generateMetadata because viewport cannot vary per locale.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Do not block pinch-zoom: capping it is an accessibility failure (WCAG 1.4.4)
  // and iOS ignores it anyway.
  maximumScale: 5,
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const isIt = locale === "it";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Riccardo Bozzato",
        givenName: "Riccardo",
        familyName: "Bozzato",
        email: "riccardobozzato@gmail.com",
        telephone: "+393892139542",
        jobTitle: "Head of Operations | Delivery Manager | PMP®",
        worksFor: {
          "@type": "Organization",
          name: "Riccardo Bozzato Consulting",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Legnaro",
          addressRegion: "PD",
          addressCountry: "IT",
        },
        url: SITE_URL,
        sameAs: [
          "https://github.com/Riccardobozzato94",
          "https://linkedin.com/in/riccardobozzato",
        ],
      },
      {
        "@type": "ProfessionalService",
        name: "Riccardo Bozzato — Operations & Delivery",
        description: isIt
          ? "Delivery Manager & Head of Operations (PMP®). Operations, delivery ed execution con risultati misurabili. €500K+ portfolio, -40% TtM, +25% produttività."
          : "Delivery Manager & Head of Operations (PMP®). Operations, delivery and execution with measurable results. €500K+ portfolio, -40% TtM, +25% productivity.",
        url: SITE_URL,
        image: `${SITE_URL}/images/og-default.png`,
        email: "riccardobozzato@gmail.com",
        telephone: "+393892139542",
        areaServed: ["IT", "EU"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Operations & Delivery Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Operational Audit",
                description: isIt
                  ? "Fotografia onesta delle operations in 7 giorni: top-5 sprechi quantificati e roadmap 30-60-90. Contattami per i dettagli."
                  : "Honest operations picture in 7 days: top-5 quantified leaks and 30-60-90 roadmap. Contact me for details.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Operations Overhaul",
                description: isIt
                  ? "Sistema operativo completo in 6-8 settimane: redesign processi, dashboard KPI, team formato. Contattami per i dettagli."
                  : "Complete operating system in 6-8 weeks: process redesign, KPI dashboard, trained team. Contact me for details.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fractional Head of Operations",
                description: isIt
                  ? "Funzione operations per aziende post-PMF: board, gestione team ops, report. Contattami per i dettagli."
                  : "Operations function for post-PMF companies: board, ops team management, reporting. Contact me for details.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang={locale}>
      <head>
        {/* Preconnect to external origins for performance */}
        <link rel="preconnect" href="https://resend.com" />
        <link rel="preconnect" href="https://stripe.com" />
        <link rel="dns-prefetch" href="https://resend.com" />
        <link rel="dns-prefetch" href="https://stripe.com" />
        <link rel="dns-prefetch" href="https://github.com" />

        {/* Preconnect for Google Fonts (used via @import in globals.css) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Standalone on iOS. `apple-mobile-web-app-capable` is the only tag
            Safari reads — Next's `appleWebApp.capable` renders
            `mobile-web-app-capable`, which iOS ignores, so without this line
            "Add to Home Screen" opens the site inside a Safari chrome. */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Google tag (gtag.js) is intentionally NOT loaded here.
            It used to sit in <head> and fired on every pageview before the
            visitor could accept or refuse cookies, which broke GDPR art. 6/7
            and blocked AdSense. It is now injected by <GoogleAnalytics /> only
            after analytics consent is granted, and starts from Consent Mode v2
            denied defaults (see src/lib/consent.ts). */}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Netlify Identity — needed to process invite tokens on any page.
            next/script (lazyOnload) instead of sync <script>: avoids render
            blocking and satisfies @next/next/no-sync-scripts. Order is
            preserved: widget first, init handler second. */}
        <Script
          id="netlify-identity-widget"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="lazyOnload"
        />
        <Script
          id="netlify-identity-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* Skip to main content — WCAG 2.4.1 */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:rounded-lg"
          >
            {locale === "it" ? "Vai al contenuto principale" : "Skip to main content"}
          </a>

          <Navbar />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
          <Analytics />
          <GoogleAnalytics />
          <SiteChatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
