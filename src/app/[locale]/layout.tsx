import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const baseUrl = "https://riccardobozzato.netlify.app";

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
    "@type": "Person",
    name: "Riccardo Bozzato",
    givenName: "Riccardo",
    familyName: "Bozzato",
    email: "riccardobozzato@gmail.com",
    telephone: "+393892139542",
    jobTitle: "Operations & Delivery Consultant",
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
    url: "https://riccardobozzato.netlify.app",
    sameAs: [
      "https://github.com/Riccardobozzato94",
      "https://linkedin.com/in/riccardobozzato",
    ],
  };

  return (
    <html lang={locale}>
      <head>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
