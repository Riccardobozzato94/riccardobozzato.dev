"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, ShieldCheck } from "lucide-react";

/**
 * Form contatti — su successo reindirizza a /thank-you?from=contact
 * (checklist punto 4: thank-you page post form).
 */
export default function ContactForm() {
  const t = useTranslations("contact");
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

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

      router.push("/thank-you?from=contact");
    } catch {
      setStatus("error");
    }
  }

  return (
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
      <Button type="submit" className="w-full h-11" disabled={status === "loading"}>
        {status === "loading" ? t("form.sending") : t("form.submit")}
      </Button>

      {/* Response-time promise (checklist punto 8) */}
      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
        <ShieldCheck className="size-3.5 text-accent" aria-hidden />
        {t("promise")}
      </p>
    </form>
  );
}