import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.netlify.app";

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
