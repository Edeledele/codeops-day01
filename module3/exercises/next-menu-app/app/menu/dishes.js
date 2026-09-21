// Single source of truth for dish data.
// Used by:
// - app/menu/DishList.js (menu grid)
// - app/menu/[id]/page.js (dish detail + generateStaticParams)

export const dishes = [
  {
    id: "1",
    name: "Pizza",
    price: 450,
    category: "Pizza",
    description:
      "Freshly baked pizza prepared with delicious toppings and melted cheese.",
  },
  {
    id: "2",
    name: "Burger",
    price: 300,
    category: "Burger",
    description:
      "A juicy burger served with fresh vegetables and a delicious sauce.",
  },
  {
    id: "3",
    name: "Pasta",
    price: 400,
    category: "Pizza",
    description:
      "Delicious pasta prepared with fresh ingredients and a rich sauce.",
  },
  {
    id: "4",
    name: "Cola",
    price: 50,
    category: "Drinks",
    description: "A refreshing cold cola drink.",
  },
  {
    id: "5",
    name: "Juice",
    price: 200,
    category: "Drinks",
    description: "Fresh and refreshing fruit juice.",
  },
  {
    id: "6",
    name: "Salad",
    price: 250,
    category: "Pizza",
    description: "A fresh salad made with healthy vegetables.",
  },
  {
    id: "7",
    name: "Fries",
    price: 150,
    category: "Burger",
    description: "Crispy golden fries served hot and fresh.",
  },
  {
    id: "8",
    name: "Coffee",
    price: 200,
    category: "Drinks",
    description: "Freshly prepared hot coffee.",
  },
];

// Simulates a slow data source (e.g. a database or CMS call) so that
// the dish list has something worth wrapping in <Suspense>.
export async function getDishes() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dishes;
}

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}