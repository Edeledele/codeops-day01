
const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    price: 350,
    category: "Traditional",
    description:
      "Minced beef seasoned with Ethiopian spices and served with traditional sides.",
  },
  {
    id: "doro-wot",
    name: "Doro Wot",
    price: 400,
    category: "Traditional",
    description:
      "Spicy chicken stew cooked with berbere, onions, and Ethiopian spices.",
  },
  {
    id: "tibs",
    name: "Beef Tibs",
    price: 380,
    category: "Traditional",
    description:
      "Tender beef sautéed with onions, peppers, herbs, and Ethiopian spices.",
  },
  {
    id: "shiro",
    name: "Shiro",
    price: 250,
    category: "Vegetarian",
    description:
      "Smooth chickpea stew cooked with spices and served with fresh injera.",
  },
  {
    id: "pizza",
    name: "Addis Pizza",
    price: 450,
    category: "Fast Food",
    description:
      "Freshly baked pizza with cheese, vegetables, and your favorite toppings.",
  },
  {
    id: "burger",
    name: "Addis Burger",
    price: 300,
    category: "Fast Food",
    description:
      "Juicy beef burger with fresh vegetables and our special house sauce.",
  },
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getDishes() {
  await wait(1500);
  return dishes;
}

export async function getDish(id) {
  await wait(300);
  return dishes.find((dish) => dish.id === id) ?? null;
}

export async function getDishIds() {
  return dishes.map((dish) => dish.id);
}

export function getCategories() {
  return [...new Set(dishes.map((dish) => dish.category))];
}