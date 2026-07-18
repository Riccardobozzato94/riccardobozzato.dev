/**
 * Email templates for the AI Ops Security Playbook funnel.
 * All templates use inline styles for maximum email client compatibility.
 */
import { APP_URL } from "../resend";

/* ───────── UTILITIES ───────── */

function baseLayout(bodyHtml: string, unsubscribeToken?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Riccardo Bozzato</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:0 0 24px 0;">
              <a href="${APP_URL}" style="text-decoration:none;color:#18181b;font-size:20px;font-weight:700;letter-spacing:-0.5px;">
                Riccardo Bozzato
              </a>
              <span style="display:block;font-size:13px;color:#71717a;margin-top:2px;">
                Operations &amp; Delivery Consultant | PMP®
              </span>
            </td>
          </tr>
          <!-- Body Card -->
          <tr>
            <td style="background-color:#ffffff;border-radius:12px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 16px 0 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #e4e4e7;padding-top:20px;">
                    <p style="margin:0 0 8px 0;font-size:12px;color:#a1a1aa;line-height:1.6;text-align:center;">
                      Riccardo Bozzato — Operations &amp; Delivery Consultant | PMP®<br/>
                      <a href="${APP_URL}" style="color:#18181b;text-decoration:underline;font-weight:500;">riccardobozzato.com</a>
                    </p>
                    <p style="margin:12px 0 0 0;font-size:11px;color:#a1a1aa;line-height:1.6;text-align:center;">
                      ${APP_URL}
                    </p>
                    ${
                      unsubscribeToken
                        ? `<p style="margin:8px 0 0 0;font-size:11px;color:#a1a1aa;text-align:center;">
                            <a href="${APP_URL}/unsubscribe?token=${unsubscribeToken}" style="color:#a1a1aa;text-decoration:underline;">Unsubscribe</a>
                          </p>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(url: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
    <tr>
      <td align="center" style="background-color:#18181b;border-radius:8px;padding:0;">
        <a href="${url}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.2px;border-radius:8px;">
          ${text} →
        </a>
      </td>
    </tr>
  </table>`;
}

function bulletList(items: string[]): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0;">
    ${items
      .map(
        (item) => `<tr>
      <td style="padding:6px 0;font-size:15px;color:#3f3f46;line-height:1.6;">
        <span style="color:#22c55e;margin-right:8px;">✓</span> ${item}
      </td>
    </tr>`
      )
      .join("")}
  </table>`;
}

function signature(email: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:32px;border-top:1px solid #e4e4e7;padding-top:20px;">
    <tr>
      <td style="font-size:14px;color:#52525b;line-height:1.6;">
        <strong>Riccardo Bozzato</strong><br/>
        Operations &amp; Delivery Consultant | PMP®<br/>
        <span style="color:#71717a;font-size:13px;">
          Reply: <a href="mailto:${email}" style="color:#18181b;">${email}</a>
        </span>
      </td>
    </tr>
  </table>`;
}

/* ───────── CONFIRMATION TEMPLATE INPUT ───────── */

export interface ConfirmationTemplateInput {
  name: string;
  email: string;
  confirmUrl: string;
  unsubscribeToken: string;
}

/* ───────── CONFIRMATION TEMPLATE ───────── */

/**
 * Confirmation email — Double opt-in
 * Sent immediately after signup. Asks the user to confirm their subscription.
 * The playbook is delivered on the thank-you page after confirmation.
 */
