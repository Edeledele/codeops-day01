
const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    price: 450,
    priceFormatted: "450 ETB",
    category: "Traditional",
    categoryId: "traditional",
    rating: 4.8,
    reviewsCount: 120,
    imageUrl: "https://www.diversivore.com/wp-content/uploads/2023/05/Doro-Wat-mobile-banner-1.jpg",
    description: "Spicy Ethiopian stew served with injera.",
    fullDescription: "A traditional Ethiopian stew prepared with berbere spices, onions, and aromatic seasonings.",
  },
  {
    id: "2",
    name: "Shiro Tegabino",
    price: 280,
    priceFormatted: "280 ETB",
    category: "Traditional",
    categoryId: "traditional",
    rating: 4.8,
    reviewsCount: 88,
    imageUrl: "https://i.pinimg.com/1200x/a7/8b/c2/a78bc2c18ac861083097ea90e3692ef1.jpg",
    description: "Rich chickpea stew served hot.",
    fullDescription: "A comforting Ethiopian chickpea stew made with onions, garlic, and traditional spices.",
  },
  {
    id: "3",
    name: "Misir Wot",
    price: 250,
    priceFormatted: "250 ETB",
    category: "Traditional",
    categoryId: "traditional",
    rating: 4.6,
    reviewsCount: 75,
    imageUrl: "https://i.pinimg.com/1200x/ae/d9/4b/aed94b64e5c18598baa190df6098de48.jpg",
    description: "Spicy red lentils cooked with berbere.",
    fullDescription: "Red lentils simmered with onions, garlic, ginger, and traditional Ethiopian spices.",
  },
  {
    id: "4",
    name: "Genfo",
    price: 250,
    priceFormatted: "250 ETB",
    category: "Traditional",
    categoryId: "traditional",
    rating: 4.7,
    reviewsCount: 75,
    imageUrl: "https://i.pinimg.com/1200x/d5/d5/77/d5d577f16cecde97d3663fab34109421.jpg",
    description: "Traditional Ethiopian porridge.",
    fullDescription: "A traditional barley or wheat porridge, commonly served with seasoned butter and berbere.",
  },

  // CHICKEN
  {
    id: "5",
    name: "Doro Wat with Egg",
    price: 450,
    priceFormatted: "450 ETB",
    category: "Chicken",
    categoryId: "chicken",
    rating: 4.8,
    reviewsCount: 120,
    imageUrl: "https://i.pinimg.com/1200x/81/7d/7b/817d7b7aaf87f379e1282cbced42d42f.jpg",
    description: "Spicy chicken stew with boiled egg.",
    fullDescription: "Chicken simmered in a rich berbere sauce with aromatic spices and a boiled egg.",
  },
  {
    id: "6",
    name: "Chicken Tibs",
    price: 400,
    priceFormatted: "400 ETB",
    category: "Chicken",
    categoryId: "chicken",
    rating: 4.6,
    reviewsCount: 89,
    imageUrl: "https://i.pinimg.com/1200x/55/08/54/5508545612c4bbcceac11d8cf1f60d53.jpg",
    description: "Sautéed chicken with onions and peppers.",
    fullDescription: "Tender chicken cooked with onions, peppers, garlic, and fragrant spices.",
  },
  {
    id: "7",
    name: "Chicken Curry",
    price: 380,
    priceFormatted: "380 ETB",
    category: "Chicken",
    categoryId: "chicken",
    rating: 4.3,
    reviewsCount: 66,
    imageUrl: "https://i.pinimg.com/1200x/d7/ff/8c/d7ff8c0a61814346f91a8268044c6589.jpg",
    description: "Chicken cooked in a flavorful curry sauce.",
    fullDescription: "A savory chicken curry prepared with a rich sauce and warming spices.",
  },
  {
    id: "8",
    name: "Roasted Chicken",
    price: 420,
    priceFormatted: "420 ETB",
    category: "Chicken",
    categoryId: "chicken",
    rating: 4.7,
    reviewsCount: 91,
    imageUrl: "https://i.pinimg.com/736x/b8/2f/88/b82f8863dc3ff89af883dd5169b2f6b6.jpg",
    description: "Golden roasted chicken with herbs.",
    fullDescription: "Juicy chicken roasted until golden and seasoned with garlic, herbs, and spices.",
  },

  // BEEF
  {
    id: "9",
    name: "Tibs",
    price: 420,
    priceFormatted: "420 ETB",
    category: "Beef",
    categoryId: "beef",
    rating: 4.7,
    reviewsCount: 98,
    imageUrl: "https://i.pinimg.com/1200x/7c/df/d5/7cdfd5ad17a2a0dc463ba83c4a68c0a0.jpg",
    description: "Sautéed beef with onions and peppers.",
    fullDescription: "Tender beef strips cooked with onions, peppers, garlic, and Ethiopian seasonings.",
  },
  {
    id: "10",
    name: "Beef Stew",
    price: 380,
    priceFormatted: "380 ETB",
    category: "Beef",
    categoryId: "beef",
    rating: 4.5,
    reviewsCount: 76,
    imageUrl: "https://i.pinimg.com/1200x/be/94/56/be945677df551f33b0aa71d9b7743c69.jpg",
    description: "Slow-cooked beef in a savory sauce.",
    fullDescription: "Tender beef slowly cooked with tomatoes, onions, garlic, and warming spices.",
  },
  {
    id: "11",
    name: "Kitfo",
    price: 460,
    priceFormatted: "460 ETB",
    category: "Beef",
    categoryId: "beef",
    rating: 4.8,
    reviewsCount: 104,
    imageUrl: "https://i.pinimg.com/1200x/cf/fa/f8/cffaf8b2961ef6a74d78e1143252e3a5.jpg",
    description: "Traditional Ethiopian seasoned beef.",
    fullDescription: "An Ethiopian beef specialty traditionally seasoned with mitmita and niter kibbeh.",
  },
  {
    id: "12",
    name: "Beef Stir-Fry",
    price: 400,
    priceFormatted: "400 ETB",
    category: "Beef",
    categoryId: "beef",
    rating: 4.6,
    reviewsCount: 82,
    imageUrl: "https://i.pinimg.com/1200x/ec/e0/1e/ece01ed65b26ee3fec6ed54f3f960a9e.jpg",
    description: "Beef strips with colorful vegetables.",
    fullDescription: "Juicy beef strips tossed with peppers, onions, and savory seasoning.",
  },

  // VEGETARIAN
  {
    id: "13",
    name: "Alicha Wot",
    price: 240,
    priceFormatted: "240 ETB",
    category: "Vegetarian",
    categoryId: "vegetarian",
    rating: 4.5,
    reviewsCount: 68,
    imageUrl: "https://i.pinimg.com/736x/f1/5e/80/f15e80e0799dabfaf7d4e0004d765236.jpg",
    description: "Mild vegetable stew with traditional spices.",
    fullDescription: "A gentle, aromatic vegetable stew prepared with fresh ingredients and traditional seasonings.",
  },
  {
    id: "14",
    name: "Gomen",
    price: 230,
    priceFormatted: "230 ETB",
    category: "Vegetarian",
    categoryId: "vegetarian",
    rating: 4.4,
    reviewsCount: 52,
    imageUrl: "https://i.pinimg.com/1200x/5b/90/33/5b903337c4b13f957672e9bb51dfe24b.jpg",
    description: "Collard greens with garlic and onions.",
    fullDescription: "Fresh leafy greens sautéed with garlic, onions, and Ethiopian seasonings.",
  },
  {
    id: "15",
    name: "Atakilt",
    price: 220,
    priceFormatted: "220 ETB",
    category: "Vegetarian",
    categoryId: "vegetarian",
    rating: 4.3,
    reviewsCount: 49,
    imageUrl: "https://i.pinimg.com/1200x/f9/e2/2d/f9e22d73fe5363544623d88430845df2.jpg",
    description: "Cabbage, carrots, and potatoes with spices.",
    fullDescription: "A colorful vegetable dish prepared with cabbage, carrots, potatoes, and gentle spices.",
  },
  {
    id: "16",
    name: "Fresh Vegetable Salad",
    price: 200,
    priceFormatted: "200 ETB",
    category: "Vegetarian",
    categoryId: "vegetarian",
    rating: 4.5,
    reviewsCount: 61,
    imageUrl: "https://i.pinimg.com/736x/af/0c/d8/af0cd8296b7538581beca458c372b3a3.jpg",
    description: "Fresh salad with seasonal vegetables.",
    fullDescription: "A refreshing mix of seasonal vegetables served with a light dressing.",
  },

  // SEAFOOD
  {
    id: "17",
    name: "Asa Tibs",
    price: 390,
    priceFormatted: "390 ETB",
    category: "Seafood",
    categoryId: "seafood",
    rating: 4.7,
    reviewsCount: 52,
    imageUrl: "https://i.pinimg.com/1200x/3a/aa/67/3aaa67a5db8002b6c3ea7973afd479df.jpg",
    description: "Seasoned fish with lemon and herbs.",
    fullDescription: "Fish prepared with fragrant herbs, fresh lemon, and a delicious blend of spices.",
  },
  {
    id: "18",
    name: "Grilled Fish",
    price: 370,
    priceFormatted: "370 ETB",
    category: "Seafood",
    categoryId: "seafood",
    rating: 4.5,
    reviewsCount: 46,
    imageUrl: "https://i.pinimg.com/736x/ae/51/b8/ae51b881986c1a929be647209bdb51fe.jpg",
    description: "Grilled fish with lemon and herbs.",
    fullDescription: "Fish grilled with herbs and lemon for a light, savory seafood meal.",
  },

  // DRINKS
  {
    id: "19",
    name: "Fresh Juice",
    price: 150,
    priceFormatted: "150 ETB",
    category: "Drinks",
    categoryId: "drinks",
    rating: 4.5,
    reviewsCount: 60,
    imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=85",
    description: "Refreshing fruit juice.",
    fullDescription: "A refreshing fruit drink made to complement your favorite meal.",
  },
  {
    id: "20",
    name: "Iced Cola",
    price: 80,
    priceFormatted: "80 ETB",
    category: "Drinks",
    categoryId: "drinks",
    rating: 4.6,
    reviewsCount: 45,
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=85",
    description: "Chilled cola served over ice.",
    fullDescription: "A cold, fizzy cola served over ice to enjoy with your meal.",
  },

  // FAST FOOD
  {
    id: "21",
    name: "Addis Pizza",
    price: 450,
    priceFormatted: "450 ETB",
    category: "Fast Food",
    categoryId: "fast-food",
    rating: 4.8,
    reviewsCount: 112,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
    description: "Freshly baked pizza with melted cheese and a golden crust.",
    fullDescription: "Freshly baked handcrafted pizza topped with melted mozzarella, house tomato herb sauce, and crispy crust.",
  },
  {
    id: "22",
    name: "Addis Burger",
    price: 300,
    priceFormatted: "300 ETB",
    category: "Fast Food",
    categoryId: "fast-food",
    rating: 4.7,
    reviewsCount: 96,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    description: "Juicy beef burger with fresh vegetables and house sauce.",
    fullDescription: "Prime ground beef patty grilled to perfection, served on a toasted bun with crisp lettuce, ripe tomatoes, and house dressing.",
  },
  {
    id: "23",
    name: "Chicken Wrap",
    price: 260,
    priceFormatted: "260 ETB",
    category: "Fast Food",
    categoryId: "fast-food",
    rating: 4.6,
    reviewsCount: 74,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
    description: "Grilled chicken and crunchy vegetables wrapped in flatbread.",
    fullDescription: "Tender seasoned chicken strips, crunchy lettuce, and tangy garlic sauce wrapped warmly in toasted flatbread.",
  },
  {
    id: "24",
    name: "Crispy Fries",
    price: 120,
    priceFormatted: "120 ETB",
    category: "Fast Food",
    categoryId: "fast-food",
    rating: 4.8,
    reviewsCount: 128,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
    description: "Golden potato fries with a light seasoning.",
    fullDescription: "Hand-cut golden potatoes fried to a crisp exterior, seasoned with sea salt and Ethiopian spiced butter herbs.",
  },
];

