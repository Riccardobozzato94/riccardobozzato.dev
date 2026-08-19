import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import { Analytics } from "@/components/Analytics";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Footer, CookieConsent } from "@/components/ClientOnlyComponents";
import StickyMobileCta from "@/components/StickyMobileCta";
import EasterEgg from "@/components/EasterEgg";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

// Font self-hosted a build-time via next/font — zero CDN runtime (addendum: font self-hosted)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
  const defaultTitle =
    locale === "it"
      ? "Riccardo Bozzato — AI & Digital Transformation Leader | Agenti AI, Automazioni, PMP®"
      : "Riccardo Bozzato — AI & Digital Transformation Leader | AI Agents, Automation, PMP®";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: defaultTitle,
      template: "%s",
    },
    description,
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
    },
    openGraph: {
      title: defaultTitle,
      description,
      url: baseUrl,
      siteName: title,
      locale: lang,
      alternateLocale: [altLang],
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-default.svg`,
          width: 1200,
          height: 630,
          alt: `${title} — ${t("tagline")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
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
        jobTitle: "AI & Digital Transformation Leader | AI Product Manager",
        description:
          "AI & Digital Transformation Leader — I build AI agents and automations that solve real problems. Ex Accenture, PMP®, Head of Operations at an AI startup.",
        alumniOf: {
          "@type": "Organization",
          name: "Accenture",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Legnaro",
          addressRegion: "PD",
          addressCountry: "IT",
        },
        url: SITE_URL,
        image: `${SITE_URL}/images/og-default.svg`,
        sameAs: [
          "https://github.com/Riccardobozzato94",
          "https://linkedin.com/in/riccardobozzato",
        ],
        knowsAbout: [
          "AI agents",
          "LLM",
          "local LLMs",
          "Ollama",
          "MCP",
          "RAG",
          "automation",
          "n8n",
          "Python",
          "FastAPI",
          "SAP UI5",
          "Pimcore",
          "Agile",
          "PMP",
        ],
        areaServed: ["IT", "EU"],
        availableForHire: true,
      },
      {
        "@type": "ProfessionalService",
        name: "Riccardo Bozzato — AI & Digital Transformation",
        description:
          "AI & Digital Transformation Leader. Agenti AI, automazioni e processi enterprise con risultati misurabili. 3 agenti in produzione, 15+ automazioni, 500+ documenti analizzati con LLM locali.",
        url: SITE_URL,
        image: `${SITE_URL}/images/og-default.svg`,
        email: "riccardobozzato@gmail.com",
        telephone: "+393892139542",
        areaServed: ["IT", "EU"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Legnaro",
          addressRegion: "PD",
          addressCountry: "IT",
        },
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        {/* Preconnect to external origins used by the app */}
        <link rel="preconnect" href="https://resend.com" />
        <link rel="preconnect" href="https://stripe.com" />
        <link rel="dns-prefetch" href="https://resend.com" />
        <link rel="dns-prefetch" href="https://stripe.com" />
        <link rel="dns-prefetch" href="https://github.com" />

        {/* Google tag (gtag.js) — GA4 con banner consenso (choice: keep GA4) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GTZS8BDZLR" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GTZS8BDZLR', { anonymize_ip: true });`,
          }}
        />

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
      <body className="font-body">
        <NextIntlClientProvider messages={messages}>
          {/* Skip to main content — WCAG 2.4.1 */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:rounded-lg"
          >
            {locale === "it" ? "Vai al contenuto principale" : "Skip to main content"}
          </a>

          {/* Texture di fondo — dot-grid + scanlines al 3-4% */}
          <div aria-hidden className="fixed inset-0 dot-grid pointer-events-none opacity-60" />
          <div aria-hidden className="fixed inset-0 scanlines pointer-events-none opacity-40" />

          <Navbar />
          <main id="main-content" className="min-h-screen relative">
            {children}
          </main>
          <Footer />
          <StickyMobileCta />
          <EasterEgg />
          <CookieConsent />
          <Analytics />
          <GoogleAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}