"use client";

import Link from "next/link";
import { useCart } from "../../components/cartContext";

export default function DishCard({ dish }) {
    const { addToCart } = useCart();

    return (
        <article className="dish-card">
            <p className="dish-category">
                {dish.category}
            </p>

            <h2>{dish.name}</h2>

            <p className="dish-description">
                {dish.description}
            </p>

            <div className="dish-bottom">
                <span className="price">
                    {dish.price} ETB
                </span>

                <button
                    className="add-btn"
                    onClick={() => addToCart(dish)}
                >
                    + Add to Cart
                </button>
            </div>

            <Link
                href={`/menu/${dish.id}`}
                className="details-btn"
            >
                View Details
            </Link>
        </article>
    );
}