import { useEffect, useMemo, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../components/Usefetch";
import { useCart } from "../components/Cartcontext";
import CategoryBar from "../components/Categorybar";
import Dish from "../components/Dish";
import { categories } from "../components/Categories";



function Menu() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") || "All";
    const searchRef = useRef(null);
    const { items, dispatch } = useCart();

    const { data: dishes, loading, error } = useFetch("/dishes.json");

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    const shown = useMemo(() => {
        if (!dishes) return [];
        return category === "All" ? dishes : dishes.filter((d) => d.category === category);
    }, [dishes, category]);

    function handleSelectCategory(cat) {
        if (cat === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ category: cat });
        }
    }

    if (loading) return <p className="status">Loading the menu…</p>;
    if (error) return <p className="status status-error">{error}</p>;

    return (
        <section>
            <h2>Menu</h2>
            <input
                ref={searchRef}
                className="search-input"
                type="search"
                placeholder="Search isn't wired up yet — but this box grabs focus on load"
                aria-label="Search dishes"
            />
            <CategoryBar categories={categories} selected={category} onSelect={handleSelectCategory} />

            {shown.length === 0 ? (
                <p className="status">No dishes in this category yet.</p>
            ) : (
                <div className="dish-grid">
                    {shown.map((dish) => {
                        const inCart = items.some((i) => i.id === dish.id);
                        return (
                            <div key={dish.id}>
                                <Dish
                                    {...dish}
                                    inCart={inCart}
                                    onAdd={(d) => dispatch({ type: "add", dish: d })}
                                    onRemove={(id) => dispatch({ type: "remove", id })}
                                />
                                <Link to={`/menu/${dish.id}`} className="details-link">
                                    View details
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default Menu;