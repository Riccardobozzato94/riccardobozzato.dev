import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractBearerToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

// Token verification is unauthenticated (the token IS the credential), so it is
// brute-forceable without a limit: 30 req/IP/60s is generous for a real client
// but stops token-guessing loops.
const MAX_REQUESTS = 30;

export async function GET(request: NextRequest) {
  const limit = rateLimit(request, MAX_REQUESTS);
  if (limit.limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfter),
          "X-RateLimit-Limit": String(MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = extractBearerToken(authHeader);

  if (!token) {
    return NextResponse.json(
      { valid: false, error: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const payload = await verifyToken(token);
    return NextResponse.json({
      valid: true,
      payload: {
        role: payload.role,
        name: payload.name,
        issued_at: payload.iat,
        expires_at: payload.exp,
      },
    });
  } catch {
    return NextResponse.json(
      { valid: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
