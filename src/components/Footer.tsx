"use client";

import { useTranslations, useLocale } from "next-intl";
import { MapPin, Mail, Megaphone, Cookie, ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { Link } from "@/i18n/navigation";

const LINK_COLUMNS = [
  {
    headingKey: null,
    headingIt: "NAVIGA",
    headingEn: "NAVIGATE",
    links: [
      { href: "/", labelKey: "nav.home" },
      { href: "/projects", labelKey: "nav.projects" },
      { href: "/blog", labelKey: "nav.blog" },
      { href: "/books", labelKey: "footer.books" },
    ],
  },
  {
    headingKey: null,
    headingIt: "LAVORA CON ME",
    headingEn: "WORK WITH ME",
    links: [
      { href: "/freebie", labelKey: "footer.playbookLink" },
      { href: "/advertise", labelKey: "footer.advertise" },
      { href: "/contact", labelKey: "footer.contact" },
    ],
  },
  {
    headingKey: null,
    headingIt: "LEGGI",
    headingEn: "READ",
    links: [
      { href: "/about", labelKey: "footer.about" },
      { href: "/services", labelKey: "footer.services" },
      { href: "/contact", labelKey: "footer.talk" },
    ],
  },
  {
    headingKey: null,
    headingIt: "LEGAL",
    headingEn: "LEGAL",
    links: [
      { href: "/privacy", labelKey: "footer.privacy" },
      { href: "/accessibility", labelKey: "footer.accessibility" },
    ],
  },
];

export default function Footer() {
  const nav = useTranslations("nav");
  const footer = useTranslations("footer");
  const locale = useLocale();
  const isIt = locale === "it";
  const currentYear = new Date().getFullYear();

  // GDPR art. 7: withdrawing consent must be as easy as giving it.
  function openCookieSettings() {
    window.dispatchEvent(new Event("rbz:open-consent"));
  }

  const resolved = (col: (typeof LINK_COLUMNS)[number], i: number, key: string) => {
    if (i === 0) return nav(key);
    return footer(key);
  };

  return (
    <footer role="contentinfo" className="bg-surface-container-lowest border-t border-outline-variant">
      {/* ── Primary band: one clear action ───────────────────────────── */}
      <div className="border-b border-outline-variant/60">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-balance">
                {isIt
                  ? "Se hai un problema operativo, partiamo da una call di trenta minuti."
                  : "If you have an operational problem, start with a thirty-minute call."}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                {isIt
                  ? "Nessun pitch: mi dici dove sei e ti dico se posso aiutarti. Se non posso, te lo dico nella prima call."
                  : "No pitch: you tell me where you are and I tell you whether I can help. If I cannot, I say so on the first call."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                {isIt ? "Prenota una call" : "Book a call"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/freebie"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-outline-variant font-medium text-foreground transition-colors hover:bg-muted/40"
              >
                <FileText className="size-4" />
                {footer("playbookLink")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Link grid ─────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-14">
        <div className="grid gap-10 md:gap-12 md:grid-cols-[1.3fr_2fr]">
          {/* Identity */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-foreground text-background flex items-center justify-center text-[13px] font-bold shrink-0">
                RB
              </div>
              <div>
                <div className="font-bold text-foreground leading-tight">Riccardo Bozzato</div>
                <div className="text-xs text-muted-foreground">
                  {isIt ? "Delivery Manager · Head of Ops" : "Delivery Manager · Head of Ops"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-primary mb-1">
              <span className="size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
              {isIt ? "Disponibile da subito" : "Available immediately"}
            </div>
            <p className="text-xs text-muted-foreground/80 mb-5 leading-relaxed">
              {isIt
                ? "Head of Ops / DM / PM Senior — Padova · Milano · Remote"
                : "Head of Ops / Delivery Manager / Senior PM — Padua · Milan · Remote"}
            </p>

            {/* Numbers as a scannable row, not a wrapping sentence */}
            <dl className="grid grid-cols-3 gap-3 mb-6">
              {[
                { v: "€500K", l: isIt ? "portfolio" : "portfolio" },
                { v: "−40%", l: isIt ? "time-to-market" : "time-to-market" },
                { v: "+25%", l: isIt ? "produttività" : "productivity" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-lg font-bold text-foreground leading-none">{s.v}</dt>
                  <dd className="text-[10px] text-muted-foreground/70 mt-1 uppercase tracking-wide leading-tight">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="space-y-2.5">
              <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" aria-hidden />
                Legnaro, PD, Italy
              </span>
              <a
                href="mailto:riccardobozzato@gmail.com"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors break-all"
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                riccardobozzato@gmail.com
              </a>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {LINK_COLUMNS.map((col, i) => (
              <nav key={col.headingIt} aria-label={isIt ? col.headingIt : col.headingEn}>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
                  {isIt ? col.headingIt : col.headingEn}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.labelKey}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block py-0.5"
                      >
                        {resolved(col, i, l.labelKey)}
                      </Link>
                    </li>
                  ))}
                  {i === 3 && (
                    <li>
                      <button
                        onClick={openCookieSettings}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-0.5 whitespace-nowrap"
                      >
                        <Cookie className="size-3.5 shrink-0" aria-hidden />
                        {footer("cookieSettings")}
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* ── Social + legal ────────────────────────────────────────────── */}
      <div className="border-t border-outline-variant/60">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground/70">
                &copy; {currentYear} Riccardo Bozzato.{" "}
                {isIt ? "Tutti i diritti riservati." : "All rights reserved."}
              </p>
              <p className="text-[11px] text-muted-foreground/45 leading-relaxed max-w-xl">
                {isIt
                  ? "Alcuni link sono link di affiliazione Amazon: se compri un libro attraverso questa pagina, Amazon mi versa una commissione senza che tu paghi nulla in più."
                  : "Some links are Amazon affiliate links: if you buy a book through this page, Amazon pays me a commission and you pay nothing extra."}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://linkedin.com/in/riccardobozzato"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-outline-variant text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Linkedin className="size-3.5" aria-hidden />
                LinkedIn
              </a>
              <a
                href="https://github.com/Riccardobozzato94"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-outline-variant text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Github className="size-3.5" aria-hidden />
                GitHub
              </a>
              <Link
                href="/advertise"
                className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-outline-variant text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Megaphone className="size-3.5" aria-hidden />
                {footer("advertise")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
