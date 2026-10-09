import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  OVERRIDE_COOKIE,
  VISITOR_COOKIE,
  asDesign,
  designFromFlagQuery,
} from "@/lib/flag-key";

/**
 * Sticky visitor id plus the QA override.
 * `?flag=brutalist-redesign=brutalist` (or `control`) forces that variant
 * and stores it so the next visits stay on it. Flags Explorer's
 * `vercel-flag-overrides` cookie is honored later by the Flags SDK.
 */
export function proxy(request: NextRequest) {
  const override = designFromFlagQuery(request.nextUrl.searchParams);
  const stickyOverride = asDesign(request.cookies.get(OVERRIDE_COOKIE)?.value);
  const existingVisitor = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitor = existingVisitor || crypto.randomUUID();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-flags-visitor-id", visitor);
  const forced = override ?? stickyOverride;
  if (forced) requestHeaders.set("x-design-override", forced);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  const secure = request.nextUrl.protocol === "https:";
  const cookie = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax" as const,
    secure,
    httpOnly: true,
  };

  if (!existingVisitor) {
    response.cookies.set(VISITOR_COOKIE, visitor, cookie);
  }
  if (override) {
    response.cookies.set(OVERRIDE_COOKIE, override, cookie);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|woff2?)$).*)",
  ],
};
