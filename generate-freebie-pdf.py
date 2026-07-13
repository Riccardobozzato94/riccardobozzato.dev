from fpdf import FPDF
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "ai-ops-security-playbook.pdf")

FONT_DIR = "C:\\Windows\\Fonts"


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
        self.set_fill_color(20, 24, 35)
        self.rect(x, y, w, h, "F")

    def accent_line(self, x, y, w):
        self.set_draw_color(0, 180, 255)
        self.set_line_width(0.6)
        self.line(x, y, x + w, y)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-18)
        self.set_text_color(130, 130, 130)
        self.set_font("Arial", "I", 8)
        self.cell(0, 8, f"AI Ops Security Playbook  |  Riccardo Bozzato  |  Page {self.page_no()}", align="C")

    def section_title(self, num, title):
        self.ln(4)
        self.set_text_color(0, 180, 255)
        self.set_font("Arial", "B", 15)
        title_full = f"Strategy {num}: {title}" if num else title
        self.cell(0, 9, title_full)
        self.ln(5)
        self.accent_line(self.get_x(), self.get_y(), 60)
        self.ln(7)

    def body_text(self, text):
        self.set_text_color(220, 220, 225)
        self.set_font("Arial", "", 10)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet(self, text, bold_prefix=None):
        self.set_text_color(220, 220, 225)
        self.set_font("Arial", "", 10)
        self.cell(6)
        self.set_text_color(0, 180, 255)
        self.write(5.5, "\u2022 ")
        self.set_text_color(220, 220, 225)
        if bold_prefix:
            self.set_font("Arial", "B", 10)
            self.write(5.5, bold_prefix + " ")
            self.set_font("Arial", "", 10)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def numbered_item(self, num, text, bold_prefix=None):
        self.set_text_color(220, 220, 225)
        self.set_font("Arial", "", 10)
        self.cell(6)
        self.set_text_color(0, 180, 255)
        self.set_font("Arial", "B", 10)
        self.write(5.5, f"{num}. ")
        self.set_text_color(220, 220, 225)
        if bold_prefix:
            self.set_font("Arial", "B", 10)
            self.write(5.5, bold_prefix)
            self.set_font("Arial", "", 10)
        self.multi_cell(0, 5.5, text)
        self.ln(1)


pdf = PlaybookPDF()

# ─── COVER PAGE ───────────────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.set_y(65)
pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 32)
pdf.cell(0, 14, "The AI Ops Security Playbook", align="C")
pdf.ln(16)

pdf.set_text_color(200, 200, 210)
pdf.set_font("Arial", "", 13)
pdf.multi_cell(0, 7.5, "5 Strategies to Secure Your Operations\nWithout Slowing Down Innovation", align="C")
pdf.ln(10)

pdf.accent_line(55, pdf.get_y(), 100)
pdf.ln(14)

pdf.set_text_color(180, 180, 190)
pdf.set_font("Arial", "", 11)
pdf.cell(0, 7, "Riccardo Bozzato", align="C")
pdf.ln(8)
pdf.set_text_color(130, 130, 145)
pdf.set_font("Arial", "I", 10)
pdf.cell(0, 6, "Head of Operations & AI Security Builder", align="C")
pdf.ln(30)

pdf.set_text_color(90, 90, 105)
pdf.set_font("Arial", "", 8)
pdf.cell(0, 5, "riccardobozzato@gmail.com  \u2022  linkedin.com/in/riccardobozzato", align="C")

# ─── PAGE 2 — INTRODUCTION ─────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 18)
pdf.cell(0, 10, "Introduction")
pdf.ln(6)
pdf.accent_line(pdf.get_x(), pdf.get_y(), 50)
pdf.ln(10)

pdf.body_text(
    "After years running operations at a fintech-adjacent company while building security "
    "tools in my spare time, I've learned what actually works. This playbook distills the "
    "tactics I use daily \u2014 no theory, just field-tested practices."
)
pdf.ln(2)
pdf.body_text(
    "My name is Riccardo Bozzato. I am a Head of Operations with a passion for building "
    "secure, resilient systems. My work spans cloud infrastructure, incident response, "
    "compliance automation, and open-source security tooling. I believe that security and "
    "operations are not opposing forces \u2014 when aligned correctly, they amplify each other."
)
pdf.ln(2)
pdf.body_text(
    "This playbook is written for ops leaders, platform engineers, and security builders "
    "who need practical answers. Every strategy here has been tested in production. Use what "
    "fits, adapt what doesn't, and keep shipping."
)

