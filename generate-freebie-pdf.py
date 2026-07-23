from fpdf import FPDF
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "public/files/operational-chaos-diagnostic.pdf")

FONT_DIR = "C:\\Windows\\Fonts"

# Brand accent: emerald #22C55E => rgb(34, 197, 94)
ACCENT = (34, 197, 94)
BG = (10, 10, 11)
CARD = (18, 18, 20)
TEXT = (220, 220, 225)
MUTED = (150, 150, 160)


class PlaybookPDF(FPDF):
    def __init__(self):
        super().__init__("P", "mm", "A4")
        self.set_auto_page_break(auto=True, margin=25)
        self.alias_nb_pages()
        self.add_font("Arial", "", os.path.join(FONT_DIR, "arial.ttf"), uni=True)
        self.add_font("Arial", "B", os.path.join(FONT_DIR, "arialbd.ttf"), uni=True)
        self.add_font("Arial", "I", os.path.join(FONT_DIR, "ariali.ttf"), uni=True)
        self.add_font("Arial", "BI", os.path.join(FONT_DIR, "arialbi.ttf"), uni=True)

    def dark_rect(self, x, y, w, h):
        self.set_fill_color(*BG)
        self.rect(x, y, w, h, "F")

    def accent_line(self, x, y, w):
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.6)
        self.line(x, y, x + w, y)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-18)
        self.set_text_color(*MUTED)
        self.set_font("Arial", "I", 8)
        self.cell(0, 8, f"AI Ops Security Playbook  |  riccardobozzato.dev  |  Page {self.page_no()}", align="C")

    def section_title(self, num, title):
        self.ln(4)
        self.set_text_color(*ACCENT)
        self.set_font("Arial", "B", 15)
        title_full = f"Playbook {num}: {title}" if num else title
        self.cell(0, 9, title_full)
        self.ln(5)
        self.accent_line(self.get_x(), self.get_y(), 60)
        self.ln(7)

    def body_text(self, text):
        self.set_text_color(*TEXT)
        self.set_font("Arial", "", 10)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet(self, text, bold_prefix=None):
        w = self.epw - 6
        self.set_x(self.l_margin)
        self.set_text_color(*ACCENT)
        self.set_font("Arial", "B", 10)
        self.cell(6, 5.5, "\u2022")
        self.set_text_color(*TEXT)
        self.set_font("Arial", "", 10)
        self.multi_cell(w, 5.5, (bold_prefix + " " if bold_prefix else "") + text)
        self.ln(1)

    def numbered_item(self, num, text, bold_prefix=None):
        w = self.epw - 6
        self.set_x(self.l_margin)
        self.set_text_color(*ACCENT)
        self.set_font("Arial", "B", 10)
        self.cell(6, 5.5, f"{num}.")
        self.set_text_color(*TEXT)
        self.set_font("Arial", "", 10)
        self.multi_cell(w, 5.5, (bold_prefix if bold_prefix else "") + text)
        self.ln(1)

    def callout(self, text):
        self.ln(2)
        self.set_fill_color(*CARD)
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.3)
        self.set_x(self.l_margin)
        self.set_text_color(*TEXT)
        self.set_font("Arial", "I", 10)
        self.multi_cell(self.epw, 5.5, text, border="L", fill=True)
        self.ln(3)

    def code_block(self, lines):
        self.ln(1)
        self.set_fill_color(*CARD)
        self.set_text_color(180, 255, 200)
        self.set_font("Arial", "", 9)
        w = self.epw - 6
        self.set_x(self.l_margin)
        for ln in lines:
            self.cell(6)
            self.multi_cell(w, 5, ln, fill=True)
        self.ln(3)


pdf = PlaybookPDF()

# ─── COVER PAGE ───────────────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.set_y(55)
pdf.set_text_color(*ACCENT)
pdf.set_font("Arial", "B", 30)
pdf.cell(0, 14, "The AI Ops Security Playbook", align="C")
pdf.ln(15)

pdf.set_text_color(200, 200, 210)
pdf.set_font("Arial", "", 13)
pdf.multi_cell(0, 7.5, "7 field-tested playbooks to align security with operations\nusing AI-driven workflows \u2014 copy-paste ready", align="C")
pdf.ln(10)

