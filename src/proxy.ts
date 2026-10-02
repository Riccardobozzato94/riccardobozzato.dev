import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractBearerToken } from "@/lib/auth";

const i18nMiddleware = createMiddleware(routing);

// API routes that don't require JWT authentication (they have their own auth)
// - /api/leads uses LEADS_API_KEY (fail-closed)
// - /api/cron/* uses CRON_SECRET
// - Contact/freebie/unsubscribe/confirm are public-by-design (rate-limited)
// - /api/cv is the CV email gate: its own defence is the signed token in
//   /api/cv/file plus origin checking, honeypot and rate limiting. Requiring a
//   JWT here would make the download impossible for the anonymous visitor it is
//   meant for.
// - /api/auth/login must be public for login to work
const PUBLIC_API_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/contact",
  "/api/freebie",
  "/api/unsubscribe",
  "/api/confirm",
  "/api/leads",     // Protected by LEADS_API_KEY (fail-closed)
  "/api/cv",        // Protected by origin check + signed token + rate limit
  "/api/cv/file",   // Protected by the signed, expiring token in the query
];

// Cron/webhook routes that use a shared secret instead of JWT
const CRON_ROUTES = ["/api/cron/"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---- API AUTH ----
  if (pathname.startsWith("/api/")) {
    // Allow public API routes
    if (PUBLIC_API_ROUTES.some((route) => pathname === route)) {
      return NextResponse.next();
    }

    // Allow cron routes with the shared secret, via either scheme:
    // - x-cron-secret header (used by external schedulers)
    // - Authorization: Bearer <CRON_SECRET> (used by GitHub Actions cron
    //   and expected by the /api/cron/* route handlers themselves)
    if (CRON_ROUTES.some((route) => pathname.startsWith(route))) {
      const cronSecret = process.env.CRON_SECRET;
      const okHeader = !!cronSecret && request.headers.get("x-cron-secret") === cronSecret;
      const okBearer =
        !!cronSecret && request.headers.get("authorization") === `Bearer ${cronSecret}`;
      if (okHeader || okBearer) {
        return NextResponse.next();
      }
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // All other API routes require JWT
    const authHeader = request.headers.get("authorization");
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required. Provide a Bearer token." },
        { status: 401 }
      );
    }

    try {
      await verifyToken(token);
      // Token is valid — proceed
      return NextResponse.next();
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 }
      );
    }
  }

  // ---- I18N ROUTING (non-API routes) ----
  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    // Include API routes for auth
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|admin|.*\\..*).*)",
  ],
};
