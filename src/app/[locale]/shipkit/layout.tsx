import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("shipkit");
  const site = await getTranslations("site");

  return {
    title: `${t("title")} — ${t("tagline")}`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} SaaS Boilerplate | ${site("title")}`,
      description: t("description"),
      url: `${baseUrl}/${locale}/shipkit`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/shipkit`,
      languages: {
        en: `${baseUrl}/en/shipkit`,
        it: `${baseUrl}/it/shipkit`,
      },
    },
  };
}

export default function ShipKitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
