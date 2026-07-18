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
  /** Animation variant: fade-up (default), fade-in, scale-up, slide-left, slide-right */
  variant?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
}

const variantHidden: Record<string, string> = {
  "fade-up": "opacity-0 translate-y-10",
  "fade-in": "opacity-0",
  "scale-up": "opacity-0 scale-95",
  "slide-left": "opacity-0 translate-x-10",
  "slide-right": "opacity-0 -translate-x-10",
};

export default function Section({
  children,
  className,
  id,
  animate = false,
  delay = 0,
  variant = "fade-up",
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
        "mx-auto max-w-6xl px-4 py-[clamp(80px,10vw,120px)] sm:px-6",
        animate && "transition-all duration-700 ease-out",
        animate && !visible && variantHidden[variant],
        animate && visible && "opacity-100 translate-y-0 translate-x-0 scale-100",
        className,
      )}
    >
      {children}
    </section>
  );
}
