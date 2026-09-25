"use client";

import { useCart } from "../../components/cartContext";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();

  return (
    <button className="add-btn" onClick={() => addToCart(dish)}>
      + Add to Cart
    </button>
  );
}
