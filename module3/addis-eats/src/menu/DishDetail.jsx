import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { fetchDishById } from '../api/dishes.js'
import { useCart } from '../cart/store.jsx'
import Spinner from '../ui/Spinner.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import Button from '../ui/Button.jsx'

export default function DishDetail() {
  const { id } = useParams()
  const { add } = useCart()

  const { data: dish, loading, error } = useFetch(
    (signal) => fetchDishById(id, { signal }),
    [id]
  )

  if (loading) return <Spinner label="Loading dish…" />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <div className="page dish-detail">
      <Link to="/menu">&larr; Back to menu</Link>
      <img src={dish.image} alt={dish.name} />
      <h1>{dish.name}</h1>
      <p className="price">{dish.price} ETB</p>
      <p>{dish.description}</p>
      <Button onClick={() => add(dish)}>Add to cart</Button>
    </div>
  )
}
