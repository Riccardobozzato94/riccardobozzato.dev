"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Sticky mobile CTA — barra fissa in basso su mobile (checklist punto 9).
 */
export default function StickyMobileCta() {
  const t = useTranslations("ai");

  return (
    <div className="sticky-mobile-cta md:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span className="status-dot shrink-0" aria-hidden />
          <span>{t("hero.status")}</span>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-xs font-bold tracking-wider text-primary-foreground shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          {t("sticky.cta")}
        </Link>
      </div>
    </div>
  );
}