"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Download,
  ArrowRight,
  FileText,
  X,
} from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

export default function FreebiePage() {
  const t = useTranslations("freebie");

  const whatsInside = t.raw("whatsInside") as string[];
  const how = t.raw("how") as { step: string; title: string; desc: string }[];
  const forWho = t.raw("forWho") as string[];
  const forWhoNot = t.raw("forWhoNot") as string[];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [directDownload, setDirectDownload] = useState<string | null>(null);

  /**
   * Anti-bot fields, sent but never rendered.
   *
   * `website` is a honeypot: real users never fill a field they cannot see, so
   * any value in it is a script. `ts` records when the form was mounted, so the
   * server can reject a submit that arrives faster than a human could type.
   * Neither is announced to assistive tech: `aria-hidden` plus `tabIndex={-1}`
   * keeps them out of the tab order and the accessibility tree.
   */
  const [honeypot, setHoneypot] = useState("");
  const [formTs] = useState(() => Date.now());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/freebie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, consent, website: honeypot, ts: formTs }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setStatus("success");
      if (data.directDownload && data.downloadUrl) {
        setDirectDownload(data.downloadUrl);
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/6 blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-start">
            {/* Left: the pitch */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
                <FileText className="size-3.5" />
                {t("badge")}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight leading-[1.08]">
                {t("title")}
              </h1>

              <p className="text-xl text-foreground/85 mb-6 font-medium leading-snug">
                {t("subtitle")}
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">{t("description")}</p>

              <p className="text-sm text-muted-foreground/70 border-l-2 border-border pl-4 italic leading-relaxed">
                {t("honestNote")}
              </p>
            </div>

            {/* Right: form */}
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-xl shadow-black/5">
                {status === "success" ? (
                  <div className="space-y-5 text-center py-4">
                    <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="size-7 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-bold tracking-tight">{t("form.success")}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("form.successDesc")}
                      </p>
                    </div>
                    {directDownload && (
                      <a
                        href={directDownload}
                        download
                        className="inline-flex items-center justify-center h-12 rounded-xl bg-primary text-primary-foreground px-8 text-sm font-medium transition-all hover:-translate-y-0.5 w-full"
                      >
                        <Download className="mr-2 size-4" />
                        {t("form.downloadNow")}
                      </a>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot: visually and semantically hidden. */}
                    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                      <label htmlFor="fb-website">Website</label>
                      <input
                        id="fb-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                        {t("form.name")}
                      </label>
                      <Input
                        id="name"
                        placeholder={t("form.namePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-11 bg-background/50 border-border/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                        {t("form.email")}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 bg-background/50 border-border/50"
                      />
                    </div>

                    <div className="flex items-start gap-2.5">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-1 size-4 shrink-0 rounded border-border/60 bg-background/50 accent-accent"
                      />
                      <label
                        htmlFor="consent"
                        className="text-xs text-muted-foreground leading-relaxed"
                      >
                        {t("form.privacyNote")}{" "}
                        <Link
                          href="/privacy"
                          className="underline underline-offset-2 hover:text-accent transition-colors"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-destructive bg-destructive/5 rounded-lg p-3">
                        {t("form.error")}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl text-base font-medium"
                      disabled={status === "loading" || !consent}
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">{t("form.sending")}</span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          {t("form.cta")} <ArrowRight className="size-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COSA CONTIENE ═══ */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
            {t("whatsInsideTitle")}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {whatsInside.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                <CheckCircle2 className="size-4 text-accent shrink-0 mt-1" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ═══ COME SI USA ═══ */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
            {t("howTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {how.map((item, i) => (
              <div key={i}>
                <div className="font-mono text-xs text-accent mb-2">{item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ A CHI SERVE / A CHI NO ═══ */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <h2 className="text-lg font-bold tracking-tight mb-5 text-accent">
                {t("forWhoTitle")}
              </h2>
              <ul className="space-y-3">
                {forWho.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight mb-5 text-muted-foreground/70">
                {t("forWhoNotTitle")}
              </h2>
              <ul className="space-y-3">
                {forWhoNot.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <X className="size-3.5 text-muted-foreground/50 shrink-0 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
