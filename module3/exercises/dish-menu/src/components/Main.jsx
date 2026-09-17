import { useEffect, useMemo, useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "./Usefeth";
import { CartContext } from "./Cartcontext";
import { categories } from "./Data";
import CategoryBar from "./Categorybar";
import Card from "./Card";
import Dish from "./Dish";

function Main() {
  // Category lives in the URL (?category=Drinks) so it's shareable/bookmarkable.
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "All";

  const { data: dishes, loading, error } = useFetch("/dishes.json");
  const { total } = useContext(CartContext);

  const filtered = useMemo(() => {
    if (!dishes) return [];
    return category === "All" ? dishes : dishes.filter((d) => d.category === category);
  }, [dishes, category]);

  useEffect(() => {
    document.title = `${filtered.length} dishes`;
  }, [filtered.length]);

  function handleSelectCategory(next) {
    setSearchParams(next === "All" ? {} : { category: next });
  }

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <div className="menu">
      <CategoryBar categories={categories} selected={category} onSelect={handleSelectCategory} />

      {filtered.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        <div className="dish-list">
          {filtered.map((dish) => (
            <Card key={dish.id}>
              <Dish {...dish} />
            </Card>
          ))}
        </div>
      )}

      <p className="order-total">Order total: {total} ETB</p>
    </div>
  );
}

export default Main;