"use client";

export default function CategoryBar({ selectedCategory, setSelectedCategory }) {
  const categories = ["All", "Pizza", "Burger", "Drinks"];

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}