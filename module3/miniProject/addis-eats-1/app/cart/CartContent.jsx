"use client";

import Link from "next/link";
import { useCart } from "../components/cartContext";

export default function CartContent() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add something delicious from our menu.</p>
        <Link href="/menu" className="primary-btn">
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-info">
            <div className="cart-icon">{item.icon || "🍽️"}</div>
            <div>
              <h3>{item.name}</h3>
              <p>{item.price} ETB each</p>
            </div>
          </div>

          <div className="quantity">
            <button onClick={() => decreaseQuantity(item.id)}>−</button>
            <strong>{item.quantity}</strong>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{totalPrice} ETB</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>50 ETB</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{totalPrice + 50} ETB</span>
        </div>
        <Link href="/checkout" className="checkout-btn">
          Continue to Checkout
        </Link>
      </div>
    </main>
  );
}
