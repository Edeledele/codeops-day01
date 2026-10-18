import { notFound } from "next/navigation";
import Link from "next/link";
import { getDish, getDishIds } from "../../lib/dishes";
import AddToCartButton from "../components/AddToCartButton";

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

  const imageSrc = dish.imageUrl || dish.image;

  return (
    <main className="dish-page">
      <div className="dish-detail">
        {imageSrc ? (
          <div className="dish-detail-image-wrapper">
            <img
              src={imageSrc}
              alt={dish.name}
              className="dish-detail-image"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="dish-detail-icon">{dish.icon || "🍽️"}</div>
        )}

        <div className="dish-detail-info">
          <p className="dish-category">{dish.category}</p>
          <h1>{dish.name}</h1>
          <p className="dish-description">{dish.fullDescription || dish.description}</p>
          <p className="detail-price">{dish.priceFormatted || `${dish.price} ETB`}</p>

          <div style={{ display: "flex", gap: "15px", marginTop: "24px", flexWrap: "wrap" }}>
            <AddToCartButton dish={dish} />
            <Link href="/menu" className="secondary-btn">
              ← Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
