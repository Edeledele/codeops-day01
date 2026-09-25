import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <p className="dish-category">{dish.category}</p>

      <h2>{dish.name}</h2>

      <p className="dish-description">{dish.description}</p>

      <div className="dish-bottom">
        <span className="price">{dish.price} ETB</span>

        <AddToCartButton dish={dish} />
      </div>

      <Link href={`/menu/${dish.id}`} className="details-btn">
        View Details
      </Link>
    </article>
  );
}
