"use client";

import { useTranslations } from "next-intl";
import { Download, Mail, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  const t = useTranslations("thankYou");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
      {/* Success icon */}
      <div className="size-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
        <Download className="size-10 text-accent" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {t("title")}
      </h1>

      <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
        {t("subtitle")}
      </p>

      {/* Direct download button */}
      <div className="mb-12">
        <a
          href="/files/ai-ops-security-playbook.pdf"
          download
          className="inline-flex items-center justify-center h-12 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-8 text-base font-medium transition-colors"
        >
          <Download className="mr-2 size-5" />
          {t("downloadAgain")}
        </a>
      </div>

      {/* What to expect */}
      <div className="border border-border/50 rounded-xl p-8 text-left space-y-4 mb-12">
        <div className="flex items-center gap-3">
          <Mail className="size-5 text-accent" />
          <h3 className="font-semibold text-lg">{t("whatsNextTitle")}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {t("whatsNextText")}
        </p>
        <ul className="space-y-2">
          {[
            t("email1"),
            t("email2"),
            t("email3"),
            t("email4"),
            t("email5"),
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <ArrowRight className="size-4 text-accent shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Explore more */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">{t("exploreTitle")}</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-4 py-2 text-sm hover:border-accent/50 transition-colors"
          >
            <BookOpen className="size-4" />
            {t("readBlog")}
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-4 py-2 text-sm hover:border-accent/50 transition-colors"
          >
            <ArrowRight className="size-4" />
            {t("viewProjects")}
          </Link>
        </div>
      </div>
    </div>
  );
}
