import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.netlify.app";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("trova");
  const site = await getTranslations("site");

  return {
    title: `${t("title")} — ${t("tagline")}`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} SaaS Boilerplate | ${site("title")}`,
      description: t("description"),
      url: `${baseUrl}/${locale}/trova`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/trova`,
      languages: {
        en: `${baseUrl}/en/trova`,
        it: `${baseUrl}/it/trova`,
      },
    },
  };
}

export default function TrovaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
