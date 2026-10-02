export interface TemplateInput {
  name: string;
  email: string;
  unsubscribeToken: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  signupDate: string; // ISO date
  lastStepSent: number; // -1 = none sent yet
  unsubscribed: boolean;
  unsubscribeToken: string;
  status: "pending" | "confirmed";
  confirmToken: string;
}

/**
 * A CV download. Deliberately NOT a Lead.
 *
 * It is stored under its own key so it can never be picked up by the playbook
 * sequence: someone who asks for the CV has not asked for six marketing emails,
 * and reusing `createLead()` would have reset `status` to "pending" on an
 * existing playbook subscriber, silently stopping their sequence.
 */
export interface CvDownload {
  id: string;
  email: string;
  requestedAt: string; // ISO date
  /** Where the gate was opened from, for attribution. */
  source: string;
}
