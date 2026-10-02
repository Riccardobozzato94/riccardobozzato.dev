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
  // One translator for everything: the link keys already carry their namespace
  // ("nav.home", "footer.contact"). Calling nav("nav.home") rendered the literal
  // string "nav.nav.home" on screen — longer than the real label, and long enough
  // to force a horizontal scrollbar at 320px.
  const t = useTranslations();
  const footer = useTranslations("footer");
  const locale = useLocale();
  const isIt = locale === "it";
  const currentYear = new Date().getFullYear();

  // GDPR art. 7: withdrawing consent must be as easy as giving it.
  function openCookieSettings() {
    window.dispatchEvent(new Event("rbz:open-consent"));
  }

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
                <ArrowRight className="size-4 shrink-0" />
              </Link>
              <Link
                href="/freebie"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-outline-variant font-medium text-foreground transition-colors hover:bg-muted/40"
              >
                <FileText className="size-4 shrink-0" />
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

            {/* Numbers as a scannable row, not a wrapping sentence.
                Labels are lowercase and break on their hyphens: uppercased,
                "PRODUTTIVITÀ" is a single 92px word with nowhere to break and
                pushed the third column 4px past the viewport at 320px. */}
            <dl className="grid grid-cols-3 gap-x-3 gap-y-4 mb-6">
              {[
                { v: "€500K", l: isIt ? "portfolio" : "portfolio" },
                { v: "−40%", l: isIt ? "time-to-market" : "time-to-market" },
                { v: "+25%", l: isIt ? "produttività" : "productivity" },
              ].map((s) => (
                <div key={s.v} className="min-w-0">
                  <dt className="text-lg font-bold text-foreground leading-none tabular-nums">
                    {s.v}
                  </dt>
                  <dd className="text-xs text-muted-foreground/70 mt-1.5 tracking-wide leading-tight break-words hyphens-auto">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="space-y-1">
              <span className="flex min-h-11 items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" aria-hidden />
                Legnaro, PD, Italy
              </span>
              <a
                href="mailto:riccardobozzato@gmail.com"
                className="flex min-h-11 items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors break-all"
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                riccardobozzato@gmail.com
              </a>
            </div>
          </div>

          {/* Columns. min-w-0 stops a long label from setting the column's
              intrinsic width and pushing the grid past the viewport. */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 sm:gap-8">
            {LINK_COLUMNS.map((col, i) => (
              <nav key={col.headingIt} aria-label={isIt ? col.headingIt : col.headingEn} className="min-w-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
                  {isIt ? col.headingIt : col.headingEn}
                </h3>
                <ul className="space-y-1">
                  {col.links.map((l) => (
                    <li key={l.labelKey}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {t(l.labelKey)}
                      </Link>
                    </li>
                  ))}
                  {i === 3 && (
                    <li>
                      <button
                        onClick={openCookieSettings}
                        // Wraps at the two-column width, stays on one line once
                        // the four columns have room for it.
                        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors sm:whitespace-nowrap"
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
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-x-8 gap-y-4">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground/70">
                &copy; {currentYear} Riccardo Bozzato.{" "}
                {isIt ? "Tutti i diritti riservati." : "All rights reserved."}
              </p>
              <p className="text-xs text-muted-foreground/50 leading-relaxed max-w-xl">
                {isIt
                  ? "Alcuni link sono link di affiliazione Amazon: se compri un libro attraverso questa pagina, Amazon mi versa una commissione senza che tu paghi nulla in più."
                  : "Some links are Amazon affiliate links: if you buy a book through this page, Amazon pays me a commission and you pay nothing extra."}
              </p>
            </div>

            {/* flex-wrap + shrink-0: at 320px the three chips are 300px wide in
                total, so without wrapping the row overflowed the viewport. */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://linkedin.com/in/riccardobozzato"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-3.5 rounded-lg border border-outline-variant text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Linkedin className="size-3.5" aria-hidden />
                LinkedIn
              </a>
              <a
                href="https://github.com/Riccardobozzato94"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-3.5 rounded-lg border border-outline-variant text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Github className="size-3.5" aria-hidden />
                GitHub
              </a>
              <Link
                href="/advertise"
                className="inline-flex items-center gap-2 h-11 px-3.5 rounded-lg border border-outline-variant text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
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
