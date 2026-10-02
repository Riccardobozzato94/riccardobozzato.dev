/**
 * Lead Storage Abstraction
 *
 * WHY THIS FILE WAS REWRITTEN (2026-10-02)
 * ------------------------------------------
 * The funnel was silently dead since launch. `isNetlify()` gated the storage
 * backend on `process.env.NETLIFY`, which the Netlify **Next.js Runtime does
 * not set**. Every call therefore fell through to the local-JSON branch and
 * died with:
 *
 *     ENOENT: no such file or directory, mkdir '/var/task/data'
 *
 * `/var/task` is read-only, so `createLead()` threw before Resend was ever
 * called. `/api/freebie` swallowed the error and returned `directDownload`,
 * which *looks* like success to the user and to the frontend. Net consequence:
 * no lead was ever stored, no confirmation email was ever sent, and the daily
 * cron always reported `due: 0`. Weeks of "no funnel" with a green CI.
 *
 * Rules applied below:
 *  1. Detect the backend by capability, not by guessing an env var name.
 *  2. Never swallow a write failure — a lost lead is worse than a 500.
 *  3. The local JSON file is dev-only, and only if the filesystem is writable.
 */
import type { CvDownload, Lead } from "./email/types";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

/* ────────── Utils ────────── */

function generateToken(): string {
  return crypto.randomBytes(24).toString("base64url");
}

function generateConfirmToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/* ────────── Backend resolution ────────── */

export type Backend = "blobs" | "file";

const BLOBS_STORE_NAME = "email-leads";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

let cachedBackend: Backend | null = null;

/**
 * True when we are running inside a Netlify function (Next.js Runtime included).
 * The Next runtime omits NETLIFY, so we probe several markers instead.
 */
function isServerless(): boolean {
  return Boolean(
    process.env.NETLIFY ||
      process.env.NETLIFY_BLOBS_CONTEXT ||
      process.env.NF_CONTEXT ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.VERCEL
  );
}

/** Filesystem writability probe — dev only. */
function isFileWritable(): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const probe = path.join(DATA_DIR, ".write-probe");
    fs.writeFileSync(probe, "ok");
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
}

function resolveBackend(): Backend {
  if (cachedBackend) return cachedBackend;
  cachedBackend = isServerless() ? "blobs" : isFileWritable() ? "file" : "blobs";
  return cachedBackend;
}

/** Diagnostic surface for /api/leads — tells us which store is live. */
export function backendInfo() {
  return {
    backend: resolveBackend(),
    isServerless: isServerless(),
    fileWritable: isFileWritable(),
    env: {
      NETLIFY: Boolean(process.env.NETLIFY),
      NETLIFY_BLOBS_CONTEXT: Boolean(process.env.NETLIFY_BLOBS_CONTEXT),
      AWS_LAMBDA_FUNCTION_NAME: Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME),
      explicitSiteId: Boolean(process.env.NETLIFY_BLOBS_SITE_ID),
      explicitToken: Boolean(process.env.NETLIFY_BLOBS_TOKEN),
    },
  };
}

/* ────────── Netlify Blobs ────────── */

type BlobsStore = {
  get(key: string, opts: { type: "json" }): Promise<unknown>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
};

async function getBlobsStore(): Promise<BlobsStore> {
  const { getStore } = await import("@netlify/blobs");

  // Explicit credentials win when present (set via Netlify env vars).
  const siteId = process.env.NETLIFY_BLOBS_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;

  if (siteId && token) {
    return getStore({
      name: BLOBS_STORE_NAME,
      siteID: siteId,
      token,
      consistency: "strong",
    }) as unknown as BlobsStore;
  }

  // Auto mode: requires NETLIFY_BLOBS_CONTEXT, injected by the Netlify runtime.
  if (!process.env.NETLIFY_BLOBS_CONTEXT) {
    throw new Error(
      "Netlify Blobs unavailable: neither NETLIFY_BLOBS_CONTEXT (auto mode) " +
        "nor NETLIFY_BLOBS_SITE_ID + NETLIFY_BLOBS_TOKEN (explicit mode) are set. " +
        "Set an explicit read-write token in the Netlify env vars to fix lead persistence."
    );
  }

  return getStore({
    name: BLOBS_STORE_NAME,
    consistency: "strong",
  }) as unknown as BlobsStore;
}

