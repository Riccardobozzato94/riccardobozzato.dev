"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Languages } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "vision", href: "/#vision" },
  { key: "results", href: "/#results" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "journey", href: "/#journey" },
  { key: "contact", href: "/contact" },
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
    if (href.startsWith("/#")) return false; // anchor links never "active"
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-outline-variant/50 shadow-lg shadow-black/10"
          : "bg-transparent",
      )}
    >
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1200px] mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-foreground tracking-tight">
          Riccardo<span className="text-primary">.</span>Bozzato
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                isActive(item.href) && !item.href.startsWith("/#")
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Language Switcher */}
          <Link
            href={pathname}
            locale={otherLocale}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Languages className="size-3.5" />
            {otherLocale.toUpperCase()}
          </Link>

          {/* CTA Button */}
          <Link
            href="/freebie"
            className="bg-primary text-black px-6 py-2 text-xs font-bold tracking-widest transition-transform active:scale-95 luminous-glow"
          >
            Diagnostic Rapido
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={pathname}
            locale={otherLocale}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground"
          >
            <Languages className="size-3.5" />
            {otherLocale.toUpperCase()}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center size-9 text-muted-foreground"
            aria-label={open ? "Close menu" : "Toggle menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden border-t border-outline-variant/30",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 bg-background/95 backdrop-blur-xl px-4 pb-5 pt-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/freebie"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-primary text-black px-4 py-3 text-sm font-bold tracking-widest"
          >
            Diagnostic Rapido
          </Link>
        </nav>
      </div>
    </header>
  );
}
