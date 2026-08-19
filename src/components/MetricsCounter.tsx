"use client";

import { useEffect, useRef, useState } from "react";

interface MetricTileProps {
  value: number;
  suffix: string;
  label: string;
  /** Ritardo dell'animazione in ms */
  delay?: number;
}

/** Sparkline deterministica derivata dal valore (nessun mismatch SSR) */
function sparklinePoints(value: number, seed = 0): string {
  const w = 96;
  const h = 24;
  const pts: string[] = [];
  const n = 7;
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * w;
    // pattern deterministico: base + oscillazione legata a value/seed
    const y = h - ((value * 7 + seed * 3 + i * 11 + Math.sin(i * 2.1) * 9 + 8) % (h - 6));
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function MetricTile({ value, suffix, label, delay = 0 }: MetricTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now() + delay;
          const tick = (now: number) => {
            if (now < start) {
              requestAnimationFrame(tick);
              return;
            }
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="metric-tile rounded-lg p-5 md:p-6">
      <div className="flex items-end justify-between gap-2">
        <div className="metric-value text-3xl md:text-4xl font-bold leading-none">
          {display}
          <span className="text-accent">{suffix}</span>
        </div>
        {/* Sparkline minimal */}
        <svg
          width="96"
          height="24"
          viewBox="0 0 96 24"
          fill="none"
          aria-hidden
          className="opacity-70"
        >
          <polyline
            points={sparklinePoints(value)}
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <p className="mt-3 text-xs md:text-sm text-muted-foreground font-mono leading-snug">
        {label}
      </p>
    </div>
  );
}