export function confirmationTemplate({ name, email, confirmUrl, unsubscribeToken }: ConfirmationTemplateInput): string {
  const body = `
    <h1 style="margin:0 0 8px 0;font-size:24px;color:#18181b;letter-spacing:-0.5px;line-height:1.3;">
      Please Confirm Your Subscription
    </h1>
    <p style="margin:0 0 24px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Hey ${name},
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Thanks for signing up for the <strong style="color:#18181b;">AI Ops Security Playbook</strong>.
      You're almost there — just one more step to get your free copy.
    </p>
    <p style="margin:0 0 8px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Click the button below to confirm your email address and start receiving the email sequence:
    </p>
    ${ctaButton(confirmUrl, "Confirm My Subscription")}
    <p style="margin:16px 0 0 0;font-size:13px;color:#71717a;line-height:1.5;">
      If the button doesn't work, copy this URL into your browser:<br/>
      <span style="color:#52525b;">${confirmUrl}</span>
    </p>
    <p style="margin:20px 0 0 0;font-size:15px;color:#52525b;line-height:1.6;">
      Once confirmed, you'll be redirected to the download page for the playbook and I'll start
      sending you practical operations tactics over the next two weeks.
    </p>
    <p style="margin:16px 0 0 0;font-size:13px;color:#71717a;line-height:1.5;">
      Didn't sign up? You can ignore this email — no further messages will be sent.
    </p>
    ${signature(email)}
  `;
  return baseLayout(body, unsubscribeToken);
}

/* ───────── TEMPLATES ───────── */

interface TemplateInput {
  name: string;
  email: string;
  unsubscribeToken: string;
}

/**
 * Email 0 — Welcome & Delivery
 * Sent immediately after signup. Delivers the playbook.
 */
export function welcomeTemplate({ name, email, unsubscribeToken }: TemplateInput): string {
  const body = `
    <h1 style="margin:0 0 8px 0;font-size:24px;color:#18181b;letter-spacing:-0.5px;line-height:1.3;">
      Your Playbook Has Arrived 🚀
    </h1>
    <p style="margin:0 0 24px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Hey ${name},
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Thanks for downloading the <strong style="color:#18181b;">AI Ops Security Playbook</strong>.
      I wrote this based on real client work — these are the actual strategies I use to keep operations
      secure without slowing down innovation.
    </p>
    <p style="margin:0 0 8px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Here's your download link:
    </p>
    ${ctaButton(`${APP_URL}/files/ai-ops-security-playbook.pdf`, "Download the Playbook")}
    <p style="margin:16px 0 0 0;font-size:13px;color:#71717a;line-height:1.5;">
      If the button doesn't work, copy this URL into your browser:<br/>
      <span style="color:#52525b;">${APP_URL}/files/ai-ops-security-playbook.pdf</span>
    </p>
    <p style="margin:20px 0 0 0;font-size:15px;color:#52525b;line-height:1.6;">
      In the next few days, I'll send you a few follow-up emails with practical tactics you can
      apply immediately. <strong style="color:#18181b;">No fluff. No upsells.</strong> Just field-tested operations strategy.
    </p>
    ${signature(email)}
  `;
  return baseLayout(body, unsubscribeToken);
}

/**
 * Email 1 — Day 1: Value Insight
 * The #1 ops-security mistake.
 */
export function day1Template({ name, email, unsubscribeToken }: TemplateInput): string {
  const body = `
    <h1 style="margin:0 0 8px 0;font-size:24px;color:#18181b;letter-spacing:-0.5px;line-height:1.3;">
      The #1 Ops-Security Mistake I See
    </h1>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Hey ${name},
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      After working with a dozen growing digital companies, I keep seeing the same pattern:
    </p>
    <p style="margin:0 0 16px 0;font-size:16px;color:#18181b;font-weight:600;line-height:1.5;padding:16px;background:#f4f4f5;border-radius:8px;">
      "We'll add security later. Right now we need to ship."
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      The result? Security becomes a bottleneck that slows everything down. Teams end up with
      fragmented tooling, manual compliance checks, and firefighting instead of building.
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      <strong style="color:#18181b;">The fix:</strong> Treat security as an operations discipline, not a separate gate.
      When you align security practices with operational workflows, both improve.
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      In the playbook, I dedicated a whole section to this alignment framework. If you haven't
      read it yet, it's the first chapter.
    </p>
    <p style="margin:0 0 0 0;font-size:15px;color:#52525b;line-height:1.6;">
      Next time, I'll share the 3 automation plays that saved me 10+ hours a week.
    </p>
    ${signature(email)}
  `;
  return baseLayout(body, unsubscribeToken);
}

