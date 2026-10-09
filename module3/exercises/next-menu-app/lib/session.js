import { cookies } from "next/headers";

const COOKIE = "session";

// Read-only: returns the session id or null (never creates one).
export async function getSessionId() {
  const store = await cookies();
  return store.get(COOKIE)?.value ?? null;
}

// Returns the existing session id, or starts a new one.
// cookies().set() is only allowed in Route Handlers and Server Actions.
export async function ensureSessionId() {
  const store = await cookies();
  const existing = store.get(COOKIE)?.value;
  if (existing) return existing;

  const id = crypto.randomUUID();
  store.set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return id;
}