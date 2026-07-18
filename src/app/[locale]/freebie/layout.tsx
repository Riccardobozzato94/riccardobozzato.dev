import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("freebie");
  const site = await getTranslations("site");

  return {
    title: `${t("title")} — Download Gratuito`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: t("description"),
      url: `${baseUrl}/${locale}/freebie`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/freebie`,
      languages: {
        en: `${baseUrl}/en/freebie`,
        it: `${baseUrl}/it/freebie`,
      },
    },
  };
}

export default function FreebieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
