"use client";

import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((m) => ({ default: m.CookieConsent })),
  { ssr: false }
);
const SiteChatbot = dynamic(
  () => import("@/components/SiteChatbot").then((m) => ({ default: m.SiteChatbot })),
  { ssr: false }
);

export { Footer, CookieConsent, SiteChatbot };
