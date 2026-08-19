"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@/i18n/navigation";

/**
 * Easter egg — digitando `sudo hire-me` si apre la modale contatti.
 */
const SECRET = "sudo hire-me";
const HINT = "hint: try typing `sudo hire-me`";

export default function EasterEgg() {
  const t = useTranslations("ai");
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const buffer = useRef("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-SECRET.length);
      if (buffer.current === SECRET) {
        buffer.current = "";
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[95] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-outline-variant bg-surface-container p-0 shadow-2xl shadow-black/50 focus:outline-none">
            {/* Terminal window */}
            <div className="terminal-header rounded-t-lg">
              <span className="terminal-dot close" />
              <span className="terminal-dot minimize" />
              <span className="terminal-dot maximize" />
              <span className="ml-3 text-[10px] text-muted-foreground tracking-wider uppercase font-mono">
                $ {t("easter.title")}
              </span>
            </div>
            <div className="p-6 font-mono">
              <p className="terminal-prompt text-sm">$ sudo hire-me</p>
              <p className="console-log-ok text-sm mt-2">{t("easter.output")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-xs font-bold tracking-wider text-primary-foreground transition-colors hover:brightness-110"
                >
                  {t("easter.cta")}
                </Link>
                <Dialog.Close asChild>
                  <button
                    className="inline-flex items-center rounded-md border border-outline-variant px-5 py-2.5 text-xs font-bold tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t("easter.close")}
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Hint nascosto per gli screen reader / dev */}
      <span className="sr-only">{HINT}</span>
    </>
  );
}