# ─── PAGE 3 — STRATEGY 1 ───────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.section_title(1, "The Ops-Security Alignment Framework")
pdf.body_text(
    "Most security initiatives fail because ops sees them as blockers. When a new control "
    "slows down a deploy or adds friction to incident response, teams route around it. The "
    "result? Shadow IT, alert fatigue, and a false sense of safety."
)
pdf.body_text(
    "The Ops-Security Alignment Framework solves this by requiring every security control "
    "to map directly to an ops metric. If it doesn't improve uptime, reduce response time, "
    "or lower error rate, it needs rethinking \u2014 or it gets cut."
)
pdf.ln(2)
pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "How it works:")
pdf.ln(8)
pdf.bullet("Map each security control to an ops KPI (uptime, MTTR, error budget)")
pdf.bullet("Replace manual approval gates with automated policy checks")
pdf.bullet("Measure security adoption by ops velocity, not compliance scorecards")
pdf.bullet("Review quarterly: if a control doesn't move an ops needle, deprecate it")
pdf.ln(4)
pdf.set_text_color(200, 200, 210)
pdf.set_font("Arial", "I", 10)
pdf.multi_cell(0, 5.5, "Key takeaway: Security shouldn't be a gate. It should be a gear in the machine.")
pdf.ln(2)
pdf.accent_line(pdf.get_x(), pdf.get_y(), 55)

# ─── PAGE 4 — STRATEGY 2 ───────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.section_title(2, "3 Automation Plays That Save 10+ Hours/Week")
pdf.body_text(
    "The biggest time sink in ops-security is manual toil. These three plays eliminate the "
    "busywork so you can focus on what matters."
)
pdf.ln(2)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "Play 1: Automated Incident Triage")
pdf.ln(8)
pdf.body_text("Trigger: Alert fires in monitoring system (e.g., Grafana, Prometheus).")
pdf.body_text("Automation: Logs are fed to an AI classification layer that enriches the alert with severity, affected service, and probable cause. A Slack notification is posted with a structured summary and a link to the runbook.")
pdf.body_text("Time saved: ~4 hours/week per on-call engineer.")
pdf.ln(3)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "Play 2: Compliance as Code")
pdf.ln(8)
pdf.body_text("Trigger: A pull request modifies infrastructure definitions (Terraform, Kubernetes manifests).")
pdf.body_text("Automation: Policy-as-code tools (e.g., Open Policy Agent, Checkov) scan the changes against compliance baselines (SOC2, ISO 27001, internal controls). The pipeline blocks or flags violations before merge.")
pdf.body_text("Time saved: ~3 hours/week per auditor-facing engineer.")
pdf.ln(3)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "Play 3: Self-Healing Runbooks")
pdf.ln(8)
pdf.body_text("Trigger: A known incident pattern is detected (disk full, service crash-loop, cert expiry).")
pdf.body_text("Automation: A runbook automation engine executes remediation steps automatically \u2014 restart service, rotate certificate, scale replica count. Human is notified after resolution.")
pdf.body_text("Time saved: ~4 hours/week in reduced incident response time.")
pdf.ln(4)
pdf.set_text_color(200, 200, 210)
pdf.set_font("Arial", "I", 10)
pdf.multi_cell(0, 5.5, "Total: 10\u201312 hours/week recovered. That's a full shift back to strategic work.")

# ─── PAGE 5 — STRATEGY 3 ───────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.section_title(3, "Build a Security Culture Without Fear")
pdf.body_text(
    "The strongest security posture is worthless if your team is afraid to report issues. "
    "Fear-driven security cultures breed cover-ups and burnout. Here's how to build the "
    "opposite."
)
pdf.ln(2)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "Blameless Post-Mortems")
pdf.ln(8)
pdf.body_text(
    'Every incident ends with a post-mortem that asks "what broke in the system?" not '
    '"who broke it?" The goal is to find the process gap, not the scapegoat. Publish them '
    "internally (anonymized if needed) so the whole org learns."
)
pdf.ln(2)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "Security Champions in Every Team")
pdf.ln(8)
pdf.body_text(
    "Instead of a centralised security team that reviews everything, embed a security "
    "champion in each product team. They get training, tooling access, and a direct line to "
    "the ops security lead. No separate function \u2014 security is everyone's job."
)
pdf.ln(2)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "Metrics That Track Progress, Not Punish Mistakes")
pdf.ln(8)
pdf.body_text(
    "Measure mean time to detect (MTTD), mean time to resolve (MTTR), and vulnerability "
    "remediation rate. Never track individual error counts. Share dashboards publicly within "
    "the org \u2014 transparency builds trust."
)
pdf.ln(2)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, 'The "You Found It, You Own It" Policy')
pdf.ln(8)
pdf.body_text(
    "Whoever discovers a vulnerability owns the fix \u2014 with full support from the team. "
    "This turns finding issues into a point of pride, not a burden. Reward finders with "
    "recognition, not more work."
)

# ─── PAGE 6 — STRATEGY 4 ───────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.section_title(4, "The Open Source Toolchain I Actually Use")
pdf.body_text(
    "Proprietary security tools lock you into their roadmap and pricing. Open source gives "
    "you transparency, community-driven threat intelligence, and full control over your data. "
    "Here's the stack I run in production."
)
pdf.ln(2)

