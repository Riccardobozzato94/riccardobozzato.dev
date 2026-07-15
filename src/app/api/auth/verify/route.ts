import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractBearerToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
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
