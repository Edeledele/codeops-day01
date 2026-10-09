"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../components/cartContext";
import { placeOrder } from "./actions";

const initialState = { status: null, message: null, fieldErrors: {}, orderId: null };

export default function CheckoutClient({ promoCode }) {
  const { cart, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, initialState);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Branch on the status code, same as the POST /api/orders contract:
  // 201 -> clear the cart, show confirmation
  useEffect(() => {
    if (state.status === 201) clearCart();
  }, [state, clearCart]);

  if (state.status === 201) {
    return (
      <main className="checkout-page">
        <h1>Checkout</h1>
        <hr />
        <div className="empty-cart">
          <h2>{state.message}</h2>
          <p>Your order number is #{state.orderId}.</p>
          <Link className="primary-link" href="/orders">
            View my orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <hr />

      {promoCode && (
        <p className="promo-banner">
          Promo code <strong>{promoCode}</strong> applied from your cookies.
        </p>
      )}

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
              <div className="checkout-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity} × {item.price} ETB
                  </p>
                </div>

                <strong>{item.price * item.quantity} ETB</strong>
              </div>
            ))}

            <hr />

            <div className="checkout-total">
              <span>Total</span>
              <strong>{total} ETB</strong>
            </div>

            <form action={formAction}>
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(
                  cart.map(({ id, quantity }) => ({ id, quantity }))
                )}
              />

              <label>
                Name
                <input name="name" type="text" autoComplete="name" />
              </label>
              {state.fieldErrors.name && (
                <p role="alert" style={{ color: "crimson" }}>
                  {state.fieldErrors.name}
                </p>
              )}

              <label>
                Phone
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              {state.fieldErrors.phone && (
                <p role="alert" style={{ color: "crimson" }}>
                  {state.fieldErrors.phone}
                </p>
              )}

              {state.fieldErrors.items && (
                <p role="alert" style={{ color: "crimson" }}>
                  {state.fieldErrors.items}
                </p>
              )}

              {/* 400 / other failures: general message */}
              {state.status && state.status !== 422 && (
                <p role="alert" style={{ color: "crimson" }}>
                  {state.message}
                </p>
              )}

              <button
                className="place-order-button"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Placing order..." : "Place Order"}
              </button>
            </form>
          </div>

          <Link className="back-link" href="/cart">
            ← Back to Cart
          </Link>
        </div>
      )}
    </main>
  );
}
