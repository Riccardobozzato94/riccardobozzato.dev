import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const site = await getTranslations("site");

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: t("subtitle"),
      url: `${baseUrl}/${locale}/contact`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        it: `${baseUrl}/it/contact`,
      },
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
