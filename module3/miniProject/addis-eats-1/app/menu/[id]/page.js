import { notFound } from "next/navigation";
import Link from "next/link";

const dishes = {
  kitfo: {
    name: "Kitfo",
    price: 350,
    category: "Ethiopian",
    description: "A traditional Ethiopian dish made from minced beef.",
  },

  "doro-wot": {
    name: "Doro Wot",
    price: 400,
    category: "Ethiopian",
    description: "A spicy Ethiopian chicken stew served with injera.",
  },

  pizza: {
    name: "Pizza",
    price: 450,
    category: "Pizza",
    description: "Freshly baked pizza with delicious toppings.",
  },

  burger: {
    name: "Burger",
    price: 300,
    category: "Fast Food",
    description: "A juicy burger served with fresh vegetables.",
  },
};

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes[id];

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>

      <p>Price: {dish.price} ETB</p>

      <p>Category: {dish.category}</p>

      <p>{dish.description}</p>

      <Link href="/menu">
        Back to Menu
      </Link>
    </main>
  );
}