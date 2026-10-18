# Addis Eats · Data Fetching & Query Documentation (DATA.md)

This document catalogs every SWR query in the Addis Eats application, its query key structure, its cache/refresh rules, and the architectural reasoning behind each decision.

---

## 1. Paged Dishes Query

- **Component**: `MenuClientView` (`app/menu/MenuClientView.jsx`)
- **Query Key**: `/api/dishes?page=${currentPage}&limit=4`
- **Fetcher**: Shared `fetcher` (`app/lib/fetcher.js`)
- **Refresh Rule**:
  - `keepPreviousData: true`
  - `fallbackData: currentPage === 1 ? initialPageData : undefined`
  - `revalidateOnFocus: true`
- **One-Line Reasoning**:
  > Menu items change infrequently during meal service, so keeping previous data eliminates screen-flashing while paging, and server-supplied fallbackData delivers instantaneous first paint.

---

## 2. Debounced Search Query

- **Component**: `MenuClientView` (`app/menu/MenuClientView.jsx`)
- **Query Key**: `debouncedSearch.trim() ? `/api/dishes/search?q=${encodeURIComponent(debouncedSearch.trim())}` : null`
- **Fetcher**: Shared `fetcher` (`app/lib/fetcher.js`)
- **Refresh Rule**:
  - Key is `null` when search term is empty or whitespace (SWR conditionally skips fetch).
  - `keepPreviousData: true`
  - Debounce window: 300ms via `useDebounce`
- **One-Line Reasoning**:
  > A null key prevents wasted fetches when idle, debouncing by 300ms collapses fast typing into a single request, and keepPreviousData prevents search results from flashing blank mid-keystroke.

---

## 3. Order Status Polling Query

- **Components**: `OrderStatusHeader` and `OrderTimelineAndDetails` (`app/orders/[id]/`)
- **Query Key**: `/api/orders/${orderId}`
- **Fetcher**: Shared `fetcher` (`app/lib/fetcher.js`)
- **Refresh Rule**:
  - `refreshInterval: 5000` (polls every 5 seconds)
  - `fallbackData: fallbackOrder` (pre-rendered from server)
  - `revalidateOnFocus: true`
- **One-Line Reasoning**:
  > Active deliveries advance through kitchen and courier stages over minutes, so 5-second polling keeps customers informed while SWR deduplication collapses multiple component queries into one single network call.

---

## 4. Single Dish Detail Query

- **Component / Route**: `app/menu/[id]/page.js` & `/api/dishes/[id]`
- **Query Key**: `/api/dishes/${id}`
- **Fetcher**: Shared `fetcher` (`app/lib/fetcher.js`)
- **Refresh Rule**:
  - Server-rendered static generation via `generateStaticParams` / dynamic on-demand fallback.
  - `dedupingInterval: 60000` (1 minute cache deduping)
- **One-Line Reasoning**:
  > Dish descriptions, ingredients, and pricing are static for the duration of a customer session, making aggressive deduplication and caching optimal.

---

## Summary Matrix

| Query Description | SWR Key | Refresh Rule | Justification |
| :--- | :--- | :--- | :--- |
| **Paged Menu** | `/api/dishes?page=${page}&limit=4` | `keepPreviousData: true`, `fallbackData` | Eliminates layout shift/flashing between pages; instant initial render. |
| **Menu Search** | `/api/dishes/search?q=${term}` | `null` on empty, 300ms debounce, `keepPreviousData: true` | Prevents empty search requests, throttles keystrokes, stops UI blinking. |
| **Order Status** | `/api/orders/${orderId}` | `refreshInterval: 5000`, `fallbackData`, SWR Deduping | Delivers real-time delivery tracking with zero initial spinner and 1 network request across 2 consumers. |
| **Dish Details** | `/api/dishes/${id}` | Static SSR / 60s deduping | Immutable menu data during user visit avoids duplicate server roundtrips. |
