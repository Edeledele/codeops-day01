"use client";

import { createContext, useContext, useState, useRef } from "react";
import Link from "next/link";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ visible: false, dish: null, message: "" });
  const toastTimeoutRef = useRef(null);

  function triggerToast(dish) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast({
      visible: true,
      dish,
      message: `Added ${dish.name} to your cart!`,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  }

  function hideToast() {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast((prev) => ({ ...prev, visible: false }));
  }

  function addToCart(dish) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === dish.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentCart,
        {
          ...dish,
          quantity: 1,
        },
      ];
    });

    triggerToast(dish);
  }

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(id) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        toast,
        hideToast,
      }}
    >
      {children}

      {/* Floating Global Cart Toast */}
      {toast.visible && toast.dish && (
        <aside
          className="cart-toast"
          role="status"
          aria-live="polite"
          aria-label="Cart update notification"
        >
          <div className="cart-toast-body">
            <span className="cart-toast-icon">✓</span>
            <div className="cart-toast-text">
              <strong>Added to cart!</strong>
              <p>
                {toast.dish.name} · {toast.dish.priceFormatted || `${toast.dish.price} ETB`}
              </p>
            </div>
          </div>
          <div className="cart-toast-actions">
            <Link href="/cart" className="cart-toast-btn" onClick={hideToast}>
              View Cart →
            </Link>
            <button
              type="button"
              className="cart-toast-close"
              onClick={hideToast}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        </aside>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: [],
      addToCart: () => {},
      increaseQuantity: () => {},
      decreaseQuantity: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      totalItems: 0,
      totalPrice: 0,
      toast: { visible: false, dish: null, message: "" },
      hideToast: () => {},
    };
  }
  return context;
}