// Normalize properties across all dishes for seamless compatibility
dishes.forEach((dish) => {
  if (!dish.image && dish.imageUrl) dish.image = dish.imageUrl;
  if (!dish.imageUrl && dish.image) dish.imageUrl = dish.image;
  if (!dish.priceFormatted) dish.priceFormatted = `${dish.price} ETB`;
  if (!dish.fullDescription) dish.fullDescription = dish.description;
});

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((dish) => dish.id === String(id) || dish.id === id) ?? null;
}

export async function getDishIds() {
  return dishes.map((dish) => String(dish.id));
}

export function getCategories() {
  return Array.from(new Set(dishes.map((dish) => dish.category).filter(Boolean)));
}

export async function getPagedDishes({
  page = 1,
  limit = 8,
  category = "All",
} = {}) {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.max(1, parseInt(limit, 10) || 8);

  const filtered =
    !category || category === "All"
      ? dishes
      : dishes.filter(
        (dish) =>
          dish.category.toLowerCase() === category.toLowerCase()
      );

  const total = filtered.length;
  const totalPages = Math.ceil(total / parsedLimit) || 1;
  const safePage = Math.min(parsedPage, totalPages);
  const offset = (safePage - 1) * parsedLimit;

  return {
    dishes: filtered.slice(offset, offset + parsedLimit),
    total,
    page: safePage,
    totalPages,
    limit: parsedLimit,
    hasMore: safePage < totalPages,
  };
}

export async function searchDishes(query = "") {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return { dishes: [], query: "", total: 0 };
  }

  const q = cleanQuery.toLowerCase();

  const matched = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(q) ||
      dish.category.toLowerCase().includes(q) ||
      dish.description.toLowerCase().includes(q)
  );

  return {
    dishes: matched,
    query: cleanQuery,
    total: matched.length,
  };
}
