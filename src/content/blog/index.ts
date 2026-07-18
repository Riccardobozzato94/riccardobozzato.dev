export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  locale: "en" | "it";
}

export const blogPosts: BlogPost[] = [
  {
    slug: "diagnose-operational-chaos",
    title: "How to Diagnose Operational Chaos in 3 Hours",
    excerpt: "A field-tested framework to map, measure, and prioritize operational debt — before it becomes a crisis.",
    date: "2026-07-17",
    tags: ["Operations", "Framework", "KPI", "Process"],
    locale: "en",
  },
  {
    slug: "ops-security-alignment",
    title: "Why Ops and Security Must Be Friends (Not Frenemies)",
    excerpt: "The traditional approach of security-as-gatekeeper is broken. Here's how to align ops velocity with security posture without sacrificing either.",
    date: "2026-07-10",
    tags: ["Security", "Operations", "Culture"],
    locale: "en",
  },
  {
    slug: "saas-boilerplate-lessons",
    title: "5 Operations Lessons from Building and Shipping a Product",
    excerpt: "What building Trova (a SaaS boilerplate) taught me about delivery, scope, and why the last 10% takes 50% of the time.",
    date: "2026-06-28",
    tags: ["Delivery", "Product", "Lessons", "Scoping"],
    locale: "en",
  },
  {
    slug: "diagnosticare-caos-operativo",
    title: "Come Diagnosticare il Caos Operativo in 3 Ore",
    excerpt: "Un framework testato sul campo per mappare, misurare e prioritizzare il debito operativo — prima che diventi crisi.",
    date: "2026-07-17",
    tags: ["Operations", "Framework", "KPI", "Processi"],
    locale: "it",
  },
  {
    slug: "operazioni-e-sicurezza-allineamento",
    title: "Perché Operations e Sicurezza Devono Essere Amici (Non Nemici)",
    excerpt: "L'approccio tradizionale della sicurezza come gatekeeper è rotto. Ecco come allineare velocità operativa e posture di sicurezza.",
    date: "2026-07-10",
    tags: ["Sicurezza", "Operations", "Cultura"],
    locale: "it",
  },
  {
    slug: "lezioni-operazioni-prodotto",
    title: "5 Lezioni di Operations da Aver Costruito e Shippato un Prodotto",
    excerpt: "Cosa ho imparato costruendo Trova (un boilerplate SaaS) su delivery, scope, e perché l'ultimo 10% prende il 50% del tempo.",
    date: "2026-06-28",
    tags: ["Delivery", "Prodotto", "Lezioni", "Scoping"],
    locale: "it",
  },
];
