import { NextResponse } from "next/server";
import { verifyCvToken, readCvPdf } from "@/lib/cv-access";
import { rateLimit } from "@/lib/rate-limit";

/**
 * GET /api/cv/file?t=<token> — streams the CV against a signed, expiring token.
 *
 * This is the only place the PDF leaves the server. Anything that reaches the
 * browser still passes through here, which is why the token check happens before
 * the file is read at all.
 */
export async function GET(request: Request) {
  const limit = rateLimit(request, 30);
  if (limit.limited) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const token = new URL(request.url).searchParams.get("t");
  if (!verifyCvToken(token)) {
    // 404, not 403: from the outside this URL does not exist. Distinguishing
    // "expired" from "forged" would only help someone enumerating tokens.
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const pdf = readCvPdf();
  if (!pdf) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="CV-Riccardo-Bozzato.pdf"',
      "Content-Length": String(pdf.length),
      // Private: a signed URL must not end up in a shared cache.
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}