"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";
import { readConsent, onConsentChange, consentModeDefaults } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-GTZS8BDZLR";

let scriptInjected = false;

function injectGtag(): void {
  if (scriptInjected) return;
  scriptInjected = true;

  const w = window as Window;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function gtag(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (w.dataLayer as any[]).push(args);
    }
    w.gtag = ((...args: unknown[]) => gtag(...args)) as Window["gtag"];
  }
  w.gtag?.("js", new Date());

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

/**
 * Google Analytics 4 — loaded ONLY after the user grants analytics consent.
 *
 * Previously gtag.js was hardcoded in <head> and fired on every pageview no
 * matter what the visitor chose (or didn't choose). Now:
 *  - nothing Google is requested before an explicit opt-in;
 *  - Consent Mode v2 signals are pushed before config, with ad storage denied
 *    even for analytics-only visitors;
 *  - revoking consent sets analytics_storage back to denied.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => {
      const consent = readConsent();

      if (!consent.categories.analytics) {
        // Withdraw: tell Google to stop storing, even if the tag is resident.
        window.gtag?.("consent", "update", consentModeDefaults(consent.categories));
        return;
      }

      injectGtag();
      window.gtag?.("consent", "update", consentModeDefaults(consent.categories));
      window.gtag?.("config", GA_ID, {
        page_path: pathname,
        anonymize_ip: true,
        send_page_view: true,
        // Ads features stay off unless the ads category was granted too.
        allow_google_signals: consent.categories.ads,
        allow_ad_personalization_signals: consent.categories.ads,
      });
    };

    sync();
    return onConsentChange(() => {
      window.gtag?.("consent", "update", consentModeDefaults(readConsent().categories));
    });
    // Intentionally only on mount: SPA route views are pushed by the
    // pathname effect below so that consent changes do not re-config.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SPA route change pageviews — only when the visitor opted in.
  useEffect(() => {
    if (!readConsent().categories.analytics) return;
    window.gtag?.("config", GA_ID, { page_path: pathname, send_page_view: true });
  }, [pathname]);

  return null;
}
