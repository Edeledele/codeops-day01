import { cookies } from "next/headers";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const SESSION_COOKIE_NAME = "addis_session";
// Fallback secret for dev/testing
const SESSION_SECRET = process.env.SESSION_SECRET || "addis-eats-secure-session-secret-key-2026";

const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json");

// Global default seed users
const defaultUsers = [

  {
    id: "usr_staff_1",
    email: "staff@addiseats.com",
    name: "Chef Sara Tadesse",
    password: "staff123",
    role: "staff",
    phone: "0922334455",
    address: "Kitchen HQ, Kazanchis, Addis Ababa",
  },
];

function loadUsers() {
  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const data = fs.readFileSync(USERS_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure default users are always preserved
        defaultUsers.forEach((def) => {
          if (!parsed.some((u) => u.email.toLowerCase() === def.email.toLowerCase())) {
            parsed.push(def);
          }
        });
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading users file:", e);
  }
  return [...defaultUsers];
}

function persistUsers(users) {
  try {
    const dir = path.dirname(USERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving users file:", e);
  }
}

// Global in-memory user directory synchronized with data/users.json
export const USERS =
  globalThis.__addisEatsUsers || (globalThis.__addisEatsUsers = loadUsers());

/**
 * Registers a new customer into the user directory and persists to disk
 */
export function registerUser({ name, email, password, phone, address }) {
  const normalizedEmail = (email || "").trim().toLowerCase();
  const existing = USERS.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error("An account with this email address already exists.");
  }

  const newUser = {
    id: `usr_customer_${Date.now()}`,
    email: normalizedEmail,
    name: (name || "").trim() || "Customer",
    password,
    role: "customer",
    phone: (phone || "").trim() || "0911000000",
    address: (address || "").trim() || "Addis Ababa",
  };

  USERS.push(newUser);
  persistUsers(USERS);
  return newUser;
}

/**
 * Restores or updates a user from client localStorage backup into server directory
 */
export function syncUserFromLocal({ name, email, password, phone, address, role }) {
  const normalizedEmail = (email || "").trim().toLowerCase();
  if (!normalizedEmail || !password) return null;

  let existing = USERS.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    existing.password = password;
    if (name) existing.name = name;
    if (phone) existing.phone = phone;
    if (address) existing.address = address;
    persistUsers(USERS);
    return existing;
  }

  const restoredUser = {
    id: `usr_customer_${Date.now()}`,
    email: normalizedEmail,
    name: (name || "").trim() || "Customer",
    password,
    role: role || "customer",
    phone: (phone || "").trim() || "0911000000",
    address: (address || "").trim() || "Addis Ababa",
  };

  USERS.push(restoredUser);
  persistUsers(USERS);
  return restoredUser;
}

/**
 * Verifies email and password against USERS directory and optional localStorage accounts backup
 */
export function verifyCredentials(email, password, localAccounts = []) {
  const normalizedEmail = (email || "").trim().toLowerCase();
  if (!normalizedEmail || !password) return null;

  let user = USERS.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  // If not found on server (e.g. server reset), attempt restoration from client's localAccounts
  if (!user && Array.isArray(localAccounts)) {
    const match = localAccounts.find(
      (la) =>
        la &&
        la.email &&
        la.email.toLowerCase() === normalizedEmail &&
        la.password === password
    );
    if (match) {
      user = syncUserFromLocal(match);
    }
  }

  return user;
}

/**
 * Creates an HMAC signature for a string payload
 */
function signPayload(payload) {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
}

/**
 * Signs and packages user session data into a token
 */
export function createSessionToken(user) {
  const data = JSON.stringify({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone || "",
    address: user.address || "",
    issuedAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });

  const encodedData = Buffer.from(data).toString("base64url");
  const signature = signPayload(encodedData);
  return `${encodedData}.${signature}`;
}

/**
 * Verifies and decodes a session token
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedData, signature] = parts;
  const expectedSignature = signPayload(encodedData);

  // Constant-time signature comparison to prevent timing attacks
  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return null;
  }

  try {
    const raw = Buffer.from(encodedData, "base64url").toString("utf-8");
    const session = JSON.parse(raw);

    if (Date.now() > session.expiresAt) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Retrieves the current verified session from server cookies.
 * Can be used safely in Server Components, Route Handlers, and Server Actions.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const session = verifySessionToken(token);
  if (!session) return null;

  const user = USERS.find((u) => u.id === session.userId);
  if (!user) {
    // If not found in current memory worker, construct from verified HMAC signature payload
    return {
      user: {
        id: session.userId,
        email: session.email,
        name: session.name || "Customer",
        role: session.role || "customer",
        phone: session.phone || "0911000000",
        address: session.address || "Addis Ababa",
      },
      expiresAt: session.expiresAt,
    };
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
    expiresAt: session.expiresAt,
  };
}

/**
 * Sets the httpOnly, secure, sameSite session cookie.
 */
export async function setSession(user) {
  const token = createSessionToken(user);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  });
}

/**
 * Clears the session cookie on sign-out.
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Validates the `next` redirect parameter to strictly forbid absolute URLs
 * and protocol-relative links (defense against Open Redirect vulnerabilities).
 *
 * @param {string|null|undefined} nextUrl - The raw query string parameter
 * @param {string} fallback - Safe fallback destination
 * @returns {string} Sanitized safe relative redirect URL
 */
export function validateNextUrl(nextUrl, fallback = "/account") {
  if (!nextUrl || typeof nextUrl !== "string") {
    return fallback;
  }

  const trimmed = nextUrl.trim();

  // Must begin with a single slash, cannot begin with "//" (protocol-relative),
  // and cannot contain "://" (scheme like http://, https://, javascript:)
  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("/\\") ||
    trimmed.includes("://") ||
    trimmed.includes("\\")
  ) {
    return fallback;
  }

  return trimmed;
}
