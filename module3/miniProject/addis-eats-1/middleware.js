import { NextResponse } from "next/server";

export const config = {
  // Narrow matcher targeting exclusively protected routes
  matcher: [
    "/account/:path*",
    "/orders/history/:path*",
    "/staff/:path*",
  ],
};

function parseToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  try {
    const raw = Buffer.from(parts[0], "base64url").toString("utf-8");
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) return null;
    return session;
  } catch {
    return null;
  }
}

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = request.cookies.get("addis_session")?.value;
  const session = parseToken(sessionCookie);

  // 1. Signed-out visitors: redirect to /login and remember destination
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    const destination = pathname + (search || "");
    loginUrl.searchParams.set("next", destination);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Staff-only route enforcement at middleware boundary
  if (pathname.startsWith("/staff") && session.role !== "staff") {
    const unauthorizedUrl = new URL("/unauthorized", request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}
