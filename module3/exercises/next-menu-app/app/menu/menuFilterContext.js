"use client";

import { createContext, useContext, useState } from "react";

const CategoryFilterContext = createContext();

export function CategoryFilterProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <CategoryFilterContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
}

export function useCategoryFilter() {
  return useContext(CategoryFilterContext);
}