"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold tracking-tighter text-accent sm:text-9xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">{t("subtitle")}</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {t("description")}
      </p>
      <Button asChild className="mt-8">
        <Link href="/">{t("cta")}</Link>
      </Button>
    </Section>
  );
}
