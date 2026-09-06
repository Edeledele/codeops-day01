import { createContext, useContext, useMemo, useReducer } from "react";
import { cartReducer, initialCartState } from "../components/Cartreducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const total = useMemo(
    () => state.items.reduce((sum, d) => sum + d.price, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}