"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  X,
  Languages,
  Hexagon,
  Sparkles,
  ChevronDown,
  Bot,
  Calculator,
  Workflow,
  GitMerge,
  Shield,
  Package,
  LogIn,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const DEMO_ITEMS = [
  { key: "AI Agent", href: "/demo/ai-agent", icon: Bot },
  { key: "Cost Calculator", href: "/demo/cost-calculator", icon: Calculator },
  { key: "Automation", href: "/demo/automation", icon: Workflow },
  { key: "Integration", href: "/demo/integration", icon: GitMerge },
  { key: "Tech Audit", href: "/demo/tech-audit", icon: Shield },
  { key: "Project Planner", href: "/demo/turnkey", icon: Package },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const otherLocale = locale === "en" ? "it" : "en";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDemoOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-accent" />
              )}
            </Link>
          ))}

          {/* Demos Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDemoOpen(!demoOpen)}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1",
                pathname.startsWith("/demo")
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              Demos
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  demoOpen && "rotate-180",
                )}
              />
              {pathname.startsWith("/demo") && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-accent" />
              )}
            </button>

            {demoOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border border-border/50 bg-card shadow-xl shadow-black/10 p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                {DEMO_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDemoOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                        pathname === item.href
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      {item.key}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Login */}
          <Link
            href="/login"
            className={cn(
              "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
              pathname.startsWith("/login")
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            <LogIn className="size-3.5 inline mr-1" />
            Login
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Free Playbook CTA */}
          <Link
            href="/freebie"
            className="hidden md:inline-flex items-center gap-1.5 h-8 rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/20 px-3.5 text-xs font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
          >
            <Sparkles className="size-3" />
            Free Playbook
          </Link>

          {/* Language Switcher */}
          <Link
            href={pathname}
            locale={otherLocale}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200",
              scrolled
                ? "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-accent"
                : "border-white/10 text-white/70 hover:border-white/30 hover:text-white",
            )}
          >
            <Languages className="size-3.5" />
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
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-accent bg-accent/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Mobile Demos Section */}
          <div className="mt-2 mb-1">
            <div className="px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
              Demos
            </div>
            {DEMO_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-accent bg-accent/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.key}
                </Link>
              );
            })}
          </div>

          {/* Mobile Login */}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <LogIn className="size-4" />
            Login
          </Link>

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
