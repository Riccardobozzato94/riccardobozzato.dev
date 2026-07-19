"use client";

import Script from "next/script";
import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";

/**
 * Google Analytics (GA4) — set NEXT_PUBLIC_GA_ID in env to enable.
 * Uses gtag.js with route change tracking for SPAs.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) return;
    // Send pageview on route change
    window.gtag?.("config", gaId, {
      page_path: pathname,
    });
  }, [pathname, gaId]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
