"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

const SOCIAL_LINKS = [
  {
    label: "github",
    href: "https://github.com/Riccardobozzato94",
    icon: Github,
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/riccardobozzato/",
    icon: Linkedin,
  },
  {
    label: "email",
    href: "mailto:riccardobozzato@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
            >
              Riccardo Bozzato
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Head of Ops & AI Security Builder
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                <span>Legnaro, PD, Italy</span>
              </div>
              <a
                href="tel:+393892139542"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <Phone className="size-4 shrink-0" />
                <span>+39 389 213 9542</span>
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
                  aria-label={t(`social.${label}`)}
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{t(`social.${label}`)}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center md:justify-center">
            <p className="text-sm text-muted-foreground">
              {t("builtWith")}
            </p>
          </div>

          <div className="flex items-center md:justify-end">
            <p className="text-sm text-muted-foreground">
              {t("copyright", { year: currentYear })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
