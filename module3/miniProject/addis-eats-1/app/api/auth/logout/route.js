import { clearSession } from "../../../lib/auth";

export async function POST() {
  await clearSession();
  return Response.json({ success: true, redirectUrl: "/login" });
}

export async function GET(request) {
  await clearSession();
  return Response.redirect(new URL("/login", request.url));
}
