"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../components/cartContext";

export default function CheckoutForm({ deliveryZone, quotedAt }) {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          deliveryAddress,
          deliveryZone,
          items: cart,
          subtotal: totalPrice,
          total: totalPrice + 50,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to place your order.");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("addis_latest_order_id", data.order.id);
      }

      clearCart();
      router.push(`/orders/${data.order.id}`);
    } catch (err) {
      setErrorMessage(err.message);
      setIsSubmitting(false);
    }
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

        {errorMessage && (
          <div className="login-error-banner" style={{ marginBlock: "8px" }}>
            {errorMessage}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="checkout-name">Full Name</label>
          <input
            id="checkout-name"
            type="text"
            value={customerName}
            placeholder="Enter your name"
            onChange={(e) => setCustomerName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkout-phone">Phone Number</label>
          <input
            id="checkout-phone"
            type="tel"
            value={phone}
            placeholder="09XXXXXXXX"
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkout-address">Delivery Address</label>
          <input
            id="checkout-address"
            type="text"
            value={deliveryAddress}
            placeholder="Enter your address (e.g. Bole Medhanialem, House 412)"
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="summary-row total">
          <span>Order Total</span>
          <span>{totalPrice + 50} ETB</span>
        </div>

        <button
          type="submit"
          className="place-order"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}