pdf.accent_line(55, pdf.get_y(), 100)
pdf.ln(14)

pdf.set_text_color(180, 180, 190)
pdf.set_font("Arial", "", 11)
pdf.cell(0, 7, "Riccardo Bozzato \u2014 faceless builder", align="C")
pdf.ln(8)
pdf.set_text_color(*MUTED)
pdf.set_font("Arial", "I", 10)
pdf.cell(0, 6, "Operations & Delivery Consultant | PMP\u00ae | Security Tool Builder", align="C")
pdf.ln(30)

pdf.set_text_color(90, 90, 105)
pdf.set_font("Arial", "", 8)
pdf.cell(0, 5, "riccardobozzato.dev  \u2022  VulnClaw \u2022 Trova \u2022 OmniVoice", align="C")

# ─── PAGE 2 — HOW TO USE ─────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.set_text_color(*ACCENT)
pdf.set_font("Arial", "B", 18)
pdf.cell(0, 10, "How to use this playbook")
pdf.ln(6)
pdf.accent_line(pdf.get_x(), pdf.get_y(), 50)
pdf.ln(10)

pdf.body_text(
    "This is not a theory book. Each playbook is a ready-to-run procedure you can apply this "
    "week. The co-pilot (my Australian Shepherd) approves every deploy \u2014 you should too, after testing."
)
pdf.body_text("Two ways to consume it:")
pdf.numbered_item(1, "Pick the playbook that matches your biggest pain (slow deploys, alert fatigue, pentest backlog).")
pdf.numbered_item(2, "Run the commands / copy the checklist into your workflow. Tweak to your stack.")
pdf.ln(3)
pdf.callout("Rule of thumb: if a security control slows your MTTR, it is a liability, not a control. Re-engineer it.")

# ─── PLAYBOOK 1 — AI threat-model helper ─────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)
pdf.section_title(1, "AI-Assisted Threat Modeling (in 15 min)")
pdf.body_text(
    "Use an LLM as a brainstorming partner to surface threats fast. Do NOT let it write the final "
    "report \u2014 you validate. Prompt it as an adversary, then as a defender."
)
pdf.body_text("Copy-paste prompt (defender mode):")
pdf.code_block([
    "You are a senior AppSec reviewer. For the system below, list the",
    "top 10 STRIDE threats. For each: component, attack vector,",
    "likelihood (H/M/L), impact (H/M/L), and one concrete mitigation.",
    "System: <paste your architecture in 5 lines>",
])
pdf.bullet("Validate every LLM output against your real attack surface \u2014 hallucinations are common.")
pdf.bullet("Feed the output into your issue tracker as DRAFT, not as truth.")
pdf.callout("Output: a triaged threat list in 15 min instead of a 2-hour meeting.")

# ─── PLAYBOOK 2 — VulnClaw quick pentest ─────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)
pdf.section_title(2, "Your First Local AI Pentest (VulnClaw)")
pdf.body_text(
    "VulnClaw is a local-first AI pentest CLI. No cloud, no data leaving your machine. "
    "Install and run a scoped scan in under 5 minutes."
)
pdf.code_block([
    "pip install vulnclaw",
    "vulnclaw init --target http://localhost:3000",
    "vulnclaw run --scope auth,api --mode authorized-only",
])
pdf.bullet("Always set --mode authorized-only. Unauthorized scanning is illegal.")
pdf.bullet("Review the verifier output: VulnClaw re-runs the PoC before reporting (kills false positives).")
pdf.bullet("Export: vulnclaw report --format owasp > findings.json")
pdf.callout("Never run python_execute on untrusted targets without a sandbox. Your machine is not a lab.")

# ─── PLAYBOOK 3 — Ops KPI alignment ──────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)
pdf.section_title(3, "Map Security to Ops KPIs")
pdf.body_text(
    "Security wins adoption when it moves an ops number. Use this table to justify every control."
)
pdf.bullet("MFA rollout \u2192 measure: failed-login incidents / account-takeover tickets", bold_prefix="")
pdf.bullet("Secrets scanner in CI \u2192 measure: leaked-credential incidents / MTTR on leaks")
pdf.bullet("Policy-as-code \u2192 measure: deploy lead time (should NOT increase)")
pdf.bullet("WAF / rate-limit \u2192 measure: p95 latency (should stay flat)")
pdf.ln(2)
pdf.callout("If a control does not move a KPI in 90 days, deprecate it. Dead controls create alert fatigue.")

