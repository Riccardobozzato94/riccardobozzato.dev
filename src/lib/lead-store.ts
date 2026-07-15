/**
 * Lead Storage Abstraction
 *
 * In production (Netlify): uses @netlify/blobs for persistent serverless storage.
 * In development: uses a local JSON file (data/leads.json).
 *
 * This allows the email sequence to work across serverless function invocations
 * without requiring a database.
 */
import type { Lead } from "./email/types";
import * as fs from "fs";
import * as path from "path";

/* ────────── Utils ────────── */

function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/* ────────── Local JSON Store ────────── */

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readLocalLeads(): Lead[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

function writeLocalLeads(leads: Lead[]): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

/* ────────── Netlify Blobs Store ────────── */

async function getNetlifyStore() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore("email-leads");
  } catch {
    return null;
  }
}

async function readNetlifyLeads(): Promise<Lead[]> {
  try {
    const store = await getNetlifyStore();
    if (!store) return [];
    const raw = await store.get("leads", { type: "json" });
    return (raw as Lead[]) || [];
  } catch {
    return [];
  }
}

async function writeNetlifyLeads(leads: Lead[]): Promise<void> {
  try {
    const store = await getNetlifyStore();
    if (!store) return;
    await store.set("leads", JSON.stringify(leads));
  } catch {
    // silently fail
  }
}

/* ────────── Abstraction ────────── */

function isNetlify(): boolean {
  return !!process.env.NETLIFY;
}

async function readLeads(): Promise<Lead[]> {
  if (isNetlify()) {
    return readNetlifyLeads();
  }
  return readLocalLeads();
}

async function writeLeads(leads: Lead[]): Promise<void> {
  if (isNetlify()) {
    return writeNetlifyLeads(leads);
  }
  writeLocalLeads(leads);
}

/* ────────── Public API ────────── */

export async function createLead(name: string, email: string): Promise<Lead> {
  const leads = await readLeads();

  // Check if lead already exists
  const existing = leads.find((l) => l.email === email);
  if (existing) {
    // Re-activate if unsubscribed, reset sequence
    existing.name = name;
    existing.lastStepSent = -1;
    existing.unsubscribed = false;
    existing.signupDate = new Date().toISOString();
    await writeLeads(leads);
    return existing;
  }

  const lead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    signupDate: new Date().toISOString(),
    lastStepSent: -1,
    unsubscribed: false,
    unsubscribeToken: generateToken(),
  };

  leads.push(lead);
  await writeLeads(leads);
  return lead;
}

export async function getLeadByEmail(email: string): Promise<Lead | undefined> {
  const leads = await readLeads();
  return leads.find((l) => l.email === email);
}

export async function getLeadByToken(token: string): Promise<Lead | undefined> {
  const leads = await readLeads();
  return leads.find((l) => l.unsubscribeToken === token);
}

export async function unsubscribeLead(token: string): Promise<boolean> {
  const leads = await readLeads();
  const idx = leads.findIndex((l) => l.unsubscribeToken === token);
  if (idx === -1) return false;
  leads[idx].unsubscribed = true;
  await writeLeads(leads);
  return true;
}

export async function markStepSent(email: string, step: number): Promise<void> {
  const leads = await readLeads();
  const idx = leads.findIndex((l) => l.email === email);
  if (idx === -1) return;
  if (step > leads[idx].lastStepSent) {
    leads[idx].lastStepSent = step;
  }
  await writeLeads(leads);
}

export async function getLeadsDueForStep(
  step: number,
  now: Date
): Promise<Lead[]> {
  const leads = await readLeads();
  const { SEQUENCE } = await import("./email/sequence");

  return leads.filter((lead) => {
    // Skip unsubscribed
    if (lead.unsubscribed) return false;

    // Skip if already sent this step or beyond
    if (lead.lastStepSent >= step) return false;

    // Check if this step is the next one to send
    if (lead.lastStepSent !== step - 1) return false;

    // Check timing
    const signupDate = new Date(lead.signupDate);
    const stepConfig = SEQUENCE[step];
    if (!stepConfig) return false;

    // Step 0 (welcome) is always due immediately
    if (step === 0) return true;

    // Check if enough days have passed
    const targetDate = new Date(signupDate);
    targetDate.setDate(targetDate.getDate() + stepConfig.delayDays);
    return now >= targetDate;
  });
}

export async function getAllLeads(): Promise<Lead[]> {
  return readLeads();
}
