import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]) // [{ id, name, price, image, qty }]

  function addItem(item) {
    setLines((current) => {
      const existing = current.find((line) => line.id === item.id)
      if (existing) {
        return current.map((line) =>
          line.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...current, { ...item, qty: 1 }]
    })
  }

  function removeItem(id) {
    setLines((current) => current.filter((line) => line.id !== id))
  }

  function increment(id) {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line))
    )
  }

  function decrement(id) {
    setLines((current) =>
      current
        .map((line) => (line.id === id ? { ...line, qty: line.qty - 1 } : line))
        .filter((line) => line.qty > 0)
    )
  }

  function clear() {
    setLines([])
  }

  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0)
  const isInCart = (id) => lines.some((line) => line.id === id)

  return (
    <CartContext.Provider
      value={{ lines, total, itemCount, addItem, removeItem, increment, decrement, clear, isInCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside a CartProvider')
  return ctx
}