"use client";

import { useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

/**
 * FAQ accordion (checklist punto 13) — @radix-ui/react-accordion.
 */
export default function FaqAccordion() {
  const t = useTranslations("ai.faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`faq-${i}`}
          className="group rounded-lg border border-outline-variant bg-surface-container overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground hover:bg-surface-container-high/60 transition-colors [&[data-state=open]]:border-b [&[data-state=open]]:border-outline-variant/60">
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.q}
              </span>
              <ChevronDown
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <p className="px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}