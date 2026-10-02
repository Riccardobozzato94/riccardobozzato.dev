import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("privacy");
  const site = await getTranslations("site");

  return {
    title: t("title"),
    description: `Privacy Policy GDPR di ${site("title")} — come raccolgo, utilizzo e proteggo i tuoi dati personali.`,
    openGraph: {
      type: "website",
      images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "" }],
      title: `${t("title")} | ${site("title")}`,
      description: `Privacy Policy GDPR di ${site("title")}.`,
      url: `${baseUrl}/${locale}/privacy`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: {
        en: `${baseUrl}/en/privacy`,
        it: `${baseUrl}/it/privacy`,
      },
    },
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
