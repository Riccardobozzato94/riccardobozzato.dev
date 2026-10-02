"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Cookie, X, Settings2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  readConsent,
  saveConsent,
  hasDecided,
  type ConsentRecord,
} from "@/lib/consent";

/**
 * Real CMP: granular categories, withdrawable at any time, mirrored into Google
 * Consent Mode v2. Replaces the previous accept/reject-only placeholder that
 * never actually gated anything.
 */
export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from storage in a timer callback rather than synchronously in the
  // effect body: reading localStorage during render would break hydration, and
  // calling setState inline in an effect triggers a cascading extra render.
  useEffect(() => {
    const consent: ConsentRecord = readConsent();
    const decided = hasDecided(consent);
    const timer = setTimeout(
      () => {
        setAnalytics(consent.categories.analytics);
        setAds(consent.categories.ads);
        setMounted(true);
        if (!decided) setVisible(true);
      },
      decided ? 0 : 1200
    );
    return () => clearTimeout(timer);
  }, []);

  const apply = useCallback((next: { analytics: boolean; ads: boolean }) => {
    saveConsent(next);
    setAnalytics(next.analytics);
    setAds(next.ads);
    setVisible(false);
    setExpanded(false);
  }, []);

  const acceptAll = useCallback(
    () => apply({ analytics: true, ads: true }),
    [apply]
  );

  const rejectAll = useCallback(() => apply({ analytics: false, ads: false }), [apply]);

  const saveSelection = useCallback(
    () => apply({ analytics, ads }),
    [apply, analytics, ads]
  );

  // Allows Footer to reopen this panel.
  useEffect(() => {
    const reopen = () => {
      const consent = readConsent();
      setAnalytics(consent.categories.analytics);
      setAds(consent.categories.ads);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener("rbz:open-consent", reopen);
    return () => window.removeEventListener("rbz:open-consent", reopen);
  }, []);

  // Must not render until mounted, otherwise the banner flashes on every
  // navigation for users who already decided.
  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom-4 duration-500 print:hidden"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex size-10 shrink-0 rounded-xl bg-accent/10 items-center justify-center">
            <Cookie className="size-5 text-accent" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p id="cookie-consent-title" className="text-sm font-semibold text-foreground">
                  {t("title")}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-lg">
                  {t("description")}{" "}
                  <Link
                    href="/privacy"
                    className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
                  >
                    {t("privacyLink")}
                  </Link>
                </p>
              </div>
              <button
                onClick={rejectAll}
                className="size-7 shrink-0 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                aria-label={t("reject")}
              >
                <X className="size-3.5" />
              </button>
            </div>

            {expanded && (
              <fieldset className="mt-4 space-y-3 border-t border-border/40 pt-4">
                <legend className="sr-only">{t("categoriesLegend")}</legend>

                <label className="flex items-start gap-3 cursor-not-allowed">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    readOnly
                    className="mt-0.5 size-4 rounded border-border accent-accent"
                  />
                  <span className="text-xs">
                    <span className="font-medium text-foreground">{t("necessaryTitle")}</span>
                    <span className="block text-muted-foreground mt-0.5">
                      {t("necessaryDesc")}
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-border accent-accent"
                  />
                  <span className="text-xs">
                    <span className="font-medium text-foreground">{t("analyticsTitle")}</span>
                    <span className="block text-muted-foreground mt-0.5">
                      {t("analyticsDesc")}
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ads}
                    onChange={(e) => setAds(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-border accent-accent"
                  />
                  <span className="text-xs">
                    <span className="font-medium text-foreground">{t("adsTitle")}</span>
                    <span className="block text-muted-foreground mt-0.5">{t("adsDesc")}</span>
                  </span>
                </label>

                <button
                  onClick={saveSelection}
                  className="h-9 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-5 text-xs font-medium shadow-lg shadow-accent/10 transition-all hover:-translate-y-0.5"
                >
                  {t("saveSelection")}
                </button>
              </fieldset>
            )}

            <div className="flex items-center gap-2.5 mt-4">
              <button
                onClick={rejectAll}
                className="h-9 rounded-xl border border-border/50 bg-background hover:bg-muted/50 px-4 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
              >
                {t("reject")}
              </button>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border/50 bg-background hover:bg-muted/50 px-4 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
                aria-expanded={expanded}
              >
                <Settings2 className="size-3.5" />
                {expanded ? t("collapseSettings") : t("customise")}
              </button>
              <button
                onClick={acceptAll}
                className="ml-auto h-9 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-5 text-xs font-medium shadow-lg shadow-accent/10 transition-all hover:-translate-y-0.5"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
