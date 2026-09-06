import { useParams, Link } from "react-router-dom";
import { useFetch } from "../components/Usefeth";

function DishPage() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Loading dish...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  const dish = dishes.find((d) => d.id === Number(id));

  if (!dish) {
    return (
      <div>
        <p>We couldn't find that dish.</p>
        <Link to="/menu">Back to menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-page">
      <h2>{dish.name}</h2>
      <p>{dish.price} ETB</p>
      <p>Category: {dish.category}</p>
      {dish.spicy && <p>🌶 This one is spicy.</p>}
      <Link to="/menu">Back to menu</Link>
    </div>
  );
}

export default DishPage;