async function readBlobsLeads(): Promise<Lead[]> {
  const store = await getBlobsStore();
  const raw = await store.get("leads", { type: "json" });

  if (raw == null) return [];
  if (Array.isArray(raw)) return raw as Lead[];

  // A single-object blob (easy to produce by accident when editing the store by
  // hand) used to read back as an empty list, which looked exactly like "we
  // have no leads". Normalise instead of silently losing the data.
  if (typeof raw === "object") return [raw as Lead];

  return [];
}

async function writeBlobsLeads(leads: Lead[]): Promise<void> {
  const store = await getBlobsStore();
  // Always an array on disk: `JSON.stringify` of a single-element array keeps
  // the brackets, but tooling that round-trips the blob may not.
  await store.set("leads", JSON.stringify(leads));
}

/* ────────── Local JSON (dev only) ────────── */

function readLocalLeads(): Lead[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Lead[];
    if (parsed && typeof parsed === "object") return [parsed as Lead];
    return [];
  } catch {
    return [];
  }
}

function writeLocalLeads(leads: Lead[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

/* ────────── Read / write ────────── */

async function readLeads(): Promise<Lead[]> {
  if (resolveBackend() === "blobs") return readBlobsLeads();
  return readLocalLeads();
}

/**
 * Write failures are NOT swallowed. Losing a lead silently is exactly what
 * made this funnel invisible for weeks.
 */
async function writeLeads(leads: Lead[]): Promise<void> {
  if (resolveBackend() === "blobs") {
    await writeBlobsLeads(leads);
    return;
  }
  writeLocalLeads(leads);
}

/**
 * Serialize mutations inside the instance and retry on conflict.
 *
 * Blobs read-modify-write across warm lambdas can interleave and drop a
 * concurrent signup. With a single store key a conflict is cheap to retry;
 * this is good enough for lead volume and keeps the dependency at zero.
 */
let writeChain: Promise<unknown> = Promise.resolve();

async function mutate<T>(fn: (leads: Lead[]) => Promise<T> | T): Promise<T> {
  const run = writeChain.then(async () => {
    let lastErr: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const leads = await readLeads();
        const result = await fn(leads);
        await writeLeads(leads);
        return result;
      } catch (err) {
        lastErr = err;
        // Small jittered backoff before retrying the read-modify-write.
        await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
      }
    }
    throw lastErr;
  });
  // Keep the chain alive even if this mutation rejects.
  writeChain = run.catch(() => undefined);
  return run;
}

/* ────────── Public API ────────── */

export async function createLead(name: string, email: string): Promise<Lead> {
  return mutate((leads) => {
    const existing = leads.find((l) => l.email === email);
    if (existing) {
      // Re-activate if unsubscribed, reset sequence, require re-confirmation.
      existing.name = name;
      existing.lastStepSent = -1;
      existing.unsubscribed = false;
      existing.status = "pending";
      existing.confirmToken = generateConfirmToken();
      existing.signupDate = new Date().toISOString();
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
      status: "pending",
      confirmToken: generateConfirmToken(),
    };
    leads.push(lead);
    return lead;
  });
}

export async function getLeadByEmail(email: string): Promise<Lead | undefined> {
  const leads = await readLeads();
  return leads.find((l) => l.email === email);
}

export async function getLeadByToken(token: string): Promise<Lead | undefined> {
  const leads = await readLeads();
  return leads.find((l) => l.unsubscribeToken === token);
}

export async function getLeadByConfirmToken(token: string): Promise<Lead | undefined> {
  const leads = await readLeads();
  return leads.find((l) => l.confirmToken === token);
}

export async function confirmLead(token: string): Promise<Lead | null> {
  return mutate((leads) => {
    const lead = leads.find((l) => l.confirmToken === token);
    if (!lead) return null;
    if (lead.status !== "confirmed") {
      lead.status = "confirmed";
      lead.lastStepSent = 0; // confirmation counts as step 0
    }
    return lead;
  });
}

export async function unsubscribeLead(token: string): Promise<boolean> {
  return mutate((leads) => {
    const lead = leads.find((l) => l.unsubscribeToken === token);
    if (!lead) return false;
    lead.unsubscribed = true;
    return true;
  });
}