tools = [
    ("Wazuh (SIEM)", "Endpoint detection, log analysis, and file integrity monitoring. Deploy the agent on every server. Centralised dashboard for alerts and compliance reports."),
    ("VulnClaw (Pentesting)", "My own open-source AI-driven penetration testing CLI. Automates recon, exploitation, and reporting. Integrates with CI/CD for pre-merge security gates."),
    ("OpenVAS (Scanning)", "Vulnerability scanning on a weekly cadence. Schedule scans against your internal and external ranges. Feed results into Grafana for trend tracking."),
    ("Grafana (Dashboards)", "Unified observability. Pipe in Wazuh alerts, OpenVAS findings, and VulnClaw reports into a single pane of glass. Correlate security events with ops metrics."),
]
for name, desc in tools:
    pdf.set_text_color(0, 180, 255)
    pdf.set_font("Arial", "B", 11)
    pdf.cell(0, 7, name)
    pdf.ln(7)
    pdf.body_text(desc)
    pdf.ln(1)

pdf.ln(2)
pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "Docker Compose for Testing")
pdf.ln(8)
pdf.set_text_color(180, 200, 210)
pdf.set_font("Arial", "", 8)
compose = """version: '3.8'
services:
  wazuh:
    image: wazuh/wazuh-oss:latest
    ports:
      - "55000:55000"
      - "1514:1514/udp"
  openvas:
    image: greenbone/openvas:latest
    ports:
      - "9392:9392"
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
  vulnclaw:
    build: ./vulnclaw
    depends_on: [wazuh]"""
for line in compose.split("\n"):
    pdf.cell(8)
    pdf.cell(0, 4, line)
    pdf.ln(4)

# ─── PAGE 7 — STRATEGY 5 ───────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.section_title(5, "My Personal Incident Response Checklist")
pdf.body_text(
    "When something goes wrong, you don't have time to think. You follow a checklist. "
    "This is mine \u2014 refined after dozens of real incidents."
)
pdf.ln(3)

checklist = [
    ("Detect & validate", "Is this a real incident or a false positive? Cross-check with at least two data sources before declaring."),
    ("Classify severity", "P1 (service down / data breach) through P4 (cosmetic issue, no user impact). Severity drives response speed."),
    ("Assemble response team", "Pull in the on-call engineer, subject matter expert, and ops lead. Use a dedicated Slack channel."),
    ("Contain", "Stop the bleeding. Isolate affected systems, roll back bad deployments, block malicious IPs. Speed over perfection."),
    ("Eradicate", "Remove the root cause. Patch the vulnerability, delete the malware, rotate compromised credentials."),
    ("Recover", "Restore service to normal. Verify through monitoring that all systems are healthy."),
    ("Document timeline", "Every action, timestamped. This becomes the backbone of your post-mortem."),
    ("Root cause analysis", "Dig into why it happened. Use the 5 Whys. Find the systemic gap, not the surface error."),
    ("Implement preventive measures", "Deploy the fix, update runbooks, add monitoring alerts so this never happens again."),
    ("Post-mortem", "Blameless, actionable, shared. What went well? What went wrong? What will we change?"),
]
for i, (title, desc) in enumerate(checklist, 1):
    pdf.numbered_item(i, desc, bold_prefix=f"{title} \u2014 ")

# ─── LAST PAGE — ABOUT ─────────────────────────────────────────
pdf.add_page()
pdf.dark_rect(0, 0, 210, 297)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 18)
pdf.cell(0, 10, "About Riccardo Bozzato")
pdf.ln(6)
pdf.accent_line(pdf.get_x(), pdf.get_y(), 50)
pdf.ln(10)

pdf.body_text(
    "Riccardo Bozzato is a Head of Operations and AI Security Builder with a track record "
    "of building secure, high-velocity infrastructure. He has spent years bridging the gap "
    "between operations and security \u2014 proving that the two disciplines are strongest when "
    "they work in lockstep."
)
pdf.body_text(
    "He is the creator of VulnClaw, an AI-driven penetration testing CLI, and Trova, an "
    "intelligent search and discovery tool. Both projects are open source and reflect his "
    "belief that security tooling should be accessible, transparent, and community-driven."
)
pdf.body_text(
    "When not architecting ops pipelines or pentesting infrastructure, Riccardo writes "
    "about security operations, automation, and building resilient systems."
)
pdf.ln(6)

pdf.set_text_color(0, 180, 255)
pdf.set_font("Arial", "B", 11)
pdf.cell(0, 7, "Contact & Links")
pdf.ln(8)
pdf.set_text_color(220, 220, 225)
pdf.set_font("Arial", "", 10)
pdf.cell(8)
pdf.cell(0, 6, "Email: riccardobozzato@gmail.com")
pdf.ln(6)
pdf.cell(8)
pdf.cell(0, 6, "LinkedIn: linkedin.com/in/riccardobozzato")
pdf.ln(6)
pdf.cell(8)
pdf.cell(0, 6, "GitHub: github.com/0x1717")
pdf.ln(6)
pdf.cell(8)
pdf.cell(0, 6, "VulnClaw: github.com/0x1717/VulnClaw")
pdf.ln(6)
pdf.cell(8)
pdf.cell(0, 6, "Trova: github.com/0x1717/Trova")
pdf.ln(14)

pdf.accent_line(pdf.get_x(), pdf.get_y(), 60)

# ─── OUTPUT ─────────────────────────────────────────────────────
pdf.output(OUTPUT)
print(f"PDF created: {OUTPUT}")
print(f"Size: {os.path.getsize(OUTPUT) / 1024:.1f} KB")
