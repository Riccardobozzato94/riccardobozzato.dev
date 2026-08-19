/**
 * Avatar digitale — placeholder SVG in stile PNGTuber (hoodie + cane).
 * Identità visiva coerente: hero, OG image, favicon, 404.
 * Sostituire con l'avatar reale (stessa composizione) quando disponibile.
 */
export default function Avatar({
  size = 160,
  className,
  ariaHidden = false,
}: {
  size?: number;
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden={ariaHidden}
      className={className}
    >
      {/* Cornice terminal */}
      <rect x="4" y="4" width="192" height="192" rx="8" fill="#11161D" stroke="#1F2937" strokeWidth="1" />
      {/* Corner brackets accent */}
      <path d="M10 30V14a4 4 0 0 1 4-4h16" stroke="#00E58C" strokeWidth="2" strokeLinecap="round" />
      <path d="M190 30v16a4 4 0 0 1-4 4h-16" stroke="#00E58C" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 170v16a4 4 0 0 0 4 4h16" stroke="#00E58C" strokeWidth="2" strokeLinecap="round" />
      <path d="M190 170v-16a4 4 0 0 0-4-4h-16" stroke="#00E58C" strokeWidth="2" strokeLinecap="round" />

      {/* Dot-grid decor */}
      <g fill="#8B949E" opacity="0.18">
        <circle cx="24" cy="96" r="1" />
        <circle cx="36" cy="112" r="1" />
        <circle cx="24" cy="128" r="1" />
        <circle cx="176" cy="96" r="1" />
        <circle cx="164" cy="112" r="1" />
        <circle cx="176" cy="128" r="1" />
      </g>

      {/* Hoodie body */}
      <path
        d="M70 128c0-24 13-38 30-38s30 14 30 38v34H70v-34Z"
        fill="#1B2430"
        stroke="#2E3A48"
        strokeWidth="1.5"
      />
      {/* Hood */}
      <path
        d="M62 96c-6-14-2-30 12-36 12-5 26-5 36 2 12-9 28-8 38-1 12 6 15 20 9 33-4 8-10 13-16 17-3-10-12-17-24-17-13 0-23 8-25 18-6-1-11-4-14-8-4-4-7-5-9-8Z"
        fill="#11161D"
        stroke="#2E3A48"
        strokeWidth="1.5"
      />
      {/* Face silhouette */}
      <ellipse cx="100" cy="92" rx="20" ry="19" fill="#0B0F14" stroke="#2E3A48" strokeWidth="1" />
      {/* Eyes */}
      <circle cx="92" cy="90" r="2.5" fill="#00E58C" />
      <circle cx="108" cy="90" r="2.5" fill="#00E58C" />
      {/* Hood strings */}
      <path d="M86 130c-2 6 2 12 8 12s10-6 8-12" stroke="#00E58C" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Zipper line */}
      <path d="M100 132v26" stroke="#2E3A48" strokeWidth="1.5" />

      {/* Cane (silhouette) */}
      <g>
        {/* orecchie */}
        <path d="M146 158l4-8 4 8" fill="#1B2430" stroke="#2E3A48" strokeWidth="1" />
        <path d="M158 158l4-8 4 8" fill="#1B2430" stroke="#2E3A48" strokeWidth="1" />
        {/* testa */}
        <ellipse cx="154" cy="164" rx="10" ry="8" fill="#1B2430" stroke="#2E3A48" strokeWidth="1" />
        {/* muso */}
        <circle cx="150" cy="166" r="2" fill="#00E58C" />
        {/* corpo */}
        <path d="M146 170c0-6 4-10 8-10s8 4 8 10v12h-16v-12Z" fill="#1B2430" stroke="#2E3A48" strokeWidth="1" />
        {/* coda */}
        <path d="M162 172c5-1 8-4 9-8" stroke="#FFB454" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* Label mono */}
      <text x="14" y="190" fill="#8B949E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
        rb@agent-stack
      </text>
    </svg>
  );
}