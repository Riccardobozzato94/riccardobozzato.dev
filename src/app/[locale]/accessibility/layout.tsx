import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("accessibility");
  const site = await getTranslations("site");

  return {
    title: t("title"),
    description: `${t("title")} — conformità WCAG 2.1 livello AA. D.Lgs. 104/2022.`,
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: `${t("title")} — conformità WCAG 2.1 livello AA.`,
      url: `${baseUrl}/${locale}/accessibility`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/accessibility`,
      languages: {
        en: `${baseUrl}/en/accessibility`,
        it: `${baseUrl}/it/accessibility`,
      },
    },
  };
}

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
