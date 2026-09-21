"use client";

import Link from "next/link";
import AddToCartButton from "../../components/addToCartButton";
import { useCategoryFilter } from "./menuFilterContext";

export default function DishGrid({ dishes }) {
  const { selectedCategory } = useCategoryFilter();

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <section className="dish-section">
      <h2>Our Dishes</h2>

      {filteredDishes.length === 0 ? (
        <p>No dishes available in this category.</p>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <div className="dish-card" key={dish.id}>
              <h3>{dish.name}</h3>

              <p className="dish-price">Price: {dish.price} ETB</p>

              <Link className="view-dish" href={`/menu/${dish.id}`}>
                View Dish
              </Link>

              <AddToCartButton dish={dish} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}