# Addis Eats

A food-ordering frontend for Addis Ababa, built for the CodeOps Day 35 mini-project brief.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Screens

| Screen | Route | What it does |
|---|---|---|
| Home | `/` | Landing page, links into the menu |
| Menu | `/menu` | Fetched dishes, category filter stored in the URL |
| Dish | `/menu/:id` | One dish, add to order |
| Cart | `/cart` | Order lines and running ETB total |
| Sign in | `/signin` | Minimal sign-in used by the guard |
| Checkout | `/checkout` | Validated form, guarded by sign-in, lazy-loaded |

## Where each Day's topic shows up

- **26–27** — Composition: `DishCard` inside `DishList` inside `Menu`; conditional rendering for empty categories, loading, and error states.
- **28** — State & events: the Checkout form is fully controlled (`values`/`touched` state, `onChange`/`onBlur` handlers).
- **29** — Data fetching: `useFetch` runs inside a `useEffect`, aborts via `AbortController` on cleanup.
- **30** — Custom hook (`useFetch`) + Context/store: `CartProvider` (reducer-based store) and `AuthProvider` (context).
- **31** — Routing: nested routes under `Layout`, dynamic `:id` route (`DishDetail`), guarded route (`RequireAuth` wraps `Checkout`).
- **33–34** — Validation (`validate.js`), an error boundary (`ErrorBoundary` wraps the whole route tree), one lazy route (`Checkout` via `React.lazy` + `Suspense`).

## Folder structure

```
src/
  api/        fetch helpers (one per resource)
  hooks/      useFetch — reusable, no business logic
  ui/         Button, Spinner, ErrorMessage, ErrorBoundary — generic only
  cart/       store (Context+reducer), CartPanel, CartBadge
  menu/       Menu, CategoryBar, DishList, DishCard, DishDetail
  checkout/   Checkout, validate.js, Field
  auth/       AuthProvider, useAuth, RequireAuth, SignIn
  pages/      Home, NotFound
  App.jsx     routes
  Layout.jsx  header, nav, Outlet, footer
```

## Known gaps / things to extend next

- The "API" is a static `public/dishes.json` fetched with `fetch`. Rename or delete that
  file to see the error state.
- No persistence — cart and sign-in state reset on refresh (deliberately out of scope
  for the mini-project; state placement is what's being assessed here, not storage).
- Styling is intentionally plain — the brief asks you to make it work and correct before
  making it look right.

## Testing the failure paths (from the brief, Section 3)

- Throttle the network to Slow 3G → the Spinner should appear, no blank screen.
- Rename `public/dishes.json` → the Menu/DishDetail should show the error box.
- Filter to a category with nothing in it → friendly empty note, not a crash.
- Visit a nonsense URL → NotFound renders.
- Visit `/checkout` signed out → redirected to `/signin`, then returned after signing in.
- Reload on every screen → nothing crashes cold.
