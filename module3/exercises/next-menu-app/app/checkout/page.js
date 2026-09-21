"use client";

import Link from "next/link";
import { useCart } from "../../components/cartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <nav className="page-nav">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>

      <hr />

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <p>Please add items before checking out.</p>

          <Link className="primary-link" href="/menu">
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className="checkout-container">
          <div className="checkout-card">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity} × {item.price} ETB
                  </p>
                </div>

                <strong>
                  {item.price * item.quantity} ETB
                </strong>
              </div>
            ))}

            <hr />

            <div className="checkout-total">
              <span>Total</span>
              <strong>{total} ETB</strong>
            </div>

            <button
              className="place-order-button"
              onClick={() =>
                alert("Order placed successfully!")
              }
            >
              Place Order
            </button>
          </div>

          <Link className="back-link" href="/cart">
            ← Back to Cart
          </Link>
        </div>
      )}
    </main>
  );
}