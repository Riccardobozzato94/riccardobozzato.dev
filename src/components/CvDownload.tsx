"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, Loader2, FileText, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Email gate in front of the CV.
 *
 * WHY a dialog and not an inline form: the trigger sits inside the hero CTA row
 * and inside a card on the contact page. Expanding inline would reflow the page
 * under the visitor's thumb and push the rest of the section down; a dialog
 * leaves the layout untouched and Radix gives focus trapping, Escape and scroll
 * lock for free.
 *
 * The address is stored (see /api/cv) and starts no email sequence. The copy
 * says so explicitly, because "leave your email" with no stated purpose is
 * exactly the thing people bounce from — or worse, agree to.
 */
export function CvDownload({
  children,
  className,
  source,
  variant = "primary",
}: {
  children?: React.ReactNode;
  className?: string;
  /** Where the gate was opened from, stored for attribution. */
  source: string;
  variant?: "primary" | "outline";
}) {
  const t = useTranslations("cv");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");
  // When the form was rendered: a submit faster than a human can type is a bot.
  // Lazy initialiser, not useRef(Date.now()) — Date.now() during render is
  // impure and React 19's compiler-enforced rules reject it.
  const [formTs, setFormTs] = useState(() => Date.now());

  function reset() {
    setEmail("");
    setConsent(false);
    setStatus("idle");
    setMessage("");
    setDownloadUrl("");
    setHoneypot("");
    setFormTs(Date.now());
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, website: honeypot, ts: formTs, source }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        downloadUrl?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || t("errorGeneric"));
        return;
      }

      const url = data.downloadUrl || "/files/CV-Riccardo-Bozzato.pdf";
      setDownloadUrl(url);
      setStatus("done");

      // Programmatic click: a plain <a download> would be blocked, and opening
      // the file in a tab loses the download attribute.
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "CV-Riccardo-Bozzato.pdf";
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch {
      setStatus("error");
      setMessage(t("errorGeneric"));
    }
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <Dialog.Root open={open} onOpenChange={(next) => {
      setOpen(next);
      if (!next) reset();
    }}>
      <Dialog.Trigger asChild>
        {children ?? (
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-2 h-11 px-4 text-xs font-bold transition-all active:scale-95",
              variant === "primary"
                ? "bg-transparent text-foreground border border-outline-variant hover:bg-surface-container-high"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
              className
            )}
          >
            <Download className="size-4" aria-hidden />
            {t("title")}
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[111] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 max-h-[85vh] overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl focus:outline-none"
          // Radix already handles Escape; this is for the mouse case.
          onInteractOutside={() => undefined}
        >
          {/* Header. On a narrow screen the icon, the title and the close button
              sat on one line and squeezed the description into a 200px column;
              below sm the close button moves out of the flow entirely. */}
          <div className="relative pr-11 sm:pr-0">
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-0 top-0 size-11 -mr-2 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors sm:hidden"
                aria-label={t("close")}
              >
                <X className="size-4" aria-hidden />
              </button>
            </Dialog.Close>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="size-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="size-5 text-primary" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <Dialog.Title className="text-lg font-bold tracking-tight">
                  {t("title")}
                </Dialog.Title>
              </div>
            </div>

            <Dialog.Description className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {t("intro")}
            </Dialog.Description>
          </div>

          <Dialog.Close asChild>
            <button
              type="button"
              className="hidden sm:absolute sm:right-4 sm:top-4 size-11 -mr-2 -mt-2 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label={t("close")}
            >
              <X className="size-4" aria-hidden />
            </button>
          </Dialog.Close>

          {status === "done" ? (
            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="text-sm text-foreground">{t("success")}</p>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download="CV-Riccardo-Bozzato.pdf"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline min-h-11"
                >
                  {t("directLink")}
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {/* Honeypot: rendered off-screen, never filled by a human. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                <label htmlFor="cv-website">Website</label>
                <input
                  id="cv-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cv-email" className="text-sm font-medium text-foreground/80">
                  {t("emailLabel")}
                </label>
                <Input
                  id="cv-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  aria-invalid={status === "error" && !isEmailValid}
                  className="bg-background/50 border-border/50 focus-visible:border-primary/50"
                />
                <p className="text-xs text-muted-foreground/70">{t("fileMeta")}</p>
              </div>

              <label className="flex items-start gap-3 min-h-11 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (status === "error") setStatus("idle");
                  }}
                  className="mt-0.5 size-5 shrink-0 rounded border-border accent-[hsl(var(--primary))]"
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {t("consent")} {" "}
                  <Link
                    href="/privacy"
                    onClick={() => setOpen(false)}
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {status === "error" && message && (
                <p role="alert" className="text-sm text-destructive">
                  {message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-11 rounded-xl"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    <Download className="size-4" aria-hidden />
                    {t("submit")}
                  </>
                )}
              </Button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}