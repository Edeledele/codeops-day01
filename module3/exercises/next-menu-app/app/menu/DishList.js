"use client";

import Link from "next/link";
import { useCart } from "../../components/cartContext";

const dishes = [
  {
    id: "1",
    name: "Pizza",
    price: 450,
    category: "Pizza",
  },
  {
    id: "2",
    name: "Burger",
    price: 300,
    category: "Burger",
  },
  {
    id: "3",
    name: "Pasta",
    price: 400,
    category: "Pizza",
  },
  {
    id: "4",
    name: "Cola",
    price: 50,
    category: "Drinks",
  },
  {
    id: "5",
    name: "Juice",
    price: 200,
    category: "Drinks",
  },
  {
    id: "6",
    name: "Salad",
    price: 250,
    category: "Pizza",
  },
  {
    id: "7",
    name: "Fries",
    price: 150,
    category: "Burger",
  },
  {
    id: "8",
    name: "Coffee",
    price: 200,
    category: "Drinks",
  },
];

export default function DishList({ selectedCategory }) {
  const { addToCart } = useCart();

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === selectedCategory
        );

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

              <p className="dish-price">
                Price: {dish.price} ETB
              </p>

              <Link
                className="view-dish"
                href={`/menu/${dish.id}`}
              >
                View Dish
              </Link>

              <button
                type="button"
                className="add-cart"
                onClick={() => {
                  addToCart(dish);
                  alert(`${dish.name} added to cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}