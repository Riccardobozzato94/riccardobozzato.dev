/**
 * Replaces the home page projects block, which still linked to the three
 * project detail pages deleted on 2026-10-02 (/projects/panificio,
 * /projects/vulnclaw, /projects/synapse) — all three were live 404s.
 *
 * The replacement sends the two clicks that actually exist: the projects page,
 * and the freebie. Both are the next step for the visitor this section targets.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PAGE = join(process.cwd(), "src", "app", "[locale]", "page.tsx");

const replacement = `      {/* ════════════════════════════════════════════
            PROJECTS — rimando alla pagina progetti
          ════════════════════════════════════════════ */}
      {/* Le tre card qui sotto puntavano a /projects/panificio,
          /projects/vulnclaw e /projects/synapse: pagine rimosse il
          2 ottobre 2026, quindi tre 404 in homepage. La storia completa dei
          progetti e ora su /projects, che racconta anche il percorso
          operativo. */}
      <section className="py-[120px] bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="max-w-2xl mx-auto text-center mb-[56px]">
            <p className="text-xs tracking-[0.1em] text-primary mb-4 font-semibold">
              {isIt ? "PROGETTI & DELIVERY" : "PROJECTS & DELIVERY"}
            </p>
            <h2 className="text-[40px] leading-[1.2] tracking-tight font-bold mb-4">
              {isIt ? "Quello che ho gestito, non quello che ho costruito" : "What I ran, not what I built"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isIt
                ? "Quattro aziende, un portfolio da €500K su Magento, Shopware e Pimcore, e un progetto con cliente che puoi ancora aprire."
                : "Four companies, a €500K portfolio on Magento, Shopware and Pimcore, and a client project you can still open."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:gap-6">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {isIt ? "Vedi il percorso" : "See the track record"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/panificiodasergio-it"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-lg border border-outline-variant font-semibold transition-all hover:border-primary/50 hover:-translate-y-0.5"
            >
              {isIt ? "Panificio da Sergio, dal vivo" : "Panificio da Sergio, live"}
              <ExternalLink className="size-4" />
            </Link>
          </div>
        </div>
      </section>

`;

const page = readFileSync(PAGE, "utf8");

// Locate by content, not by the decorative box-drawing banner.
const startRe = /^\s*\{\/\*[^*]*\*\/\}\s*\n\s*PROJECTS — Progetti & Delivery\s*\n\s*[\s\S]{0,400}?\*\/\}/m;
const m = page.match(startRe);
if (!m || m.index === undefined) {
  console.error("Inizio sezione progetti non trovato.");
  process.exit(1);
}
const start = m.index;

const nextRe = /^\s*\{\/\*[\s\S]{0,400}?\*\/\}\s*\n\s*BLOG - Ultimi articoli/m;
const rest = page.slice(start + m[0].length);
const nm = rest.match(nextRe);
if (!nm || nm.index === undefined) {
  console.error("Inizio sezione BLOG non trovato.");
  process.exit(1);
}
const nextMarker = start + m[0].length + nm.index;

const updated = page.slice(0, start) + replacement + page.slice(nextMarker);
writeFileSync(PAGE, updated, "utf8");
console.log("Home: sezione progetti sostituita.");
