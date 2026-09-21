import { getDishes } from "./dishes";
import DishGrid from "./DishGrid";

// Server Component: awaits the (simulated) slow data source.
// Wrapped in <Suspense> by app/menu/page.js so the sidebar in the
// layout renders immediately while this streams in.
export default async function DishList() {
  const dishes = await getDishes();

  return <DishGrid dishes={dishes} />;
}