"use client";

/**
 * Consent management — single source of truth for cookie/analytics/ads consent.
 *
 * WHY THIS EXISTS (2026-10-02)
 * ---------------------------
 * The previous CookieConsent banner stored "accepted"/"rejected" in localStorage
 * and nothing ever read it, while gtag.js was hardcoded in <head> and loaded on
 * every pageview before any choice could be made. That is not a consent banner,
 * it is a decoration — and under GDPR art. 6/7 plus Google's EU User Consent
 * Policy it is a straightforward violation (and an AdSense policy blocker).
 *
 * This module:
 *  - stores granular categories, not a single boolean;
 *  - mirrors them into Google Consent Mode v2 signals so that even if a Google
 *    tag is loaded it starts denied;
 *  - emits a DOM event so components can react to a later change without a
 *    reload (GDPR requires consent to be withdrawable as easily as given).
 */

export const CONSENT_STORAGE_KEY = "rbz_consent_v2";
export const CONSENT_EVENT = "rbz:consent-changed";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  ads: boolean;
};

export type ConsentRecord = {
  /** ISO timestamp of the last decision. */
  updatedAt: string;
  categories: ConsentCategories;
};

export const DEFAULT_CONSENT: ConsentRecord = {
  updatedAt: "",
  categories: { necessary: true, analytics: false, ads: false },
};

/** Consent Mode v2 defaults: everything denied until the user opts in. */
export function consentModeDefaults(categories: ConsentCategories) {
  return {
    ad_storage: categories.ads ? "granted" : "denied",
    analytics_storage: categories.analytics ? "granted" : "denied",
    ad_user_data: categories.ads ? "granted" : "denied",
    ad_personalization: categories.ads ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: categories.ads ? "granted" : "denied",
    security_storage: "granted",
  };
}

export function readConsent(): ConsentRecord {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (typeof parsed?.categories?.analytics !== "boolean") return DEFAULT_CONSENT;
    return {
      updatedAt: parsed.updatedAt ?? "",
      categories: {
        necessary: true,
        analytics: !!parsed.categories.analytics,
        ads: !!parsed.categories.ads,
      },
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

/** True once the user has made an explicit choice either way. */
export function hasDecided(consent: ConsentRecord): boolean {
  return consent.updatedAt !== "";
}

export function saveConsent(categories: Omit<ConsentCategories, "necessary">): void {
  const record: ConsentRecord = {
    updatedAt: new Date().toISOString(),
    categories: { necessary: true, analytics: !!categories.analytics, ads: !!categories.ads },
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* private mode — the session simply stays unconsented */
  }

  // Mirror into Consent Mode v2 so any already-loaded Google tag updates.
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.gtag?.("consent", "update", consentModeDefaults(record.categories));
  w.dataLayer.push(["consent", "update", consentModeDefaults(record.categories)]);

  window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: record }));
}

/** Subscribe to consent changes. Returns an unsubscribe function. */
export function onConsentChange(handler: (consent: ConsentRecord) => void): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<ConsentRecord>).detail ?? readConsent());
  };
  window.addEventListener(CONSENT_EVENT, listener);
  // Also sync on tab focus: covers the case where the user changed the choice
  // in another tab.
  const onFocus = () => handler(readConsent());
  window.addEventListener("focus", onFocus);
  return () => {
    window.removeEventListener(CONSENT_EVENT, listener);
    window.removeEventListener("focus", onFocus);
  };
}
