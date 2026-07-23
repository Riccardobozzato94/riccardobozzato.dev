"use client";

import Script from "next/script";
import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";

/**
 * Google Analytics (GA4) — always enabled with G-GTZS8BDZLR.
 * Uses gtag.js with route change tracking for SPAs.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-GTZS8BDZLR";

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Send pageview on route change
    window.gtag?.("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
