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
      title,
      description,
      url: baseUrl,
      siteName: title,
      locale: lang,
      alternateLocale: [altLang],
      type: "website",
      images: [
        {
          url: `${baseUrl}/assets/shipkit-banner-1600x900.png`,
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
      images: [`${baseUrl}/assets/shipkit-banner-1600x900.png`],
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
        jobTitle: "Delivery Manager | Head of Operations | PMP®",
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
        "@type": "Product",
        name: "ShipKit SaaS Kit",
        description:
          "Production-ready Next.js 16 SaaS boilerplate with auth, database, email, billing, i18n, and shadcn/ui.",
        image: `${SITE_URL}/assets/shipkit-banner-1600x900.png`,
        offers: {
          "@type": "Offer",
          price: "49",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2027-07-15",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          bestRating: "5",
          ratingCount: "24",
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
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
          <Analytics />
          <GoogleAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
