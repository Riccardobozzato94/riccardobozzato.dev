import { NextResponse } from "next/server";
import { getResendClient, FROM_EMAIL } from "@/lib/resend";
import { getLeadsDueForStep, markStepSent } from "@/lib/lead-store";
import { SEQUENCE } from "@/lib/email/sequence";

/**
 * CRON endpoint — called daily by GitHub Actions (or similar).
 *
 * Checks every lead and sends the next email in the sequence if it's due.
 * Step 0 (welcome) is sent immediately at signup, so this handles steps 1-5.
 */
export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
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
  const results: { step: number; label: string; sent: number; errors: string[] }[] = [];

  // Process steps 1 through 5 (step 0 = welcome, sent immediately)
  for (let step = 1; step < SEQUENCE.length; step++) {
    const stepConfig = SEQUENCE[step];
    const dueLeads = await getLeadsDueForStep(step, now);
    const errors: string[] = [];

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
        console.log(`✅ [CRON] Sent step ${step} (${stepConfig.label}) to ${lead.email}`);
      } catch (err) {
        const msg = `Failed step ${step} for ${lead.email}: ${err instanceof Error ? err.message : String(err)}`;
        console.error(`❌ [CRON] ${msg}`);
        errors.push(msg);
      }
    }

    results.push({
      step,
      label: stepConfig.label,
      sent: dueLeads.length,
      errors,
    });
  }

  return NextResponse.json({
    success: true,
    timestamp: now.toISOString(),
    summary: results.map((r) => `${r.label}: ${r.sent} sent, ${r.errors.length} errors`),
    results,
  });
}
