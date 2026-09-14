import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../cart/store.jsx'
import { validateCheckout } from './validate.js'
import Field from './Field.jsx'
import Button from '../ui/Button.jsx'

const initialValues = { fullName: '', phone: '', address: '' }

export default function Checkout() {
  const { lines, total, clear } = useCart()
  const navigate = useNavigate()

  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [placed, setPlaced] = useState(false)

  const errors = validateCheckout(values)
  const isValid = Object.keys(errors).length === 0

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ fullName: true, phone: true, address: true })
    if (!isValid) return

    setSubmitting(true)
    try {
      await new Promise((res) => setTimeout(res, 700))
      clear()
      setPlaced(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (placed) {
    return (
      <div className="page">
        <h1>Order placed!</h1>
        <p>Thanks — your Addis Eats order is on its way.</p>
        <Button onClick={() => navigate('/')}>Back to home</Button>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p className="empty-note">Your cart is empty — nothing to check out yet.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Checkout</h1>
      <p className="cart-total">Total: {total} ETB</p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <Field
          label="Full name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          touched={touched.fullName}
        />
        <Field
          label="Phone number"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
        />
        <Field
          label="Delivery address"
          name="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address}
          touched={touched.address}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Placing order…' : 'Place order'}
        </Button>
      </form>
    </div>
  )
}
