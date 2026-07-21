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
    <footer role="contentinfo" className="bg-surface-container-lowest py-16 border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-start px-4 md:px-16 max-w-[1200px] mx-auto gap-6">
        {/* Brand */}
        <div className="max-w-xs">
          <div className="text-xl font-bold text-foreground mb-4">Riccardo Bozzato</div>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Head of Operations | Delivery Manager | PMP®
          </p>
          <p className="text-xs text-muted-foreground/60 mb-4 leading-relaxed">
            €500K+ portfolio · -40% TtM · +25% produttività · 7+ anni
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-1 text-[10px] font-semibold text-primary mb-6">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            {isIt ? "Open to Work" : "Open to Work"}
          </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 flex-1">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">
              {isIt ? "NAVIGA" : "NAVIGATE"}
            </h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("home")}</Link></li>
              <li><Link href="/#vision" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("vision")}</Link></li>
              <li><Link href="/#results" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("results")}</Link></li>
              <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("projects")}</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("blog")}</Link></li>
              <li><Link href="/books" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("books")}</Link></li>
              <li><Link href="/#journey" className="text-sm text-muted-foreground hover:text-primary transition-colors">{nav("journey")}</Link></li>
            </ul>
          </div>
          <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">{isIt ? "RETE" : "NETWORK"}</h4>
            <ul className="space-y-4">
              <li><a href="https://linkedin.com/in/riccardobozzato" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/Riccardobozzato94" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">{isIt ? "STRUMENTI" : "TOOLS"}</h4>
            <ul className="space-y-4">
              <li><a href={`https://www.amazon.${isIt ? "it" : "com"}?tag=rikbozz-21`} target="_blank" rel="noopener noreferrer sponsored" className="text-sm text-muted-foreground hover:text-primary transition-colors">Amazon {isIt ? " (Affiliato)" : " (Affiliate)"}</a></li>
              <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Vercel</a></li>
              <li><a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Netlify</a></li>
              <li><a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Resend</a></li>
              <li><a href="https://plausible.io" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Plausible</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">LEGAL</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">{isIt ? "Accessibilità" : "Accessibility"}</Link></li>
              <li><span className="text-sm text-muted-foreground/40">Terms of Service</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">CMS</h4>
            <ul className="space-y-4">
              <li><a href="/admin/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">{isIt ? "Amministrazione Blog" : "Blog Admin"}</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-16 mt-12 pt-6 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground/60">
            &copy; {currentYear} Riccardo Bozzato. {isIt ? "Tutti i diritti riservati." : "All rights reserved."}
          </p>
          <p className="text-[10px] text-muted-foreground/30">
            {isIt
              ? "Alcuni link sono link di affiliazione. Come acquirente Amazon Associate guadagno dagli acquisti idonei."
              : "Some links are affiliate links. As an Amazon Associate I earn from qualifying purchases."}
          </p>
        </div>
        <div className="flex items-center gap-2 opacity-40 grayscale">
          <span className="text-[10px] font-mono text-muted-foreground">NEXT.JS</span>
          <span className="text-[10px] font-mono text-muted-foreground">SHADCN/UI</span>
          <span className="text-[10px] font-mono text-muted-foreground">TAILWIND CSS</span>
        </div>
      </div>
    </footer>
  );
}
