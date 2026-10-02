import { NextResponse } from "next/server";
import { getResendClient, FROM_EMAIL } from "@/lib/resend";
import { getLeadsDueForStep, markStepSent } from "@/lib/lead-store";
import { SEQUENCE } from "@/lib/email/sequence";

/**
 * CRON endpoint - called daily by GitHub Actions (or similar).
 *
 * Checks every **confirmed** lead and sends the next email in the sequence if it's due.
 * Step 0 (confirmation) is sent at signup and marked as sent on confirmation,
 * so this handles steps 1-5 for confirmed leads only.
 *
 * NOTE ON THE URL: CRON_ENDPOINT must point at the Netlify-assigned origin
 * (`https://<site-slug>.netlify.app/api/cron/email-sequence`), NOT the custom
 * domain. The custom domain sits behind Cloudflare, which answers GitHub
 * Actions runner IPs with a managed bot challenge (HTTP 403 "Just a moment...").
 * That silently killed every scheduled run from 2026-09-18 onward.
 */
export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access (fail-closed)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json({
      success: false,
      message: "Resend not configured. Skipping cron run.",
    });
  }

  const now = new Date();
  const results: {
    step: number;
    label: string;
    due: number;
    sent: number;
    errors: string[];
  }[] = [];

  // Process steps 1 through 5 (step 0 = welcome, sent immediately)
  for (let step = 1; step < SEQUENCE.length; step++) {
    const stepConfig = SEQUENCE[step];
    const dueLeads = await getLeadsDueForStep(step, now);
    const errors: string[] = [];
    let sent = 0;

    for (const lead of dueLeads) {
      try {
        const html = stepConfig.render({
          name: lead.name,
          email: lead.email,
          unsubscribeToken: lead.unsubscribeToken,
        });

        await resend.emails.send({
          from: `Riccardo Bozzato <${FROM_EMAIL}>`,
          to: lead.email,
          subject: stepConfig.subject,
          html,
        });

        await markStepSent(lead.email, step);
        sent++;
        console.log(`[CRON] Sent step ${step} (${stepConfig.label}) to ${lead.email}`);
      } catch (err) {
        const msg = `Failed step ${step} for ${lead.email}: ${err instanceof Error ? err.message : String(err)}`;
        console.error(`[CRON] ${msg}`);
        errors.push(msg);
      }
    }

    results.push({
      step,
      label: stepConfig.label,
      due: dueLeads.length,
      sent,
      errors,
    });
  }

  const totalDue = results.reduce((n, r) => n + r.due, 0);
  const totalSent = results.reduce((n, r) => n + r.sent, 0);
  const totalErrors = results.reduce((n, r) => n + r.errors.length, 0);

  return NextResponse.json({
    // success=false when any single send failed, so the caller can alert.
    success: totalErrors === 0,
    timestamp: now.toISOString(),
    due: totalDue,
    sent: totalSent,
    errors: totalErrors,
    summary: results.map((r) => `${r.label}: ${r.sent}/${r.due} sent, ${r.errors.length} errors`),
    results,
  });
}
