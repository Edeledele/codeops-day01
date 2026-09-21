"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../../../components/cartContext";

const dishes = [
  {
    id: "1",
    name: "Pizza",
    price: 450,
    category: "Pizza",
    description:
      "Freshly baked pizza prepared with delicious toppings and melted cheese.",
  },
  {
    id: "2",
    name: "Burger",
    price: 300,
    category: "Burger",
    description:
      "A juicy burger served with fresh vegetables and a delicious sauce.",
  },
  {
    id: "3",
    name: "Pasta",
    price: 400,
    category: "Pizza",
    description:
      "Delicious pasta prepared with fresh ingredients and a rich sauce.",
  },
  {
    id: "4",
    name: "Cola",
    price: 50,
    category: "Drinks",
    description:
      "A refreshing cold cola drink.",
  },
  {
    id: "5",
    name: "Juice",
    price: 200,
    category: "Drinks",
    description:
      "Fresh and refreshing fruit juice.",
  },
  {
    id: "6",
    name: "Salad",
    price: 250,
    category: "Pizza",
    description:
      "A fresh salad made with healthy vegetables.",
  },
  {
    id: "7",
    name: "Fries",
    price: 150,
    category: "Burger",
    description:
      "Crispy golden fries served hot and fresh.",
  },
  {
    id: "8",
    name: "Coffee",
    price: 200,
    category: "Drinks",
    description:
      "Freshly prepared hot coffee.",
  },
];

export default function DishPage({ params }) {
  const { id } = React.use(params);

  const { addToCart } = useCart();

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    return (
      <main className="detail-page">
        <h1>Dish Not Found</h1>

        <Link href="/menu" className="back-menu">
          ← Back to Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="detail-page">

      <nav className="page-nav">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>

      <div className="detail-card">

        <div className="detail-content">

          <p className="detail-category">
            {dish.category}
          </p>

          <h1>{dish.name}</h1>

          <p className="detail-description">
            {dish.description}
          </p>

          <p className="detail-price">
            {dish.price} ETB
          </p>

          <button
            className="detail-cart-button"
            type="button"
            onClick={() => {
              addToCart(dish);
              alert(`${dish.name} added to cart!`);
            }}
          >
            Add to Cart
          </button>

          <Link
            href="/menu"
            className="back-menu"
          >
            ← Back to Menu
          </Link>

        </div>
      </div>
    </main>
  );
}