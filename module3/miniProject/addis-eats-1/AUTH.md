# Addis Eats · Authentication & Security Architecture (AUTH.md)

This document specifies the security layers implemented across protected routes in Addis Eats, details what each architectural layer proves, and documents three security attacks tested against the application along with the defense mechanisms that prevented them.

---

## 1. Protected Routes Matrix

| Protected Route | Layer 1: Middleware (`middleware.js`) | Layer 2: Server Component SSR (`getSession()`) | Layer 3: Data Scoping & Mutation Checks | What Each Layer Proves |
| :--- | :--- | :--- | :--- | :--- |
| **`/account`** | Narrow matcher intercepts request; checks for valid session cookie; redirects to `/login?next=/account` if missing. | Server Component calls `await getSession()`; if no session, immediately redirects to `/login`. | Queries are strictly scoped to `session.user.id` (`getUserOrders(userId)`). Ignores any client-supplied ID parameters. | **Layer 1** proves network perimeter enforcement and UX destination retention.<br>**Layer 2** proves defense-in-depth even if middleware is bypassed.<br>**Layer 3** proves IDOR prevention (cannot inspect other customers' orders). |
| **`/staff`** | Middleware intercepts `/staff/*`; verifies session token AND validates `session.role === 'staff'`. Non-staff redirected to `/unauthorized`. | Server Component calls `await getSession()` and checks `if (session.user.role !== 'staff') redirect('/unauthorized')`. | Staff can access aggregated queue data (`getAllOrders()`). Customer sessions cannot execute staff actions. | **Layer 1** proves edge role-based access control (RBAC).<br>**Layer 2** proves server render authorization independent of routing proxies.<br>**Layer 3** proves least-privilege data isolation. |
| **`/orders/history`** | Narrow matcher prevents unauthenticated navigation; redirects to `/login`. | SSR verifies session validity. | Scoped strictly to the session ID. | Proves consistent perimeter defense on private user history. |
| **`/api/orders/cancel`** (Write Action) | N/A (Route handler protected at application logic level). | Checks `const session = await getSession()`; returns HTTP 401 if null. | Checks ownership: `order.userId === session.user.id || session.user.role === 'staff'`. Returns HTTP 403 Forbidden otherwise. | **Session check** proves authentication on every write.<br>**Ownership check** proves horizontal privilege escalation prevention (cannot cancel another user's order). |

---

## 2. Cookie Security Attributes

The session cookie (`addis_session`) is configured in [app/lib/auth.js](file:///c:/Users/Edel/Desktop/codeops/module3/miniProject/addis-eats-1/app/lib/auth.js) with:

```javascript
cookieStore.set("addis_session", token, {
  httpOnly: true,                         // Inaccessible to JavaScript (XSS mitigation)
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "lax",                        // CSRF mitigation across cross-site navigations
  path: "/",
  maxAge: 24 * 60 * 60,                   // 24-hour expiration
});
```

Tokens are cryptographically signed with HMAC-SHA256 and compared using constant-time verification (`crypto.timingSafeEqual`) to thwart timing attacks and cookie tampering.

---

## 3. Three Documented Attacks Against Addis Eats

### Attack 1: Open Redirect Vulnerability via `next` Parameter

- **Attack Vector**:
  An attacker sends a phishing link to a user:
  `http://localhost:3000/login?next=https://evil-phishing-site.com/fake-login`
  or a protocol-relative link:
  `http://localhost:3000/login?next=//evil-phishing-site.com`
  Expecting that after legitimate sign-in, the application will redirect the victim to the attacker's domain to steal credentials or download malware.

- **What Happened**:
  The application intercepted the redirect request through `validateNextUrl(nextParam)` in [app/lib/auth.js](file:///c:/Users/Edel/Desktop/codeops/module3/miniProject/addis-eats-1/app/lib/auth.js).
  1. The function inspected `nextParam` and detected `https://` / `//`.
  2. The absolute URL was identified as untrusted and rejected.
  3. The redirect safely fell back to the local relative dashboard `/account` (or `/staff`).
  4. **Result**: The open redirect attack was completely neutralized.

---

### Attack 2: Insecure Direct Object Reference (IDOR) & Unauthorized Write

- **Attack Vector**:
  Customer Abebe Bikila (`usr_customer_1`) signs in legitimately. The attacker attempts to cancel or modify order `ord-102` (which belongs to Bethlehem Assefa, `usr_customer_2`) by directly sending a `POST` request to `/api/orders/cancel` with payload `{ "orderId": "ord-102" }`.

- **What Happened**:
  1. The handler in [app/api/orders/cancel/route.js](file:///c:/Users/Edel/Desktop/codeops/module3/miniProject/addis-eats-1/app/api/orders/cancel/route.js) verified the session via `getSession()`.
  2. The handler invoked `cancelOrderWithOwnershipCheck("ord-102", session.user)`.
  3. The order was fetched, and ownership was verified:
     `order.userId` (`usr_customer_2`) did not match `session.user.id` (`usr_customer_1`), and the user was not staff.
  4. The write action aborted immediately and threw a security error.
  5. The server returned **HTTP 403 Forbidden**: `"Forbidden: You do not own this order and lack staff privileges."`
  6. **Result**: Bethlehem's order remained intact; horizontal privilege escalation was prevented.

---

### Attack 3: Middleware Bypass & Direct Route Access to Staff Dashboard

- **Attack Vector**:
  An unauthenticated visitor or non-staff customer attempts to bypass middleware routing rules (e.g., via altered request headers, direct internal fetch, or proxy misconfiguration) and render the private staff administration page `/staff`.

- **What Happened**:
  1. **Layer 1 (Middleware)**: Intercepted the URL matching `/staff/:path*`. Detected missing session or `session.role !== 'staff'` and issued an HTTP 307 redirect to `/unauthorized`.
  2. **Layer 2 (Defense in Depth SSR)**: Even if the request had reached the server page component [app/staff/page.js](file:///c:/Users/Edel/Desktop/codeops/module3/miniProject/addis-eats-1/app/staff/page.js), the Server Component invoked `await getSession()`. It independently verified the cryptographic HMAC signature and asserted `session.user.role === 'staff'`. Failing this check, the Server Component triggered a server-side `redirect("/unauthorized")`.
  3. **Result**: Zero unauthorized data crossed the server boundary; private kitchen orders and customer addresses were never rendered.
