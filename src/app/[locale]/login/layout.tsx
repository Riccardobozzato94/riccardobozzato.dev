import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Login — Area Clienti",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/login`,
    },
  };
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
