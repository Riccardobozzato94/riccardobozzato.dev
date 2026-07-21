import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import { Analytics } from "@/components/Analytics";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Footer, CookieConsent } from "@/components/ClientOnlyComponents";
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
          url: `${baseUrl}/images/og-default.svg`,
          width: 1600,
          height: 900,
          alt: `${title} — ${t("tagline")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/og-default.svg`],
    },
    robots: {
      index: true,
      follow: true,
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

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
        description:
          "Delivery Manager & Head of Operations (PMP®). Operations, delivery ed execution con risultati misurabili. €500K+ portfolio, -40% TtM, +25% produttività.",
        url: SITE_URL,
        image: `${SITE_URL}/images/og-default.svg`,
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
                name: "Operations Audit",
                description: "Analisi processi in 2 giorni, report con 3 quick wins. €490.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Delivery & Process Design",
                description: "Framework Agile, release planning, capacity modeling. Da €1.500.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fractional Head of Ops",
                description: "Interim o part-time per startup. Da €2.500/mese.",
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

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Netlify Identity — needed to process invite tokens on any page */}
        <script
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
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
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

          {/* Announcement Bar — Open to Work */}
          <div role="banner" className="bg-primary text-[10px] sm:text-xs font-semibold tracking-wider text-center py-2 px-4 text-black">
            🟢 {locale === "it"
              ? "Disponibile da subito — Head of Ops / DM / PM Senior — Padova · Milano · Remote"
              : "Available immediately — Head of Ops / Delivery Manager / Senior PM — Padua · Milan · Remote"}
          </div>
          <Navbar />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
          <Analytics />
          <GoogleAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
