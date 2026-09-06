import { useParams, Link } from "react-router-dom";
import { useFetch } from "../components/Usefetch";
import { useCart } from "../components/Cartcontext";
import Card from "../components/Card";

function DishPage() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch("/dishes.json");
  const { items, dispatch } = useCart();

  if (loading) return <p className="status">Loading dish…</p>;
  if (error) return <p className="status status-error">{error}</p>;

  const dish = dishes?.find((d) => String(d.id) === id);

  if (!dish) {
    return (
      <div>
        <p className="status">We couldn't find that dish.</p>
        <Link to="/menu">Back to the menu</Link>
      </div>
    );
  }

  const inCart = items.some((i) => i.id === dish.id);

  return (
    <Card className="dish-detail">
      <h2>
        {dish.name} {dish.spicy && <span className="badge">• Spicy</span>}
      </h2>
      <p className="price">{dish.price} ETB</p>
      <p className="muted">Category: {dish.category}</p>
      {inCart ? (
        <button className="remove-btn-dish" onClick={() => dispatch({ type: "remove", id: dish.id })}>
          Remove from cart
        </button>
      ) : (
        <button className="add-btn" onClick={() => dispatch({ type: "add", dish })}>
          Add to cart
        </button>
      )}
      <Link to="/menu" className="details-link">
        ← Back to the menu
      </Link>
    </Card>
  );
}

export default DishPage;