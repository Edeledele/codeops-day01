"use client";

import { SWRConfig } from "swr";
import fetcher from "./lib/fetcher";
import { CartProvider } from "./components/cartContext";

export default function Providers({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
      }}
    >
      <CartProvider>{children}</CartProvider>
    </SWRConfig>
  );
}
