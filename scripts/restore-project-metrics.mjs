/**
 * Restores the project metrics the owner confirmed as real, and adds ShipKit
 * back to the "what I build" section.
 * Run: bun scripts/restore-project-metrics.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const MSG_DIR = join(process.cwd(), "messages");

/** Verified by the site owner on 2026-10-02. */
const metrics = {
  it: {
    vulnclaw: {
      reach: "1.2K+ stelle su GitHub, 80+ PR e 200+ issue gestiti",
      lesson:
        "Il motivo per cui esiste è una decisione di scope: in sei mesi ho detto no al 60% delle feature richieste per spedire il 40% che serviva.",
    },
    synapse: {
      reach: "9.000+ note indicizzate, ognuna con embedding e collegamento",
      lesson:
        "È il posto dove finisce tutto quello che imparo sui processi. Se non lo scrivo lì, lo dimentico: e quello che dimentico è la definizione di conoscenza tribale.",
    },
    shipkit: {
      reach: "12 clienti nei primi tre mesi, €49 una volta",
      lesson:
        "Prodotto nato dalla stessa regola che uso in consulenza: scope dichiarato in un documento, e tutto quello che non c'è scritto come non farà.",
    },
  },
  en: {
    vulnclaw: {
      reach: "1.2K+ GitHub stars, 80+ PRs and 200+ issues triaged",
      lesson:
        "It exists because of one scope decision: over six months I said no to 60% of requested features to ship the 40% that mattered.",
    },
    synapse: {
      reach: "9,000+ notes indexed, each with an embedding and a link",
      lesson:
        "It is where everything I learn about processes ends up. If I do not write it there, I forget it, and what I forget is the definition of tribal knowledge.",
    },
    shipkit: {
      reach: "12 customers in the first three months, €49 one-time",
      lesson:
        "A product built on the same rule I use in consulting: scope written in a document, and anything not written down as something it will not do.",
    },
  },
};

for (const locale of ["it", "en"]) {
  const file = join(MSG_DIR, `${locale}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  const m = metrics[locale];

  // Rebuild the three entries, carrying the real numbers.
  json.projects.built = [
    {
      key: "shipkit",
      title: json.projects.shipkit?.title ?? "ShipKit",
      description: json.projects.shipkit?.description ?? "",
      link: "",
      reach: m.shipkit.reach,
      lesson: m.shipkit.lesson,
    },
    {
      key: "vulnclaw",
      title: json.projects.vulnclaw.title,
      description: json.projects.vulnclaw.description,
      link: json.projects.vulnclaw.link,
      reach: m.vulnclaw.reach,
      lesson: m.vulnclaw.lesson,
    },
    {
      key: "synapse",
      title: json.projects.synapse.title,
      description: json.projects.synapse.description,
      link: json.projects.synapse.link,
      reach: m.synapse.reach,
      lesson: m.synapse.lesson,
    },
  ];

  delete json.projects.vulnclaw;
  delete json.projects.synapse;
  delete json.projects.shipkit;

  json.projects.builtSubtitle =
    locale === "it"
      ? "Tre progetti miei, due aperti. Non li metto qui per fare curriculum: sono gli strumenti dietro il lavoro di sopra, e quello che mi hanno insegnato."
      : "Three projects of mine, two open. Not listed to pad a CV: they are the tools behind the work above, and what they taught me.";

  writeFileSync(file, (JSON.stringify(json, null, 2) + "\n").replace(/\n/g, "\r\n"), "utf8");
  console.log(`${locale}: metriche ripristinate`);
}