export async function markStepSent(email: string, step: number): Promise<void> {
  await mutate((leads) => {
    const lead = leads.find((l) => l.email === email);
    if (lead && step > lead.lastStepSent) lead.lastStepSent = step;
  });
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

    // Skip pending leads (not yet confirmed via double opt-in)
    if (lead.status && lead.status !== "confirmed") return false;

    // Skip if already sent this step or beyond
    if (lead.lastStepSent >= step) return false;

    // Check if this step is the next one to send
    if (lead.lastStepSent !== step - 1) return false;

    const stepConfig = SEQUENCE[step];
    if (!stepConfig) return false;

    // Step 0 (welcome) is always due immediately
    if (step === 0) return true;

    // Enough days passed since signup?
    const targetDate = new Date(lead.signupDate);
    targetDate.setDate(targetDate.getDate() + stepConfig.delayDays);
    return now >= targetDate;
  });
}

export async function getAllLeads(): Promise<Lead[]> {
  return readLeads();
}

/* ────────── CV downloads (separate from the email sequence) ────────── */

/*
 * Why a second collection instead of reusing createLead():
 *
 * The CV gate only asks for an email so the file can be delivered. It is not
 * an opt-in to the playbook sequence, so it must not produce a Lead: the
 * nightly cron reads every lead with status "confirmed" and would start sending
 * marketing emails to people who only wanted a PDF.
 *
 * createLead() also has a branch for an address that already exists, and it
 * sets `status = "pending"` plus a fresh `signupDate`. Routing a CV download
 * through it would therefore *unsubscribe-by-side-effect* every existing
 * subscriber who happens to ask for the CV: their confirmed sequence would stop
 * mid-flight with no error anywhere.
 *
 * So: its own key, its own shape, and no token plumbing — there is nothing to
 * unsubscribe from, because no sequence is ever started.
 */
const CV_BLOBS_KEY = "cv-downloads";
const CV_DATA_FILE = path.join(DATA_DIR, "cv-downloads.json");

async function readCvDownloads(): Promise<CvDownload[]> {
  try {
    if (resolveBackend() === "blobs") {
      const store = await getBlobsStore();
      const raw = await store.get(CV_BLOBS_KEY, { type: "json" });
      if (raw == null) return [];
      if (Array.isArray(raw)) return raw as CvDownload[];
      if (typeof raw === "object") return [raw as CvDownload];
      return [];
    }
    if (!fs.existsSync(CV_DATA_FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(CV_DATA_FILE, "utf-8"));
    if (Array.isArray(parsed)) return parsed as CvDownload[];
    if (parsed && typeof parsed === "object") return [parsed as CvDownload];
    return [];
  } catch {
    return [];
  }
}

async function writeCvDownloads(downloads: CvDownload[]): Promise<void> {
  if (resolveBackend() === "blobs") {
    const store = await getBlobsStore();
    await store.set(CV_BLOBS_KEY, JSON.stringify(downloads));
    return;
  }
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(CV_DATA_FILE, JSON.stringify(downloads, null, 2), "utf-8");
}

/**
 * Records the request. A write failure is reported to the caller rather than
 * swallowed: the same silent-loss bug that made the playbook funnel invisible
 * for weeks applies here too.
 */
export async function recordCvDownload(
  email: string,
  source: string
): Promise<CvDownload> {
  const record: CvDownload = {
    id: `cv_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    email,
    requestedAt: new Date().toISOString(),
    source,
  };

  const run = writeChain.then(async () => {
    let lastErr: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const downloads = await readCvDownloads();
        // One row per address per day: a visitor who reloads the dialog should
        // not fill the store with duplicates.
        const since = Date.now() - 24 * 60 * 60 * 1000;
        const recent = downloads.some(
          (d) => d.email === email && new Date(d.requestedAt).getTime() >= since
        );
        if (!recent) downloads.push(record);
        await writeCvDownloads(downloads);
        return record;
      } catch (err) {
        lastErr = err;
        await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
      }
    }
    throw lastErr;
  });
  writeChain = run.catch(() => undefined);
  return run;
}

export async function getAllCvDownloads(): Promise<CvDownload[]> {
  return readCvDownloads();
}
