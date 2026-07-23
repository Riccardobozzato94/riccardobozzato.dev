"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Loader2, Lock, Mail, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaywallGateProps {
  /** Unique key for localStorage — use the project slug */
  storageKey: string;
  /** The content to reveal after unlock */
  children: React.ReactNode;
  /** Optional custom title for the gate (default: localized "Unlock Case Study") */
  title?: string;
  /** Optional custom subtitle */
  subtitle?: string;
}

export default function PaywallGate({ storageKey, children, title, subtitle }: PaywallGateProps) {
  const t = useTranslations("freebie.form");
  const locale = useLocale();
  const isIt = locale === "it";
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const flag = localStorage.getItem(`paywall:${storageKey}`);
    if (flag === "unlocked") setUnlocked(true);
  }, [storageKey]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/freebie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (!res.ok) throw new Error("Failed");

      localStorage.setItem(`paywall:${storageKey}`, "unlocked");
      setDone(true);
      setTimeout(() => setUnlocked(true), 800);
    } catch {
      setError(isIt ? "Qualcosa è andato storto. Riprova." : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }, [name, email, storageKey, isIt]);

  if (unlocked) return <>{children}</>;

  return (
    <div className="relative">
      {/* Blurred preview of content */}
      <div className="pointer-events-none select-none blur-sm opacity-30 scale-[0.98]">
        {children}
      </div>

      {/* Gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4" style={{ top: "30%" }}>
        <div className="w-full max-w-md mx-auto">
          {!done ? (
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 text-center shadow-2xl">
              <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 mb-4">
                <Lock className="size-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-1">
                {title || (isIt ? "Sblocca il Case Study" : "Unlock the Case Study")}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {subtitle || (isIt
                  ? "Inserisci nome ed email per accedere ai dettagli completi del progetto."
                  : "Enter your name and email to access the full project details.")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    required
                    className="w-full rounded-lg border border-border/50 bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    required
                    className="w-full rounded-lg border border-border/50 bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || !name.trim() || !email.trim()}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-2.5 px-5 rounded-lg text-sm transition-all",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "shadow-lg shadow-primary/20",
                  )}
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      {isIt ? "Sblocca Ora" : "Unlock Now"}
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-muted-foreground/60 mt-4">
                {isIt
                  ? "Niente spam. Ti cancelli quando vuoi."
                  : "No spam. Unsubscribe anytime."}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 text-center shadow-2xl animate-in fade-in zoom-in">
              <div className="inline-flex items-center justify-center size-12 rounded-full bg-green-500/10 mb-4">
                <CheckCircle2 className="size-5 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-1">
                {isIt ? "Accesso Sbloccato!" : "Access Granted!"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isIt
                  ? "Grazie! Il contenuto è ora visibile."
                  : "Thanks! The content is now visible."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
