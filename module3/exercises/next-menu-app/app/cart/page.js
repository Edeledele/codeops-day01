"use client";

import Link from "next/link";
import { useCart } from "../../components/cartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    decreaseQuantity,
    addToCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>

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

          <p>Add some delicious food from our menu.</p>

          <Link className="primary-link" href="/menu">
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <h2>{item.name}</h2>

                  <p>Price: {item.price} ETB</p>

                  <p>
                    Subtotal:{" "}
                    {item.price * item.quantity} ETB
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>{total} ETB</span>
            </div>

            <Link
              className="checkout-button"
              href="/checkout"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}