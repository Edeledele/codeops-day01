"use client";

import { CartProvider } from "./components/cartContext";

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
