import { createContext, useReducer, useMemo, useCallback } from "react";
import { cartReducer } from "../components/Cartreducer";

export const CartContext = createContext({
  items: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = useCallback((dish) => dispatch({ type: "add", dish }), []);
  const removeFromCart = useCallback((id) => dispatch({ type: "remove", id }), []);
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );

  // Memoized so consumers don't re-render on every CartProvider render —
  // only when items/total actually change (the functions are already stable
  // thanks to useCallback with empty dependency arrays).
  const value = useMemo(
    () => ({ items, total, addToCart, removeFromCart, clearCart }),
    [items, total, addToCart, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}