# ─── PLAYBOOK 4 — Alert fatigue fix ──────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)
pdf.section_title(4, "Kill Alert Fatigue in 3 Steps")
pdf.body_text("Most SecOps teams drown in noise. Fix it before adding more tooling.")
pdf.numbered_item(1, "Tag every alert: actionable / informative / noise. Delete 'noise' after 2 weeks.")
pdf.numbered_item(2, "Route actionable alerts to on-call with a runbook link \u2014 never to a shared inbox.")
pdf.numbered_item(3, "Auto-triage with an LLM agent: classify, enrich, draft the first response.")
pdf.callout("Target: <5 actionable pages/week per engineer. Above that, your pipeline is the bug.")

# ─── PLAYBOOK 5 — Secure deploy checklist ────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)
pdf.section_title(5, "The 1-Minute Secure Deploy Checklist")
pdf.body_text("Run this before every production release. Cheap insurance.")
pdf.bullet("Secrets scanned (no .env committed, no keys in image layers)")
pdf.bullet("SBOM generated + dependencies CVE-checked")
pdf.bullet("Feature flag on for risky changes (instant rollback)")
pdf.bullet("Error budget remaining > 20%")
pdf.bullet("Rollback command tested in staging this sprint")
pdf.ln(2)
pdf.code_block([
    "# quick CVE check in CI",
    "pip-audit || echo 'FAIL: fix before deploy'",
])
pdf.callout("The dog approves the deploy only after this checklist is green. So should you.")

# ─── PLAYBOOK 6 — AI agent guardrails ────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)
pdf.section_title(6, "Guardrails for AI Agents in Prod")
pdf.body_text("Autonomous agents call tools. One bad tool call = incident. Constrain them.")
pdf.bullet("Allow-list tools per agent \u2014 deny-by-default.")
pdf.bullet("Cap spend per run (e.g. max $0.05) + circuit breaker on 5xx spike.")
pdf.bullet("Log every tool call with input hash for audit.")
pdf.bullet("Human-in-the-loop for any write/delete/external-pay action.")
pdf.callout("Pattern: route cheap model first, promote to expensive only if eval passes. Never open-ended retry loops.")

# ─── PLAYBOOK 7 — Delivery metrics ───────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)
pdf.section_title(7, "Delivery Health Scorecard")
pdf.body_text("A weekly 1-page view for Heads of Ops/Delivery. Track these 5 only.")
pdf.bullet("On-time delivery % (vs sprint commitment)")
pdf.bullet("Cycle time (idea \u2192 prod, median days)")
pdf.bullet("Change failure rate (< 15% is healthy)")
pdf.bullet("MTTR (hours)")
pdf.bullet("Team velocity trend (not absolute \u2014 trend matters)")
pdf.ln(2)
pdf.callout("Review weekly, 15 min standup. If 2 of 5 are red for 3 weeks, freeze features, fix flow.")

# ─── FINAL CTA ───────────────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)
pdf.set_y(70)
pdf.set_text_color(*ACCENT)
pdf.set_font("Arial", "B", 22)
pdf.cell(0, 12, "Start this week.", align="C")
pdf.ln(14)
pdf.set_text_color(200, 200, 210)
pdf.set_font("Arial", "", 12)
pdf.multi_cell(0, 7, "Pick ONE playbook. Run it. Then grab the free Trova boilerplate or test VulnClaw.", align="C")
pdf.ln(12)
pdf.accent_line(65, pdf.get_y(), 80)
pdf.ln(14)
pdf.set_text_color(*MUTED)
pdf.set_font("Arial", "I", 10)
pdf.cell(0, 6, "riccardobozzato.dev  \u2022  @riccardobozzato.dev (IG)  \u2022  riccardobozzato (Twitch)", align="C")
pdf.ln(8)
pdf.cell(0, 6, "Faceless builder. Four-legged co-pilot. Just code.", align="C")

pdf.output(OUTPUT)
print(f"PDF generated: {OUTPUT}")
