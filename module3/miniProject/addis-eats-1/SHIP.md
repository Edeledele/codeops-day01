# Addis Eats · Harden, Then Ship Checklist (SHIP.md)

This document contains the production hardening verification, deployment configuration, and post-deployment checklist for Addis Eats.

---

## 1. Pre-Flight Hardening Checklist

| Verification Item | Status | Verification Detail |
| :--- | :---: | :--- |
| **No Clickable Divs** | ✅ Passed | Every interactive element across the codebase is an explicit semantic `<button>` or `<Link>` element. Zero `div onClick` or `span onClick` elements exist. |
| **Visible Focus Everywhere** | ✅ Passed | Universal `:focus-visible` ring (`outline: 3px solid var(--accent-color); outline-offset: 3px`) implemented across all focusable elements (links, buttons, inputs). |
| **Keyboard Operability** | ✅ Passed | Full ordering flow (browsing menu → adding dish → navigating to cart → completing checkout → viewing order tracking) is 100% executable using keyboard alone (`Tab`, `Enter`, `Space`). |
| **Double-Submit Prevention** | ✅ Passed | `CheckoutForm` and `LoginForm` handle submission via `onSubmit`. Submit buttons feature `disabled={isSubmitting}` and an early guard `if (isSubmitting) return;` so rapid double-tapping fires only one request. |
| **Touch Targets ≥ 44px** | ✅ Passed | All buttons, links, pagination pills, and navigation elements meet or exceed the mobile WCAG minimum touch target size of 44px (`min-height: 44px`). |
| **Nothing Hidden Behind Hover** | ✅ Passed | All actionable information, prices, and buttons remain continuously visible without requiring mouse hover states (touch-screen resilient). |
| **Secrets Isolation** | ✅ Passed | Server secrets (`SESSION_SECRET`) are never prefixed with `NEXT_PUBLIC_` and never leak into the client browser bundle. |
| **Clean Build** | ✅ Passed | `npm run build` compiles with 0 errors, 0 lint warnings, and generates optimized SSG and Dynamic routes. |

---

## 2. End-to-End Keyboard Ordering Walkthrough

1. **Navigate to `/menu`**: Tab through the navbar to the dish cards.
2. **Add to Cart**: Tab to any dish's `+ Add to Cart` button and press `Space` or `Enter`.
3. **Open Cart**: Tab to `🛒 Cart` in the navbar and press `Enter`.
4. **Proceed to Checkout**: Tab to `Continue to Checkout` and press `Enter`.
5. **Fill Form**: Tab into `Full Name`, `Phone Number`, and `Delivery Address` inputs and enter details.
6. **Place Order**: Tab to the `Place Order` button and press `Enter`.
   - The button switches to `Placing Order...` and enters a `disabled` state immediately.
   - Double-clicks/rapid presses are suppressed.
   - The app navigates to `/orders/ord-101`, displaying real-time tracking with zero initial spinner.

---

## 3. Environment Variables by Deployment Stage

Documented in `.env.example`:

| Environment | Variable Name | Purpose | Example Value |
| :--- | :--- | :--- | :--- |
| **Production** | `SESSION_SECRET` | HMAC-SHA256 session token signature secret | `addis_prod_sec_99b0c7...` (secure 64-char hex) |
| **Production** | `NEXT_PUBLIC_SITE_URL` | Canonical domain for OpenGraph cards | `https://addis-eats.vercel.app` |
| **Preview** | `SESSION_SECRET` | Isolated secret for preview PR branches | `addis_preview_sec_11a4d...` |
| **Preview** | `NEXT_PUBLIC_SITE_URL` | Preview deployment URL | Auto-assigned by Vercel (`https://addis-eats-git-*.vercel.app`) |

---

## 4. Post-Deployment Verification & Private Window Testing

1. **Private Window Session Test**:
   - Open a private/incognito window.
   - Navigate to `/account` or `/staff`.
   - **Expected**: Middleware immediately redirects to `/login?next=%2Faccount` with zero private information leaked.
2. **OpenGraph Card Test**:
   - Share URL in Telegram/WhatsApp/Slack or inspect with [opengraph.xyz](https://www.opengraph.xyz).
   - **Expected**: Renders rich summary card with title *"Addis Eats · Authentic Ethiopian Food"*, description, and metadata.
3. **Instant Rollback Instructions (Without Looking Up)**:
   - **Vercel Dashboard**: Navigate to **Deployments** → Locate the previous working deployment → Click the **•••** menu → Select **Promote to Production** (instant zero-downtime rollback).
   - **Vercel CLI**: Run `vercel rollback [deployment-url-or-id]` in terminal.
