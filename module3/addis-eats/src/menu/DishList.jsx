import { useCart } from '../cart/store.jsx'
import DishCard from './DishCard.jsx'

export default function DishList({ dishes }) {
  const { add } = useCart()

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} onAdd={() => add(dish)} />
      ))}
    </div>
  )
}
