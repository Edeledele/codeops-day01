import DishCard from "./components/DishCard";
import { getDishes } from "../lib/dishes";

export default async function DishList() {
  const dishes = await getDishes();

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
