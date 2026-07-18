# Productization Plan — riccardobozzato.dev Demos → Sellable Products

**Owner:** Riccardo Bozzato
**Date:** 2026-07-16
**Scope:** Turn the 6 interactive demo pages into billable products, bundle them into coherent paid offerings, and define a free-to-paid GTM funnel — aligned to the site's Next.js + Netlify + serverless architecture.

> **Benchmark basis (2026):** Usage-based pricing is now the #1 model (31.5% of 521 tools analyzed by CompareTiers; ~60% of SaaS runs some usage component per OpenView). The mainstream B2B entry tier is **$20–$50/mo**, not $10 (Toolradar, 9,024-tool dataset). AI-agent tooling anchors at **$20–$80/mo per seat** (Kopern $79 Pro, let.ai $25–$80/seat, agent.ceo $50 flat) with token/action meters as overage. 14-day trials are the modal standard (32% of trials). These figures ground every price point below.

---

## 1. Positioning Matrix

For each demo: target buyer persona, problem solved, pricing model, suggested price point (€), and packaging role.

| # | Demo (route) | Target Buyer Persona | Problem Solved | Pricing Model | Price Point (€) | Role |
|---|--------------|----------------------|----------------|---------------|-----------------|------|
| 1 | **AI Agent playground** (`/demo/ai-agent`) | Solo dev / SMB eng lead building internal agents | "I need to prototype & run a tool-orchestrating agent without standing up infra" | Hybrid: base subscription + per-run/per-token meter | €29/mo base + usage | **Standalone SaaS** (anchor) |
| 2 | **Cost Calculator** (`/demo/cost-calculator`) | CTO / cloud finops evaluating Lambda vs Workers | "Which serverless runtime is cheaper for my workload?" | Free lead-magnet + paid "export & save profiles" tier | €0 free / €9 one-time export pack | **Lead-magnet → paid feature** |
| 3 | **Automation** (`/demo/automation`) | Ops manager / no-code builder running sequential workflows | "I need reliable multi-step automation without Zapier's per-task tax" | Subscription (per workflow/run) | €19/mo (included in bundle) | **Bundle feature** (AI Ops Toolkit) |
| 4 | **Integration** (`/demo/integration`) | Backend dev doing Shopify→CRM / webhook→DB mapping | "Map JSON payloads between systems without writing glue code" | Subscription (per mapping/throughput) | €19/mo (included in bundle) | **Bundle feature** (AI Ops Toolkit) |
| 5 | **Tech Audit** (`/demo/tech-audit`) | Founder / tech lead pre-funding or pre-acquisition | "Score my stack 0–100 and get a fix roadmap" | One-time report + subscription for re-audits | €49 one-time / €15/mo monitor | **Standalone one-time → MRR** |
| 6 | **Project Planner** (`/demo/turnkey`) | Agency owner / product lead scoping a build | "Generate a real delivery plan: 5 phases, costs, risks" | One-time plan + upsell to done-for-you | €39 one-time / €99 w/ risk deep-dive | **Standalone one-time → services pipe** |