/**
 * Email 2 — Day 3: Automation Plays
 * Specific, tactical value.
 */
export function day3Template({ name, email, unsubscribeToken }: TemplateInput): string {
  const body = `
    <h1 style="margin:0 0 8px 0;font-size:24px;color:#18181b;letter-spacing:-0.5px;line-height:1.3;">
      3 Automation Plays That Save 10+ Hours/Week
    </h1>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Hey ${name},
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Here are three automation plays from the playbook that I use daily:
    </p>

    <h3 style="margin:20px 0 8px 0;font-size:16px;color:#18181b;">1. Automated dependency scanning in CI/CD</h3>
    <p style="margin:0 0 12px 0;font-size:14px;color:#52525b;line-height:1.6;">
      Every PR gets scanned for vulnerable dependencies automatically. No manual checklists.
      No "security review" gates. Just a pass/fail that keeps the pipeline moving.
    </p>

    <h3 style="margin:16px 0 8px 0;font-size:16px;color:#18181b;">2. Infrastructure-as-Code compliance checks</h3>
    <p style="margin:0 0 12px 0;font-size:14px;color:#52525b;line-height:1.6;">
      Terraform and CloudFormation templates are validated against your compliance baseline
      before deployment. Catches misconfigurations before they become incidents.
    </p>

    <h3 style="margin:16px 0 8px 0;font-size:16px;color:#18181b;">3. Automated incident response runbooks</h3>
    <p style="margin:0 0 12px 0;font-size:14px;color:#52525b;line-height:1.6;">
                   When alerts fire, the runbook executes automatically: creates a Slack channel,
      pages the right person, starts logging, and drafts the initial post-mortem. Mean time
      to response drops from hours to minutes.
    </p>

    <p style="margin:20px 0 0 0;font-size:15px;color:#52525b;line-height:1.6;">
      These aren't hypothetical — I've implemented all three across different organizations.
      The playbook has the implementation details for each.
    </p>
    ${signature(email)}
  `;
  return baseLayout(body, unsubscribeToken);
}

/**
 * Email 3 — Day 5: Case Study / Social Proof
 * Real results.
 */
export function day5Template({ name, email, unsubscribeToken }: TemplateInput): string {
  const body = `
    <h1 style="margin:0 0 8px 0;font-size:24px;color:#18181b;letter-spacing:-0.5px;line-height:1.3;">
      Case Study: €500K Portfolio, 40% Faster
    </h1>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Hey ${name},
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Let me share a real example of what operational structure can do.
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      At Esse Solutions, I managed a <strong style="color:#18181b;">€500K+ digital project portfolio</strong>
      coordinating distributed teams of 8-12 across B2B eCommerce (Magento, Shopware) and PIM/DAM (Pimcore).
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      <strong style="color:#18181b;">The challenge:</strong> Multiple projects running in parallel, distributed teams,
      no standardized processes. Status updates took hours, handoffs were messy, and security was
      an afterthought tacked on at the end.
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      <strong style="color:#18181b;">What I did:</strong> Introduced structured Agile processes with automated
      CI/CD pipelines, integrated security scanning, and centralized documentation. Not a big
      bang — just consistent, incremental improvements.
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      <strong style="color:#18181b;">The results:</strong>
    </p>
    ${bulletList([
      "25% increase in team productivity",
      "40% reduction in time-to-market",
      "20% faster project completion",
      "Zero security incidents during the engagement",
    ])}
    <p style="margin:20px 0 0 0;font-size:15px;color:#52525b;line-height:1.6;">
      This is what operational maturity looks like. Not perfection — just systems that make
      the right thing the easy thing.
    </p>
    ${signature(email)}
  `;
  return baseLayout(body, unsubscribeToken);
}

