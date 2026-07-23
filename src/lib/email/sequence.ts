import type { TemplateInput } from "./types";
import {
  welcomeTemplate,
  day1Template,
  day3Template,
  day5Template,
  day7Template,
  day14Template,
} from "./templates";

export interface SequenceStep {
  /** 0-based step index */
  step: number;
  /** Human label (for logging) */
  label: string;
  /** Subject line */
  subject: string;
  /** Delay in days from the previous email (0 = send immediately) */
  delayDays: number;
  /** Template function */
  render: (input: TemplateInput) => string;
}

/**
 * The complete email nurture sequence.
 *
 * Timing (after double opt-in confirmation):
 *   Step 0: Confirmation — sent immediately after signup (marks step 0 as sent on confirm)
 *   Step 1: Day 1        — 1 day after signup
 *   Step 2: Day 3        — 3 days after signup
 *   Step 3: Day 5        — 5 days after signup
 *   Step 4: Day 7        — 7 days after signup
 *   Step 5: Day 14       — 14 days after signup
 *
 * Only confirmed leads (status === "confirmed") are processed by the cron.
 */
export const SEQUENCE: SequenceStep[] = [
  {
    step: 0,
    label: "Welcome & Delivery",
    subject: "Your Operational Chaos Diagnostic is here!",
    delayDays: 0,
    render: welcomeTemplate,
  },
  {
    step: 1,
    label: "Day 1 — The #1 Mistake",
    subject: "The #1 operational mistake I see (and how to fix it)",
    delayDays: 1,
    render: day1Template,
  },
  {
    step: 2,
    label: "Day 3 — Automation Plays",
    subject: "3 automation plays that saved me 10+ hours/week",
    delayDays: 3,
    render: day3Template,
  },
  {
    step: 3,
    label: "Day 5 — Case Study",
    subject: "Case study: How I cut time-to-market by 40%",
    delayDays: 5,
    render: day5Template,
  },
  {
    step: 4,
    label: "Day 7 — Cost of Chaos",
    subject: "The hidden cost of operational chaos (and how to fix it)",
    delayDays: 7,
    render: day7Template,
  },
  {
    step: 5,
    label: "Day 14 — Final CTA",
    subject: "Last chance: Let's fix your operations together",
    delayDays: 14,
    render: day14Template,
  },
];

/**
 * Given a signup date, calculate the target send date for a sequence step.
 * Step 0 goes out immediately (delayDays=0).
 */
export function getSendDate(step: SequenceStep, signupDate: Date): Date {
  const d = new Date(signupDate);
  d.setDate(d.getDate() + step.delayDays);
  d.setHours(9, 0, 0, 0); // Send at 9:00 AM in the recipient's timezone
  return d;
}

/**
 * Check if a sequence step is due to be sent.
 */
export function isStepDue(step: SequenceStep, signupDate: Date, now: Date = new Date()): boolean {
  if (step.delayDays === 0) return true; // Immediate
  const target = getSendDate(step, signupDate);
  return now >= target;
}
