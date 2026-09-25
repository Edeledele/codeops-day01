"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../components/cartContext";

export default function CheckoutForm({ deliveryZone, quotedAt }) {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <h2>No items to checkout</h2>
        <p>Your cart is empty.</p>
        <Link href="/menu" className="primary-btn">
          Go to Menu
        </Link>
      </main>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Thank you! Your order has been placed successfully.");
    clearCart();
    router.push("/");
  };

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <form className="checkout-card" onSubmit={handlePlaceOrder}>
        <h2>Delivery Information</h2>
        <p className="checkout-zone">
          Delivering to <strong>{deliveryZone}</strong> · quoted at{" "}
          <strong>{quotedAt}</strong>
        </p>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="09XXXXXXXX" required />
        </div>

        <div className="form-group">
          <label>Delivery Address</label>
          <input type="text" placeholder="Enter your address" required />
        </div>

        <div className="summary-row total">
          <span>Order Total</span>
          <span>{totalPrice + 50} ETB</span>
        </div>

        <button type="submit" className="place-order">Place Order</button>
      </form>
    </main>
  );
}
