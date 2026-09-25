import { Suspense } from "react";
import DishList from "./DishList";
import DishListSkeleton from "./DishListSkeleton";

export const revalidate = 300;

export default function MenuPage() {
  return (
    <main className="menu-page">
      <section className="page-header">
        <h1>Our Menu</h1>
        <p>Fresh flavors from Addis, made for you.</p>
      </section>

      <Suspense fallback={<DishListSkeleton />}>
        <DishList />
      </Suspense>
    </main>
  );
}
