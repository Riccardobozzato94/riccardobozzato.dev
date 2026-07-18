"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  X,
  Languages,
  Hexagon,
  Sparkles,
  Instagram,
  Youtube,
  Twitch,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ACTIVE_PROFILES } from "@/lib/social";

const CHANNEL_ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  youtube: Youtube,
  twitch: Twitch,
};

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

// DEMO_ITEMS rimosse dal nav principale — il sito è stato riposizionato
// su Operations & Delivery (non developer portfolio). Le pagine demo esistono
// ancora ai loro URL originali ma non sono promosse dalla navigazione.

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const otherLocale = locale === "en" ? "it" : "en";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex items-center justify-center size-8 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Hexagon className="size-5 text-accent" />
          </div>
          <span className="text-base font-bold tracking-tight">
            Riccardo<span className="text-accent">.</span>Bozzato
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 animate-in fade-in",
                isActive(item.href)
                  ? "text-accent after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:size-1 after:rounded-full after:bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
              style={{ animationDelay: `${(i + 1) * 50}ms`, animationFillMode: "both" }}
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Demos e Login rimossi — repositioning su Operations & Delivery */}
        </nav>

        <div className="flex items-center gap-2">
          {/* Faceless channels (Instagram / YouTube / Twitch) */}
          <div className="hidden lg:flex items-center gap-1 mr-1">
            {ACTIVE_PROFILES.map(({ key, href, label }) => {
              const Icon = CHANNEL_ICONS[key];
              if (!Icon) return null;
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "inline-flex items-center justify-center size-8 rounded-lg border transition-all duration-200",
                    scrolled
                      ? "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-accent hover:bg-accent/5"
                      : "border-white/10 text-white/70 hover:border-white/30 hover:text-white hover:bg-white/10",
                  )}
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>

          {/* Free Playbook CTA */}
          <Link
            href="/freebie"
            className="hidden md:inline-flex items-center gap-1.5 h-8 rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/20 px-3.5 text-xs font-medium text-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/10 group"
          >
            <Sparkles className="size-3 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            Free Playbook
          </Link>

          {/* Language Switcher */}
          <Link
            href={pathname}
            locale={otherLocale}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 group",
              scrolled
                ? "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-accent"
                : "border-white/10 text-white/70 hover:border-white/30 hover:text-white",
            )}
          >
            <Languages className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
            {otherLocale.toUpperCase()}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "inline-flex items-center justify-center size-9 rounded-lg md:hidden transition-colors",
              scrolled
                ? "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                : "text-white/70 hover:text-white hover:bg-white/10",
            )}
            aria-label={open ? "Close menu" : "Toggle menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 pb-5 pt-3">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 animate-in fade-in slide-in-from-left-2",
                isActive(item.href)
                  ? "text-accent bg-accent/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
              style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Mobile Free Playbook CTA */}
          <Link
            href="/freebie"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent/10 border border-accent/20 px-3.5 py-2.5 text-sm font-medium text-accent transition-colors"
          >
            <Sparkles className="size-4" />
            Free Playbook
          </Link>
        </nav>
      </div>
    </header>
  );
}