/**
 * Email 4 — Day 7: The Cost of Chaos + CTA
 * Create urgency, introduce consulting.
 */
export function day7Template({ name, email, unsubscribeToken }: TemplateInput): string {
  const body = `
    <h1 style="margin:0 0 8px 0;font-size:24px;color:#18181b;letter-spacing:-0.5px;line-height:1.3;">
      The Hidden Cost of Operational Chaos
    </h1>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Hey ${name},
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Here's something I've learned the hard way: <strong style="color:#18181b;">operational chaos has a compounding cost.</strong>
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Every manual process you keep adds up:
    </p>
    ${bulletList([
      "10 minutes/day per manual report = 40 hours/year",
      "Context switching between tools = 20% productivity loss",
      "Security as an afterthought = rework + technical debt",
      "No standardized onboarding = 2-4 weeks ramp-up per new hire",
    ])}
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Most companies don't notice until they hit a growth wall. Suddenly, the team is working
      harder but shipping slower. Burnout goes up. Quality goes down.
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      <strong style="color:#18181b;">It doesn't have to be this way.</strong>
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      I help growing digital companies build the operational architecture that turns chaos into
      predictable execution. PMP® certified, enterprise experience, product-builder mindset.
    </p>
    <p style="margin:0 0 8px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Want to chat about your specific situation?
    </p>
    ${ctaButton(`mailto:${email}?subject=Let's talk about operations`, "Reply to This Email")}
    <p style="margin:16px 0 0 0;font-size:13px;color:#71717a;line-height:1.5;">
      No sales pitch. Just a conversation about what's working and what's not.
    </p>
    ${signature(email)}
  `;
  return baseLayout(body, unsubscribeToken);
}

/**
 * Email 5 — Day 14: Final Nudge
 * Last chance CTA.
 */
export function day14Template({ name, email, unsubscribeToken }: TemplateInput): string {
  const body = `
    <h1 style="margin:0 0 8px 0;font-size:24px;color:#18181b;letter-spacing:-0.5px;line-height:1.3;">
      Last Chance — Let's Fix Your Operations Together
    </h1>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Hey ${name},
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      Over the past two weeks, I've shared:
    </p>
    ${bulletList([
      "The AI Ops Security Playbook (your download)",
      "The #1 ops-security mistake and how to fix it",
      "3 automation plays that save 10+ hours/week",
      "A real case study with measurable results",
      "The hidden cost of operational chaos",
    ])}
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      This is my last email in this series — unless you want to keep the conversation going.
    </p>
    <p style="margin:0 0 16px 0;font-size:15px;color:#52525b;line-height:1.6;">
      If any of this resonated, I'd love to hear about what you're working on.
      I offer a <strong style="color:#18181b;">free 30-minute consultation</strong> where we can:
    </p>
    ${bulletList([
      "Identify your biggest operational bottleneck",
      "Map out a quick-win action plan",
      "See if there's a fit for ongoing collaboration",
    ])}
    <p style="margin:0 0 8px 0;font-size:15px;color:#52525b;line-height:1.6;">
      No pressure. Just practical advice.
    </p>
    ${ctaButton(`https://calendly.com/riccardobozzato/30min`, "Book Your Free Consultation")}
    <p style="margin:16px 0 0 0;font-size:13px;color:#71717a;line-height:1.5;">
      Or just reply to this email. I read every message personally.
    </p>
    <p style="margin:20px 0 0 0;font-size:15px;color:#52525b;line-height:1.6;">
      Thanks for reading,<br/>
      Riccardo
    </p>
    <p style="margin:8px 0 0 0;font-size:13px;color:#a1a1aa;line-height:1.5;">
      P.S. — If you're not ready to talk but found the content valuable, I'd really appreciate
      it if you forwarded this to someone who might need it.
    </p>
    ${signature(email)}
  `;
  return baseLayout(body, unsubscribeToken);
}
