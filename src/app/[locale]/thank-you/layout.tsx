import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

/**
 * Metadata lives here, not in page.tsx: these three pages are Client
 * Components (they read the token from the URL and call an API), and
 * `generateMetadata` is server-only by design.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("thankYou");
  const site = await getTranslations("site");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title: { absolute: `${title} | ${site("title")}` },
    description,
    // Transactional: reached from an email, never worth a search result.
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "" }],
      title,
      description,
      url: `${SITE_URL}/${locale}/thank-you`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/thank-you`,
      languages: {
        en: `${SITE_URL}/en/thank-you`,
        it: `${SITE_URL}/it/thank-you`,
      },
    },
  };
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
