"use client";

"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Languages, ArrowRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
] as const;

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
      role="banner"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-white/5 shadow-2xl shadow-black/20"
          : "bg-transparent",
      )}
    >
      <div className="flex justify-between items-center gap-2 px-4 md:px-16 py-3.5 max-w-[1200px] mx-auto">
        {/* Logo. The wordmark is hidden below 380px: at 320px it wrapped onto two
            lines and pushed the CTA off the header, which is worse than a
            visitor not seeing the name next to the mark. */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 h-11 -ml-1.5 pr-1.5 text-base sm:text-lg font-bold text-foreground tracking-tight hover:text-primary transition-colors"
        >
          <span className="flex items-center justify-center size-7 rounded-lg bg-primary text-black text-xs font-extrabold">RB</span>
          <span className="hidden min-[380px]:inline whitespace-nowrap">Riccardo Bozzato</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label={locale === "it" ? "Navigazione principale" : "Main navigation"}
          className="hidden md:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                isActive(item.href)
                  ? "text-foreground bg-white/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]",
              )}
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Divider */}
          <span className="w-px h-5 bg-white/10 mx-3" />

          {/* Language Switcher */}
          <Link
            href={pathname}
            locale={otherLocale}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.03]"
          >
            <Languages className="size-3.5" />
            {otherLocale.toUpperCase()}
          </Link>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="ml-3 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-5 py-2 text-xs font-bold tracking-wider rounded-lg transition-all active:scale-95 shadow-lg shadow-primary/25"
          >
            {locale === "it" ? "Prenota una Call" : "Book a Call"}
            <ArrowRight className="size-3.5" />
          </Link>
        </nav>

        {/* Mobile: CTA + language + burger. Every control is at least 44x44:
            at 320px the language link measured 42x16 and the burger 27x36, a
            mis-tap every time a thumb met them. The language pair (icon + code)
            is stacked instead of side by side so the header still fits at 320px
            once the controls are the right size. */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 md:hidden">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-1.5 bg-primary text-black px-3.5 sm:px-4 text-xs font-bold tracking-wider rounded-lg active:scale-95 whitespace-nowrap"
          >
            {locale === "it" ? "Prenota Call" : "Book a Call"}
          </Link>
          <Link
            href={pathname}
            locale={otherLocale}
            className="inline-flex size-11 flex-col items-center justify-center gap-0.5 text-xs leading-none font-medium text-muted-foreground"
            aria-label={
              locale === "it" ? "Passa all'inglese" : "Switch to Italian"
            }
          >
            <Languages className="size-4" aria-hidden />
            {otherLocale.toUpperCase()}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex size-11 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label={open
              ? (locale === "it" ? "Chiudi menu" : "Close menu")
              : (locale === "it" ? "Apri menu" : "Open menu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label={locale === "it" ? "Navigazione mobile" : "Mobile navigation"}
        className={cn(
          "md:hidden transition-all duration-300 ease-out overflow-hidden border-t border-white/5",
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-0.5 bg-background/95 backdrop-blur-xl px-4 pb-6 pt-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3.5 py-3 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-foreground bg-white/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
