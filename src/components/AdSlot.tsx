"use client";

import { useEffect, useRef, useState } from "react";
import { readConsent, onConsentChange } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  /** AdSense slot id, e.g. "1234567890". */
  slot: string;
  /** AdSense format string. */
  format?: string;
  /** Full width of the container in CSS units. */
  width?: number;
  height?: number;
  /** Reserve vertical space to avoid layout shift (CLS). */
  className?: string;
  /** Locally-translatable label for the ad container. */
  label?: string;
};

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

let adsenseInjected = false;

function injectAdsense(): void {
  if (adsenseInjected || !CLIENT) return;
  adsenseInjected = true;
  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
  document.head.appendChild(script);
}

/**
 * Ad slot that only ever appears for visitors who granted the "ads" category.
 *
 * Design notes:
 *  - No AdSense client configured -> renders nothing at all, so the site can
 *    ship this component before monetization is switched on.
 *  - Space is reserved via aspect-ratio/min-height so enabling ads later does
 *    not wreck Core Web Vitals.
 *  - Labelled and aria-hidden on the iframe-free container so screen readers
 *    are not forced through third-party ad content (WCAG 1.4 / 4.1.2).
 */
export function AdSlot({
  slot,
  format = "auto",
  width,
  height,
  className = "",
  label = "Sponsored content",
}: Props) {
  const [allowed, setAllowed] = useState(false);
  const insRef = useRef<HTMLModElement | null>(null);
  const filledRef = useRef(false);

  useEffect(() => {
    if (!CLIENT) return;
    const sync = () => setAllowed(readConsent().categories.ads);
    sync();
    return onConsentChange(sync);
  }, []);

  useEffect(() => {
    if (!allowed || !CLIENT) return;
    injectAdsense();
    if (filledRef.current) return;
    try {
      const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);
      adsbygoogle.push({});
      filledRef.current = true;
    } catch {
      /* blocked by an extension — leave the reserved box empty */
    }
  }, [allowed]);

  if (!CLIENT || !allowed) return null;

  return (
    <aside
      aria-label={label}
      className={`my-8 w-full overflow-hidden rounded-xl border border-border/40 bg-muted/20 ${className}`}
    >
      <p className="px-3 pt-2 text-[10px] uppercase tracking-wider text-muted-foreground/60">
        {label}
      </p>
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        style={{
          display: "block",
          minHeight: height ? `${height}px` : "90px",
          ...(width ? { width: `${width}px` } : {}),
        }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={width ? "false" : "true"}
      />
    </aside>
  );
}
