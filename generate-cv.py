from fpdf import FPDF

ACCENT = (78, 222, 163)
DARK_BG = (15, 15, 19)
TEXT = (220, 220, 225)
TEXT_MUTED = (160, 160, 170)
WHITE = (255, 255, 255)


class CV(FPDF):
    def header(self):
        pass

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", size=7)
        self.set_text_color(*TEXT_MUTED)
        self.cell(0, 10, f"Riccardo Bozzato - CV - Page {self.page_no()}/{{nb}}", align="C")

    def section_title(self, title):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*ACCENT)
        self.cell(0, 7, title.upper())
        self.ln(5)
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.3)
        self.line(self.get_x(), self.get_y(), self.get_x() + 190, self.get_y())
        self.ln(4)

    def bullet(self, text):
        self.set_font("Helvetica", size=8.5)
        self.set_text_color(*TEXT)
        self.cell(4, 4.5, "-")
        self.cell(0, 4.5, text)
        self.ln(4.5)

    def entry_header(self, role, company_period):
        self.set_font("Helvetica", "B", 9.5)
        self.set_text_color(*WHITE)
        self.cell(0, 5, role)
        self.ln(5)
        self.set_font("Helvetica", size=8)
        self.set_text_color(*ACCENT)
        self.cell(0, 4, company_period)
        self.ln(4)


def build():
    pdf = CV("P", "mm", "A4")
    pdf.alias_nb_pages()
    pdf.add_page()

    w = pdf.w - 2 * pdf.l_margin

    # Header
    pdf.set_fill_color(*DARK_BG)
    pdf.rect(0, 0, 210, 52, "F")

    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 8, "Riccardo Bozzato", align="C")
    pdf.ln(9)

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 5, "Delivery Manager  |  Head of Operations  |  PMP", align="C")
    pdf.ln(8)

    pdf.set_font("Helvetica", size=7.5)
    pdf.set_text_color(*TEXT_MUTED)
    pdf.cell(0, 4, "Legnaro, PD, Italy  |  riccardobozzato@gmail.com  |  +39 389 213 9542", align="C")
    pdf.ln(4)
    pdf.cell(0, 4, "linkedin.com/in/riccardobozzato  |  github.com/Riccardobozzato94  |  riccardobozzato.com", align="C")
    pdf.ln(6)

    # Professional Summary
    pdf.section_title("Professional Summary")
    pdf.set_font("Helvetica", size=8.5)
    pdf.set_text_color(*TEXT)
    summary = (
        "Operations and delivery leader with a proven track record in scaling startups and managing "
        "multi-hundred-thousand-euro digital project portfolios. I combine deep expertise in Agile "
        "methodologies, process automation, and AI integration to build operational systems that "
        "reduce waste, improve predictability, and free teams to focus on what matters. "
        "PMP-certified with hands-on experience across B2B eCommerce, fintech, and insurance."
    )
    pdf.multi_cell(w, 4.5, summary)
    pdf.ln(3)

    # Core Competencies
    pdf.section_title("Core Competencies")
    comps = [
        ("Agile & Scrum Methodologies", "Process Design & Automation"),
        ("Stakeholder Management", "KPI Framework Design"),
        ("Portfolio Management (EUR500K+)", "AI Integration & Automation"),
        ("Team Leadership (8-12)", ""),
    ]
    pdf.set_font("Helvetica", size=8.5)
    for left, right in comps:
        pdf.set_text_color(*TEXT)
        pdf.cell(4, 5, "-")
        pdf.cell(88, 5, left)
        if right:
            pdf.cell(4, 5, "-")
            pdf.cell(0, 5, right)
        else:
            pdf.cell(0, 5, "")
        pdf.ln(5)
    pdf.ln(2)

    # Professional Experience
    pdf.section_title("Professional Experience")

    pdf.entry_header("Head of Operations", "Ciao Elsa  |  2026")
    pdf.bullet("Built operational governance from scratch in a scaling AI startup")
    pdf.bullet("Defined strategic KPIs and impact/urgency prioritization system")
    pdf.bullet("Reduced rework by 30% through standardized processes")
    pdf.bullet("Implemented delivery frameworks and team workflows")
    pdf.ln(2)

    pdf.entry_header("Delivery Manager", "Esse Solutions  |  2024-2026")
    pdf.bullet("Managed EUR500K+ digital project portfolio across B2B eCommerce")
    pdf.bullet("Led distributed teams of 8-12 across multiple concurrent projects")
    pdf.bullet("Reduced time-to-market by 40% through lean process optimization")
    pdf.bullet("Increased team productivity by 25% with improved workflows")
    pdf.ln(2)

    pdf.entry_header("IT Systems Specialist", "Accenture  |  2022-2024")
    pdf.bullet("Optimized and automated business processes in banking/insurance")
    pdf.bullet("Built SAP UI5 interfaces reducing manual errors by 15%")
    pdf.bullet("Improved operational efficiency by 30% across client engagements")
    pdf.ln(2)

    # Side Projects
    pdf.section_title("Side Projects")
    projects = [
        ("ShipKit", "SaaS boilerplate (EUR49, 12+ customers)"),
        ("VulnClaw", "AI penetration testing CLI (1.2K+ GitHub stars)"),
        ("ric2brain", "AI-powered second brain (9K+ notes)"),
    ]
    for name, desc in projects:
        pdf.set_font("Helvetica", "B", 8.5)
        pdf.set_text_color(*WHITE)
        pdf.cell(14, 5, "- " + name)
        pdf.set_font("Helvetica", size=8.5)
        pdf.set_text_color(*TEXT)
        pdf.cell(0, 5, desc)
        pdf.ln(5)
    pdf.ln(1)

    # Certifications
    pdf.section_title("Certifications")
    pdf.set_font("Helvetica", size=8.5)
    pdf.set_text_color(*TEXT)
    pdf.cell(4, 5, "-")
    pdf.cell(0, 5, "PMP (Project Management Professional)")
    pdf.ln(5)
    pdf.cell(4, 5, "-")
    pdf.cell(0, 5, "ITIL Foundation")
    pdf.ln(5)
    pdf.ln(2)

    # Education
    pdf.section_title("Education")
    pdf.set_font("Helvetica", size=8.5)
    pdf.set_text_color(*TEXT)
    pdf.cell(4, 5, "-")
    pdf.cell(0, 5, "Degree in Information Systems")
    pdf.ln(5)

    # Save
    import os
    out_dir = os.path.join(os.path.dirname(__file__), "public", "files")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "CV-Riccardo-Bozzato.pdf")
    pdf.output(out_path)
    print(f"PDF saved to {out_path}")


if __name__ == "__main__":
    build()
