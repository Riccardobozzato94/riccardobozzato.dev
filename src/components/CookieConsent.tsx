"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Cookie, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "rbz_cookie_consent";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Delay banner to not interfere with initial render
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function rejectAll() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex size-10 shrink-0 rounded-xl bg-accent/10 items-center justify-center">
            <Cookie className="size-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
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
            <div className="flex items-center gap-2.5 mt-4">
              <button
                onClick={rejectAll}
                className="h-9 rounded-xl border border-border/50 bg-background hover:bg-muted/50 px-4 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
              >
                {t("reject")}
              </button>
              <button
                onClick={acceptAll}
                className="h-9 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-5 text-xs font-medium shadow-lg shadow-accent/10 transition-all hover:-translate-y-0.5"
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
