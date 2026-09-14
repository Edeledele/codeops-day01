import { Link } from 'react-router-dom'
import { useCart } from './store.jsx'

export default function CartBadge() {
  const { lines } = useCart()
  const count = lines.reduce((sum, l) => sum + l.qty, 0)

  return (
    <Link to="/cart" className="cart-badge">
      Cart
      {count > 0 && <span className="cart-badge-count">{count}</span>}
    </Link>
  )
}
