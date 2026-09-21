"use client";

import { useCart } from "../components/cartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <h2>No items to checkout</h2>

        <p>
          Your cart is empty.
        </p>

        <Link href="/menu" className="primary-btn">
          Go to Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-card">
        <h2>Delivery Information</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="09XXXXXXXX"
          />
        </div>

        <div className="form-group">
          <label>Delivery Address</label>
          <input
            type="text"
            placeholder="Enter your address"
          />
        </div>

        <div className="summary-row total">
          <span>Order Total</span>

          <span>
            {totalPrice + 50} ETB
          </span>
        </div>

        <button className="place-order">
          Place Order
        </button>
      </div>
    </main>
  );
}