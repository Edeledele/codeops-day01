# Addis Eats 🍽️

Authentic Ethiopian food delivery platform built with Next.js 16 (App Router), React 19, and SWR for resilient real-time client-side data management and secure multi-role access control.

---

## 🌐 Live Production URL

- **Production Deployment**: [https://addis-eats.vercel.app](https://addis-eats.vercel.app)
- **Local Dev Server**: [http://localhost:3000](http://localhost:3000)

---

## 📡 Mini-Project · Live Data in Addis Eats

### What the Network Tab Shows While Typing

When observing the browser's **DevTools Network tab** during menu search interactions:

1. **Typing Five Characters (`k-i-t-f-o`):**
   - **Observed**: Exactly **ONE** network request (`GET /api/dishes/search?q=kitfo`) is dispatched instead of 5 separate requests.
   - **Why**: The search box uses the custom `useDebounce` hook with a **300ms window**. Keystrokes reset the debounce timer on each input event; only after typing pauses for 300ms does SWR receive the updated search key.
   - **Empty Term Behavior**: When the search input is cleared or empty, the SWR key evaluates to `null`. SWR skips fetching completely—**0 network requests** occur when idle.

2. **Zero Screen Flashing (`keepPreviousData: true`):**
   - **Observed**: When transitioning between pages (`/menu?page=1` → `/menu?page=2`) or typing refined search queries (`kit` → `kitfo`), the existing dishes remain stably rendered on screen until the new network response returns.
   - **Why**: SWR's `keepPreviousData: true` holds the previous dataset in memory and prevents the UI from clearing or displaying empty layout gaps mid-flight.

3. **Request Deduplication with Multiple Consumers:**
   - **Observed**: On the Order Status screen (`/orders/ord-101`), two distinct components (`OrderStatusHeader` and `OrderTimelineAndDetails`) independently invoke `useSWR('/api/orders/ord-101', fetcher, { refreshInterval: 5000 })`.
   - In the Network tab, only **ONE single network request** is executed every 5 seconds.
   - **Why**: SWR identifies identical cache keys and deduplicates concurrent in-flight requests, broadcasting the resulting payload to both components simultaneously.

4. **Instant First Paint without Spinners (`fallbackData`):**
   - **Observed**: On initial page load of `/orders/ord-101` and `/menu`, the complete content is present in the initial server HTML payload.
   - **Why**: Server Components fetch the initial records and pass them via `fallbackData`, populating SWR immediately and bypassing any initial client-side spinner.

*Full query definitions and one-line justifications are available in [DATA.md](DATA.md).*

---

## 🛡️ Mini-Project · Securing Addis Eats

- **Session Security**: Cryptographically signed HMAC-SHA256 tokens stored in `httpOnly`, `secure`, `sameSite: "lax"` cookies.
- **Middleware**: Narrow matcher for `/account/:path*`, `/orders/history/:path*`, and `/staff/:path*`, with automatic redirect and destination remembrance.
- **Open Redirect Protection**: Strict validation on `?next=` ensuring only safe relative paths are followed.
- **Defense in Depth**: Every private page verifies the session during server render via `getSession()`.
- **IDOR Protection**: Order queries strictly scoped to session user ID; ownership enforced on write mutations.
- **Staff-Only Route**: Role-based access control protecting `/staff` kitchen dispatch.

*Comprehensive route matrix and 3 documented attack tests are available in [AUTH.md](AUTH.md).*

---

## 🚢 Mini-Project · Harden, Then Ship

### Hardening Checklist & Check Yourself Answers

- **Can you place an order using only the keyboard, start to finish?**  
  👉 **Yes.** Full ordering flow (`/menu` → Add to Cart with `Enter` → Tab to `/cart` → Tab to `/checkout` → Fill inputs → Press `Enter` on Place Order) is 100% accessible via keyboard with visible focus rings (`:focus-visible`).

- **Does a rapid double tap on Place order create one order or two?**  
  👉 **One order.** `CheckoutForm` guards submission with an `isSubmitting` flag and immediately sets `disabled={isSubmitting}` on the submit button.

- **Does the application work in a private window with no session?**  
  👉 **Yes.** Public pages (`/`, `/menu`, `/cart`, `/checkout`) function cleanly, and visiting private pages (`/account`, `/staff`) seamlessly redirects to `/login?next=...` without errors.

- **Is any secret visible in the JavaScript the browser downloads?**  
  👉 **No.** `SESSION_SECRET` resides purely on the server and is never prefixed with `NEXT_PUBLIC_`.

- **Does a shared link from the live URL render as a card?**  
  👉 **Yes.** Root layout exports full OpenGraph and Twitter card metadata with `metadataBase`, title template, description, and social preview tags.

- **Do you know how to roll back, without looking it up?**  
  👉 **Yes.** In Vercel Dashboard, go to **Deployments** → Select the prior healthy deployment → Click **Promote to Production** for instant zero-downtime rollback; or run `vercel rollback` in terminal.

*Detailed pre-flight checklists and mobile usability tests are documented in [SHIP.md](SHIP.md).*

---

## 🚀 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build verification
npm run build
```
