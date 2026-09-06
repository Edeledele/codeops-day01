// Fallback/seed data. The real list is served from /public/dishes.json
// and loaded with the useFetch hook (see src/hooks/useFetch.js).

export const categories = ["All", "Main", "Drinks", "Dessert"];

export const dishes = [
  { id: 1, name: "Doro Wat", price: 250, category: "Main", spicy: true },
  { id: 2, name: "Tibs", price: 220, category: "Main", spicy: true },
  { id: 3, name: "Shiro", price: 150, category: "Main", spicy: false },
  { id: 4, name: "Kitfo", price: 280, category: "Main", spicy: true },
  { id: 5, name: "Ambo Water", price: 40, category: "Drinks", spicy: false },
  { id: 6, name: "Macchiato", price: 35, category: "Drinks", spicy: false },
  { id: 7, name: "Baklava", price: 90, category: "Dessert", spicy: false },
];