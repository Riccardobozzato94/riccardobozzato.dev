"use client";

import { useTranslations } from "next-intl";
import { Download, Mail, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import Section from "@/components/Section";

export default function ThankYouPage() {
  const t = useTranslations("thankYou");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="!pt-0 !pb-0 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="mx-auto mb-6 size-20 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Download className="size-10 text-accent" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Sparkles className="size-3.5" />
              Success
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-lg mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </Section>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
        {/* Download button */}
        <Section animate>
          <div className="text-center mb-12">
            <a
              href="/files/ai-ops-security-playbook.pdf"
              download
              className="group inline-flex items-center justify-center h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-8 text-base font-medium transition-all duration-300 hover:-translate-y-0.5"
            >
              <Download className="mr-2 size-5" />
              {t("downloadAgain")}
            </a>
          </div>
        </Section>

        {/* What to expect */}
        <Section animate delay={100}>
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-8 space-y-5 mb-12">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Mail className="size-5 text-accent" />
              </div>
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
        </Section>

        {/* Explore more */}
        <Section animate delay={200}>
          <div className="text-center space-y-4">
            <h3 className="font-semibold text-lg">{t("exploreTitle")}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card px-5 py-2.5 text-sm font-medium hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                <BookOpen className="size-4" />
                {t("readBlog")}
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card px-5 py-2.5 text-sm font-medium hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                <ArrowRight className="size-4" />
                {t("viewProjects")}
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}