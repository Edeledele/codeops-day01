"use client";

import Link from "next/link";
import { useState } from "react";
import CategoryBar from "./categoryBar";
import DishList from "./DishList";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <main>
      <h1>Menu</h1>

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/menu">Menu</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>

      <hr />

      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <br />

      <DishList selectedCategory={selectedCategory} />
    </main>
  );
}