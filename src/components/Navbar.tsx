"use client";

"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Languages, Sparkles, ArrowRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
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
      <div className="flex justify-between items-center px-4 md:px-16 py-3.5 max-w-[1200px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-foreground tracking-tight hover:text-primary transition-colors"
        >
          Riccardo<span className="text-primary">.</span>Bozzato
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

        {/* Mobile: CTA + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-primary text-black px-3.5 py-2 text-xs font-bold tracking-wider rounded-lg"
          >
            {locale === "it" ? "Prenota Call" : "Book a Call"}
          </Link>
          <Link
            href={pathname}
            locale={otherLocale}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground px-1"
          >
            <Languages className="size-3.5" />
            {otherLocale.toUpperCase()}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center size-9 text-muted-foreground hover:text-foreground transition-colors"
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
