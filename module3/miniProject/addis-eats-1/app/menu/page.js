import { Suspense } from "react";
import MenuClientView from "./MenuClientView";
import DishListSkeleton from "./DishListSkeleton";
import { getPagedDishes } from "../lib/dishes";

export const dynamic = "force-dynamic";

export default async function MenuPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const page = Math.max(1, parseInt(resolvedParams?.page || "1", 10));
  const category = resolvedParams?.category || "All";
  const initialPageData = await getPagedDishes({ page, limit: 4, category });

  return (
    <main className="menu-page">
      <section className="page-header">
        <h1>Our Menu</h1>
        <p>Fresh flavors from Addis, made for you.</p>
      </section>

      <Suspense fallback={<DishListSkeleton />}>
        <MenuClientView initialPageData={initialPageData} />
      </Suspense>
    </main>
  );
}
