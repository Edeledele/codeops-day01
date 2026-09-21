import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../../../components/addToCartButton";
import { dishes, getDishById } from "../dishes";

// Statically generate one page per known dish at build time.
// With 8 dishes in app/menu/dishes.js, the build produces 8 pages here.
export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <main className="detail-page">
      <div className="detail-card">
        <div className="detail-content">
          <p className="detail-category">{dish.category}</p>

          <h1>{dish.name}</h1>

          <p className="detail-description">{dish.description}</p>

          <p className="detail-price">{dish.price} ETB</p>

          <AddToCartButton dish={dish} className="detail-cart-button" />

          <Link href="/menu" className="back-menu">
            ← Back to Menu
          </Link>
        </div>
      </div>
    </main>
  );
}