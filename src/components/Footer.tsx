"use client";

import { useTranslations, useLocale } from "next-intl";
import { MapPin, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const isIt = locale === "it";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest py-16 border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-start px-4 md:px-16 max-w-[1200px] mx-auto gap-6">
        {/* Brand */}
        <div className="max-w-xs">
          <div className="text-xl font-bold text-foreground mb-4">Riccardo Bozzato</div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Senior Delivery Manager | Head of Operations | PMP®
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              Legnaro, PD, Italy
            </div>
            <a href="mailto:riccardobozzato@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="size-4" />
              riccardobozzato@gmail.com
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 flex-1">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">
              {isIt ? "NAVIGA" : "NAVIGATE"}
            </h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("home")}</Link></li>
              <li><Link href="/#vision" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("vision")}</Link></li>
              <li><Link href="/#results" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("results")}</Link></li>
              <li><Link href="/#journey" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("journey")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">NETWORK</h4>
            <ul className="space-y-4">
              <li><a href="https://linkedin.com/in/riccardobozzato" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/Riccardobozzato94" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">LEGAL</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><span className="text-sm text-muted-foreground/40">Terms of Service</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-16 mt-12 pt-6 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground/60">
          &copy; {currentYear} Riccardo Bozzato. Strategic Execution. All rights reserved.
        </p>
        <div className="flex items-center gap-2 opacity-40 grayscale">
          <span className="text-[10px] font-mono text-muted-foreground">NEXT.JS</span>
          <span className="text-[10px] font-mono text-muted-foreground">SHADCN/UI</span>
          <span className="text-[10px] font-mono text-muted-foreground">TAILWIND CSS</span>
        </div>
      </div>
    </footer>
  );
}
