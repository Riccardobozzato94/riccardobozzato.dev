"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "@/i18n/navigation";

/**
 * Plausible Analytics — privacy-friendly, cookie-free analytics.
 * To enable: set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in .env
 *
 * You can self-host Plausible or use the cloud version.
 * Docs: https://plausible.io/docs
 */

type PlausibleFunction = {
  (event: string, options?: Record<string, unknown>): void;
  q?: unknown[];
};

declare global {
  interface Window {
    plausible?: PlausibleFunction;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    if (!domain) return;

    // Register Plausible as a global function if not present
    if (!window.plausible) {
      window.plausible = function (
        this: PlausibleFunction,
        ...args: unknown[]
      ) {
        (window.plausible as unknown as { q: unknown[] }).q = (
          window.plausible as unknown as { q: unknown[] }
        ).q || [];
        (window.plausible as unknown as { q: unknown[] }).q.push(args);
      } as unknown as PlausibleFunction;
    }

    // Send pageview on route change
    if (pathname) {
      window.plausible?.("pageview", {
        u: window.location.origin + pathname,
      });
    }
  }, [pathname, domain]);

  // Only render script if domain is configured
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
