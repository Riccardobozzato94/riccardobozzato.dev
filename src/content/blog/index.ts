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
    slug: "ops-security-alignment",
    title: "Why Ops and Security Must Be Friends (Not Frenemies)",
    excerpt: "The traditional approach of security-as-gatekeeper is broken. Here's how to align ops velocity with security posture without sacrificing either.",
    date: "2026-07-10",
    tags: ["Security", "Operations", "Culture"],
    locale: "en",
  },
  {
    slug: "building-vulnclaw",
    title: "Building VulnClaw: An AI Pentesting CLI from Scratch",
    excerpt: "What I learned building an open-source AI-driven penetration testing tool, and why I chose a CLI-first approach over a web UI.",
    date: "2026-06-28",
    tags: ["VulnClaw", "AI", "Python", "Open Source"],
    locale: "en",
  },
  {
    slug: "saas-boilerplate-lessons",
    title: "Lessons from Building Trova: A SaaS Boilerplate That Ships",
    excerpt: "After building the same auth, billing, and email setup for the fifth time, I decided to build it once and for all.",
    date: "2026-06-15",
    tags: ["Trova", "SaaS", "Next.js", "Startup"],
    locale: "en",
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
    slug: "costruire-vulnclaw",
    title: "Costruire VulnClaw: Un CLI di Pentesting AI da Zero",
    excerpt: "Cosa ho imparato costruendo uno strumento open-source di penetration testing basato su AI, e perché ho scelto un approccio CLI.",
    date: "2026-06-28",
    tags: ["VulnClaw", "AI", "Python", "Open Source"],
    locale: "it",
  },
];