**Rationale highlights**
- **AI Agent playground** is the highest-leverage standalone: it's the only demo with genuine compute cost, so a hybrid base+meter (mirroring Kopern/Dokko 2026 pricing) protects margin while matching the market.
- **Cost Calculator, Automation, Integration** are better as *bundle glue* than standalone SKUs — priced alone they'd look thin next to Zapier (€29.99 Starter) and Make (€10.59 Core). Bundled, they beat the "per-task tax" objection.
- **Tech Audit** and **Project Planner** are natural **one-time purchases** (closer to Trova's €49 model) that double as top-of-funnel for consulting/services.

---

## 2. Packaging — Bundle into 3 Coherent Paid Products

### Product A — **AI Ops Toolkit** (the flagship bundle)
Combines **AI Agent playground + Automation + Integration** (demos 1, 3, 4).
- **Positioning:** "Your serverless AI operations stack — agents, workflows, and integrations in one seat."
- **Pricing (hybrid, benchmark-aligned):**
  - Starter: **€39/mo** — 1 agent workspace, 2,500 automation runs, 5 active mappings, 50k agent tokens incl.
  - Pro: **€79/mo** — 5 agents, 10k runs, 25 mappings, 500k tokens incl. (matches Kopern Pro $79 anchor)
  - Scale: **€199/mo** — unlimited agents, 50k runs, 100 mappings, 3M tokens incl. + overage meter
- **Overage meter (one rate, not a ladder):** €0.30 / 1k agent tokens, €0.02 / automation run, €0.05 / mapping execution. Set a monthly ceiling ("seatbelt") to avoid surprise bills.
- **Why this name:** "Ops" signals serverless/infra buyer; "Toolkit" justifies the 3-in-1 value vs. buying Zapier + a vector DB + an agent host separately.

### Product B — **StackScore** (from Tech Audit, demo 5)
- **Positioning:** "0–100 stack health score + prioritized fix roadmap. Re-audit as you ship."
- **Pricing:** **€49 one-time** audit report → **€15/mo** StackScore Monitor (monthly re-scan, trend line, alert on score drop).
- **Upsell:** feeds directly into the consulting pipeline (architecture review €500–1,500 from existing GROWTH-ANALYSIS.md).

### Product C — **Turnkey Planner** (from Project Planner, demo 6)
- **Positioning:** "Generate a real 5-phase delivery plan with costs & risks in 60 seconds."
- **Pricing:** **€39 one-time** plan → **€99** "Plan + Risk Deep-Dive" (auto-generated risk register + mitigation) → **services upsell** (custom build €3,000–8,000).
- **Cross-sell:** Cost Calculator (demo 2) becomes the free teaser that feeds Turnkey's cost estimates.

**Free layer that stays free:** Cost Calculator stays a free lead-magnet (the "top of funnel" hook) with a €9 one-time "Export & Save Profiles" add-on. This matches the 2026 pattern where freemium is the acquisition channel for bottom-up dev tools.

---

## 3. GTM — Free-to-Paid Funnel

**Existing assets to leverage**
- `AI Ops Security Playbook` (freebie PDF at `public/.../ai-ops-security-playbook.pdf`) — already a lead magnet.
- JWT login area (`src/lib/auth.ts`, `src/app/[locale]/login`) with `admin` / `demo` roles.
- 6-email sequence (code-complete, blocked only on `RESEND_API_KEY` — see GROWTH-ANALYSIS.md).

**Funnel design**
1. **Top (cold):** Visitor lands on a demo. Cost Calculator & Tech Audit are fully usable *unauthenticated* as free teasers.
2. **Capture:** To *run* the AI Agent playground / save an automation / export a mapping, the visitor hits a gate → "Create a free workspace." Email captured → playbook delivered + 6-email sequence fires (once `RESEND_API_KEY` is set).
3. **Gated trial (the key move):** Convert the existing JWT login into a **14-day full-capability trial** of AI Ops Toolkit. Today the `demo` role just unlocks pages; upgrade it so `demo` = trial with a `trial_ends_at` claim. After 14 days, demos degrade to read-only / watermarked unless a Stripe subscription is active.
4. **Nudge:** Email sequence Day 7 = "Your trial expires in 7 days" + case study; Day 14 = "Pick a plan" with Stripe checkout link. Playbook frames Riccardo as the trusted ops-security expert → converts to Trova (€49) and consulting.
5. **Expansion:** StackScore Monitor (€15/mo) and Turnkey (€39) are pitched as one-click add-ons inside the logged-in workspace, not separate signups.

**Why the login area is the right gate:** It already exists (JWT, `use-auth.ts`, `/login`). Minimal change: add `trial_ends_at` + `plan` claims to `AuthPayload`, switch `validateCredentials` to a real user store, and gate the *action* buttons (run agent / save workflow) rather than the whole page. This reuses infrastructure instead of building a new auth system.

---

## 4. Technical Implications — From MOCK to Billable

**Current state:** All 6 demos are client-side MOCK — no backend execution, no persistence, no metering. Auth is a single hard-coded `admin`/`demo` JWT (`src/lib/auth.ts:54` `validateCredentials` checks env vars against `admin`/`demo`).

To make each a real, billable product on the **Netlify serverless** stack:

| Need | What's required | Netlify-aligned approach |
|------|-----------------|--------------------------|
| **Auth tiers** | Real user accounts, `plan` + `trial_ends_at` claims | Replace hard-coded `validateCredentials` with a user table (Netlify DB / Supabase / PlanetScale). Extend `AuthPayload` (`src/lib/auth.ts:11`) with `plan`, `trial_ends_at`. |
| **Usage metering** | Count agent runs, tokens, automation runs, mappings | Netlify Function writes usage events to a DB; `use-auth` enforces monthly ceiling before executing. |
| **Stripe** | Subscriptions, one-time, overage invoices | Stripe Checkout + Webhooks via Netlify Function; map `plan` claim on `checkout.session.completed`. |
| **DB persistence** | Save agents, workflows, mappings, audit reports | Netlify Blobs or a serverless Postgres (Neon/Supabase) — matches existing `lead-store.ts` pattern. |
| **Real execution** | AI Agent must actually call an LLM + tools | Netlify Function proxies to Anthropic/OpenAI with BYOK option (like agent.ceo) to dodge margin risk. |
| **Cost Calculator real data** | Pull live AWS/Cloudflare pricing | Scheduled Netlify Function refreshes pricing cache (Blobs) monthly. |

**Demo-specific real-work checklist**
1. **ai-agent** — wire LLM + tool execution in a Function; meter tokens/runs; BYOK to protect margin.
2. **cost-calculator** — fetch live pricing; persist saved profiles (€9 add-on).
3. **automation** — actual sequential runner in Functions; persist workflows; meter runs.
4. **integration** — real payload transform + outbound webhook/DB write; meter executions.
5. **tech-audit** — real scoring engine (rules + LLM); persist report; StackScore Monitor cron re-scan.
6. **turnkey** — real plan generator (LLM); persist plans; risk deep-dive upsell.

**Margin guardrail (critical for AI features):** Use **BYOK** or a hybrid base+meter so Riccardo never pays raw inference cost. The 2026 benchmark is explicit — pure usage on AI wipes margin; hybrid (base fee + meter) is the winning architecture.

---

## 5. Quick Wins — Top 3 by Effort × Value

| Rank | Product | Effort | Value | Why first |
|------|---------|--------|-------|-----------|
| **1** | **Tech Audit → StackScore (€49 one-time)** | Low (demo already scores 0–100; add PDF export + Stripe one-time + DB save) | High (instant MRR-adjacent revenue, feeds consulting) | Reuses the existing mock logic almost verbatim; no LLM execution risk if scoring is rules-based. |
| **2** | **Project Planner → Turnkey (€39 one-time)** | Low–Med (wrap existing generator in Stripe + PDF) | High (one-time cash + services pipeline) | Cost Calculator already feeds its estimates; natural upsell to €3k–8k builds. |
| **3** | **Cost Calculator → free teaser + €9 export** | Very Low (add auth gate + save profiles) | Medium (top-of-funnel for the whole stack) | Zero AI cost; pure email capture that powers the 14-day trial nudge. |

**Then (next quarter):** AI Ops Toolkit (Product A) is the big build — real agent execution + metering + Stripe subscriptions. Highest value, highest effort; do it after the three quick wins prove the funnel converts.

---

## Appendix — Benchmark Sources (2026)
- CompareTiers, *State of SaaS Pricing 2026* (521 tools): usage-based #1 at 31.5%.
- Toolradar, *B2B SaaS Pricing Benchmarks 2026* (9,024 tools): $20–$50 modal entry tier; 14-day modal trial.
- OpenView / Causo H1-2026: ~60% of SaaS has usage component; hybrid base+meter is default for AI.
- Kopern.ai, let.ai, agent.ceo, Dokko: AI-agent pricing anchors $25–$80/seat + token/action meters.
- Zapier / Make / n8n: automation comparables €10–€30 entry.
