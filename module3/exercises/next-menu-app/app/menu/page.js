import { Suspense } from "react";
import DishList from "./DishList";

// Route segment config: revalidate this page every 60 seconds (ISR).
// This does not touch any Request-time API (no cookies/headers/searchParams),
// so the route is still prerendered - `next build` marks it static.
export const revalidate = 60;

export default function MenuPage() {
  return (
    <main>
      <h1>Menu</h1>

      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList />
      </Suspense>
    </main>
  );
}