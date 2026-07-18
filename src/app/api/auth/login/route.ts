/**
 * SECURITY NOTE — CREDENTIAL RISK:
 * Auth validates against ADMIN_USERNAME / ADMIN_PASSWORD env vars (see
 * src/lib/auth.ts). The committed .env currently ships demo credentials
 * (ADMIN_PASSWORD=demo123) and the vault notes document these as LIVE on
 * Netlify. BEFORE PRODUCTION: change ADMIN_PASSWORD to a strong, unique value
 * via Netlify env vars (do NOT hardcode it here or in source), and REDACT the
 * vault note that publishes demo123. The JWT is signed with JWT_SECRET — also
 * rotate that to a strong production value.
 */
import { NextRequest, NextResponse } from "next/server";
import { createToken, validateCredentials } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await createToken({
      role: "admin",
      name: username,
    });

    return NextResponse.json({
      token,
      expires_in: "24h",
      token_type: "Bearer",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
