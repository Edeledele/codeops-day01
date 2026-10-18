"use client";

import Link from "next/link";
import { useCart } from "./cartContext";

export default function NavbarCartLink() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="cart-link" aria-label={`Shopping Cart, ${totalItems} items`}>
      <span className="cart-icon-symbol">🛒</span> Cart
      {totalItems > 0 && (
        <span className="navbar-cart-badge" key={totalItems}>
          {totalItems}
        </span>
      )}
    </Link>
  );
}
