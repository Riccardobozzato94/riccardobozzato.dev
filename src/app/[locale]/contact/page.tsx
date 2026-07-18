"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin, Send, MessageSquare, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";
import Section from "@/components/Section";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isIt = locale === "it";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
            <MessageSquare className="size-3.5" />
            {isIt ? "Contattami" : "Contact"}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </Section>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <Section animate>
            <Card className="border-border/50 shadow-lg shadow-black/5">
              <CardContent className="p-6 md:p-8">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                    <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Send className="size-7 text-accent" />
                    </div>
                    <p className="text-xl font-medium">{t("form.success")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                        {t("form.name")}
                      </label>
                      <Input
                        id="name"
                        placeholder={t("form.namePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-background/50 border-border/50 focus-visible:border-accent/50"
                      />
                    </div>
                    <div className="space-y-2">
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
                        className="bg-background/50 border-border/50 focus-visible:border-accent/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                        {t("form.message")}
                      </label>
                      <Textarea
                        id="message"
                        placeholder={t("form.messagePlaceholder")}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="min-h-[140px] bg-background/50 border-border/50 focus-visible:border-accent/50"
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-destructive">{t("form.error")}</p>
                    )}
                    <Button type="submit" className="w-full h-11 rounded-xl" disabled={status === "loading"}>
                      {status === "loading" ? t("form.sending") : t("form.submit")}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </Section>

          {/* Contact Info */}
          <Section animate delay={100}>
            <div className="space-y-6">
              <Card className="border-border/50 shadow-lg shadow-black/5">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground mb-2">
                    <Sparkles className="size-3" />
                    {isIt ? "Scrivimi" : "Reach out"}
                  </div>
                  <a
                    href={`mailto:${t("email")}`}
                    className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-accent/5 transition-colors"
                  >
                    <div className="size-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                      <Mail className="size-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{isIt ? "Email" : "Email"}</p>
                      <p className="font-medium text-foreground/90">{t("email")}</p>
                    </div>
                  </a>
                  <a
                    href={`https://${t("github")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-accent/5 transition-colors"
                  >
                    <div className="size-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                      <Github className="size-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">GitHub</p>
                      <p className="font-medium text-foreground/90">{t("github")}</p>
                    </div>
                  </a>
                  <a
                    href={`https://${t("linkedin")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-accent/5 transition-colors"
                  >
                    <div className="size-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                      <Linkedin className="size-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">LinkedIn</p>
                      <p className="font-medium text-foreground/90">{t("linkedin")}</p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-6 md:p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {isIt ? "Preferisci una chiamata veloce? Contattami su" : "Prefer a quick call? Reach out on"}{" "}
                  <a
                    href={`https://${t("linkedin")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}