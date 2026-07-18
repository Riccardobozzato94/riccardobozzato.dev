"use client";

import { useTranslations, useLocale } from "next-intl";
import { Github, Linkedin, Mail, Phone, MapPin, Hexagon, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ACTIVE_PROFILES } from "@/lib/social";

const SOCIAL_ICONS: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

const FOOTER_LINKS = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "freebie", href: "/freebie" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const isIt = locale === "it";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-transparent via-muted/10 to-muted/20">
      {/* Top decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5"
            >
              <div className="flex items-center justify-center size-8 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Hexagon className="size-5 text-accent" />
              </div>
              <span className="text-base font-bold tracking-tight">
                Riccardo<span className="text-accent">.</span>Bozzato
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Senior Delivery Manager | Head of Operations | PMP®
            </p>
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-accent/60" />
                <span>Legnaro, PD, Italy</span>
              </div>
              <a
                href="tel:+393892139542"
                className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-accent group"
              >
                <Phone className="size-4 shrink-0 text-accent/60" />
                <span>+39 389 213 9542</span>
              </a>
              <a
                href="mailto:riccardobozzato@gmail.com"
                className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-accent group"
              >
                <Mail className="size-4 shrink-0 text-accent/60" />
                <span className="truncate">riccardobozzato@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
              {isIt ? "Naviga" : "Navigate"}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent group"
                  >
                    {nav(link.key)}
                    <ArrowUpRight className="size-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
              {isIt ? "Progetti" : "Projects"}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/trova" className="text-sm text-muted-foreground transition-colors hover:text-accent">Trova</Link>
              </li>
              <li>
                <Link href="/projects/vulnclaw" className="text-sm text-muted-foreground transition-colors hover:text-accent">VulnClaw</Link>
              </li>
              <li>
                <Link href="/projects/panificio" className="text-sm text-muted-foreground transition-colors hover:text-accent">Panificio Da Sergio</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
              {isIt ? "Diagnostica Gratuita" : "Free Diagnostic"}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {isIt
                ? "Ricevi il framework di 3 ore per mappare, misurare e prioritizzare il debito operativo — prima che diventi crisi."
                : "Get the Operational Chaos Diagnostic — a 3-hour framework to map, measure, and prioritize operational debt."}
            </p>
            <Link
              href="/freebie"
              className="group inline-flex items-center gap-2 h-10 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 px-4 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
            >
              <Sparkles className="size-4" />
              {isIt ? "Scarica Gratis" : "Download Free"}
              <ArrowUpRight className="size-3.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
            </Link>
            <div className="mt-6">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
                {isIt ? "Contatti" : "Connect"}
              </h5>
              <div className="flex flex-wrap gap-3">
                {ACTIVE_PROFILES.map(({ key, href, label }) => {
                  const Icon = SOCIAL_ICONS[key];
                  if (!Icon) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-10 rounded-xl border border-border/60 text-muted-foreground transition-all duration-200 hover:border-accent/40 hover:text-accent hover:bg-accent/5 hover:-translate-y-0.5"
                      aria-label={label}
                    >
                      <Icon className="size-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Link
                href="/privacy"
                className={cn(
                  "inline-block text-xs text-muted-foreground/50 transition-colors hover:text-accent",
                )}
              >
                {isIt ? "Informativa Privacy" : "Privacy Policy"}
              </Link>
              <p className="text-xs text-muted-foreground/40">
                {t("builtWith")}
              </p>
              <p className="text-xs text-muted-foreground/30">
                {t("copyright", { year: currentYear })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
