import { notFound } from "next/navigation";
import Link from "next/link";
import { getDish, getDishIds } from "../../lib/dishes";

export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getDishIds();

  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  return {
    title: dish ? `${dish.name} · Addis Eats` : "Dish not found · Addis Eats",
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  return (
    <main className="dish-page">
      <div className="dish-detail">
        <div className="dish-detail-icon">{dish.icon}</div>

        <p className="dish-category">{dish.category}</p>

        <h1>{dish.name}</h1>

        <p className="dish-description">{dish.description}</p>

        <p className="price">{dish.price} ETB</p>

        <Link href="/menu" className="primary-btn">
          Back to Menu
        </Link>
      </div>
    </main>
  );
}