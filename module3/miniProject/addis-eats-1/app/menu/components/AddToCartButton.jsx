"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "../../components/cartContext";

export default function AddToCartButton({ dish }) {
  const { cart, addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef(null);

  const existingItem = cart.find((it) => it.id === dish.id);
  const qtyInCart = existingItem?.quantity || 0;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(dish);
    setJustAdded(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  return (
    <button
      type="button"
      className={`add-btn ${justAdded ? "added" : ""}`}
      aria-label={`Add ${dish.name} to cart`}
      onClick={handleClick}
    >
      {justAdded ? (
        <span className="btn-added-content">
          <span className="check-icon">✓</span> Added!
        </span>
      ) : qtyInCart > 0 ? (
        <span className="btn-qty-content">
          + Add ({qtyInCart} in cart)
        </span>
      ) : (
        <span>+ Add to Cart</span>
      )}
    </button>
  );
}
