import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// ⚠️ SECURITY: no hardcoded fallback. JWT_SECRET MUST be set in production.
// A known fallback would let anyone forge valid admin tokens.
const JWT_SECRET_VALUE = process.env.JWT_SECRET;
if (!JWT_SECRET_VALUE) {
  throw new Error("JWT_SECRET environment variable is required but not set.");
}
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_VALUE);

const JWT_ISSUER = "riccardobozzato.dev";
const JWT_AUDIENCE = "api.riccardobozzato.dev";
const TOKEN_EXPIRY = "24h";

export interface AuthPayload extends JWTPayload {
  role: "admin" | "demo";
  name: string;
}

/**
 * Create a signed JWT for authenticated users.
 */
export async function createToken(payload: Omit<AuthPayload, "iss" | "aud" | "exp" | "iat">): Promise<string> {
  return await new SignJWT({ ...payload } as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT and return the decoded payload.
 * Throws if invalid or expired.
 */
export async function verifyToken(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify(token, JWT_SECRET, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });
  return payload as unknown as AuthPayload;
}

/**
 * Extract Bearer token from Authorization header.
 */
export function extractBearerToken(authHeader?: string | null): string | null {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

/**
 * Verify credentials against environment config.
 */
export function validateCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;
  // No credentials configured => reject all (fail closed, never default to "demo").
  if (!adminUser || !adminPass) return false;
  return username === adminUser && password === adminPass;
}
