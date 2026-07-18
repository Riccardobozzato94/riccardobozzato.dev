/**
 * Contact fallback persistence.
 *
 * When Resend email delivery fails (missing/unverified domain, bad `from`
 * address, sandbox restrictions, network error), we never want to lose a
 * contact lead. This writes a structured record to a local JSON file so the
 * lead can be recovered and contacted manually.
 *
 * In production (Netlify serverless) the filesystem is ephemeral, so this is a
 * best-effort safety net only. The production-grade approach is to forward
 * failed leads to a durable queue/store (Netlify Blobs, a DB row, or a
 * secondary email/webhook). See the comment in src/lib/rate-limit.ts for the
 * shared-state caveat.
 */
import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(DATA_DIR, "leads-fallback.json");

export interface ContactFallback {
  name: string;
  email: string;
  message: string;
  savedAt: string;
}

export async function appendContactFallback(entry: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const record: ContactFallback = {
    ...entry,
    savedAt: new Date().toISOString(),
  };

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    let existing: ContactFallback[] = [];
    if (fs.existsSync(FALLBACK_FILE)) {
      const raw = fs.readFileSync(FALLBACK_FILE, "utf-8");
      existing = JSON.parse(raw) as ContactFallback[];
      if (!Array.isArray(existing)) existing = [];
    }
    existing.push(record);
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(existing, null, 2), "utf-8");
  } catch (fsError) {
    // Last resort: ensure the lead is at least visible in logs.
    console.error("Failed to write contact fallback file:", fsError);
    console.error("UNRECOVERED CONTACT LEAD:", record);
  }
}
