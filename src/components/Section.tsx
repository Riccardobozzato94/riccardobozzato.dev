"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** If true, fades in on scroll */
  animate?: boolean;
  /** Delay in ms before animation starts */
  delay?: number;
}

export default function Section({
  children,
  className,
  id,
  animate = false,
  delay = 0,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (!animate || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate, delay]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24",
        animate && "transition-all duration-700 ease-out",
        animate && !visible && "opacity-0 translate-y-8",
        animate && visible && "opacity-100 translate-y-0",
        className,
      )}
    >
      {children}
    </section>
  );
}
