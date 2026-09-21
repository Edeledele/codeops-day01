"use client";

import { useCart } from "./cartContext";

export default function AddToCartButton({
  dish,
  className = "add-cart",
  label = "Add to Cart",
}) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        addToCart(dish);
        alert(`${dish.name} added to cart!`);
      }}
    >
      {label}
    </button>
  );
}