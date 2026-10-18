import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  const imageSrc = dish.imageUrl || dish.image;

  return (
    <article className="dish-card">
      {imageSrc && (
        <div className="dish-image-wrapper">
          <img
            src={imageSrc}
            alt={dish.name}
            className="dish-image"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <span className="dish-category-badge">{dish.category}</span>
        </div>
      )}

      <div className="dish-card-body">
        {!imageSrc && <p className="dish-category">{dish.category}</p>}

        <h2>{dish.name}</h2>

        <p className="dish-description">{dish.description}</p>

        <div className="dish-bottom">
          <span className="price">{dish.priceFormatted || `${dish.price} ETB`}</span>
          <AddToCartButton dish={dish} />
        </div>

        <Link href={`/menu/${dish.id}`} className="details-btn">
          View Details
        </Link>
      </div>
    </article>
  );
}
