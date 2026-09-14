import { Link } from 'react-router-dom'
import { useCart } from './store.jsx'
import Button from '../ui/Button.jsx'

export default function Cart() {
  const { lines, total, itemCount, removeItem, increment, decrement } = useCart()

  if (lines.length === 0) {
    return (
      <div className="page">
        <h1>Your Cart</h1>
        <p className="empty-note">Your cart is empty — browse the menu to add something.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>
      <ul className="cart-lines">
        {lines.map((line) => (
          <li key={line.id} className="cart-line">
            <span>{line.name}</span>
            <span>{line.price} ETB</span>
            <div className="qty-controls">
              <Button onClick={() => decrement(line.id)}>−</Button>
              <span className="qty-value">{line.qty}</span>
              <Button onClick={() => increment(line.id)}>+</Button>
            </div>
            <span>{line.price * line.qty} ETB</span>
            <Button onClick={() => removeItem(line.id)} variant="danger" className="remove-btn">
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: {total} ETB</p>
      <Link to="/checkout">
        <Button>Go to checkout</Button>
      </Link>
    </div>
  )
}