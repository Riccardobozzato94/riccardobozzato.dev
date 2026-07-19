"use client";

import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((m) => ({ default: m.CookieConsent })),
  { ssr: false }
);

export { Footer, CookieConsent };
