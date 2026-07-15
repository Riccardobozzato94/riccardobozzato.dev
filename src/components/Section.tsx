"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}
