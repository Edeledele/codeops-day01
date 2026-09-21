"use client";

import { useCategoryFilter } from "./menuFilterContext";

const categories = ["All", "Pizza", "Burger", "Drinks"];

export default function CategorySidebar() {
  const { selectedCategory, setSelectedCategory } = useCategoryFilter();

  return (
    <nav className="category-sidebar" aria-label="Dish categories">
      <h2 className="sidebar-title">Categories</h2>

      <ul className="sidebar-list">
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={
                category === selectedCategory
                  ? "sidebar-button active"
                  : "sidebar-button"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}