"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics (GA4) — SPA route change tracking only.
 * The actual gtag.js script and initial config are in the <head> (layout.tsx)
 * for immediate detection by GA test tools and crawlers.
 */
const GA_ID = "G-GTZS8BDZLR";

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Send pageview on client-side route changes (SPA navigation)
    window.gtag?.("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
