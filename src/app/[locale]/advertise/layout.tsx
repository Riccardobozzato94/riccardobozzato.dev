import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("advertise");
  const site = await getTranslations("site");

  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      type: "website",
      images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "" }],
      title: `${t("title")} | ${site("title")}`,
      description: t("metaDescription"),
      url: `${baseUrl}/${locale}/advertise`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/advertise`,
      languages: {
        en: `${baseUrl}/en/advertise`,
        it: `${baseUrl}/it/advertise`,
      },
    },
  };
}

export default function AdvertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
