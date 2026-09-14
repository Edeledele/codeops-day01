import { useCart } from '../cart/store.jsx'
import Button from '../ui/Button.jsx'

export default function DishCard({ dish }) {
  const { addItem, isInCart } = useCart()
  const added = isInCart(dish.id)

  return (
    <div className="dish-card">
      <img src={dish.image} alt={dish.name} className="dish-image" />
      <h3>{dish.name}</h3>
      <p>{dish.price} ETB</p>
      <Button onClick={() => addItem(dish)} disabled={added}>
        {added ? 'Added ✓' : 'Add to cart'}
      </Button>
    </div>
  )
}