import { useState, useContext } from "react";
import { CartContext } from "../components/Cartcontext";

const TELEBIRR_PATTERN = /^09\d{8}$/; // e.g. 0912345678

function Checkout() {
  const { items, total, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const isValidPhone = TELEBIRR_PATTERN.test(form.phone);
  const canSubmit = form.name.trim() !== "" && form.area.trim() !== "" && isValidPhone;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <div className="checkout">
        <p className="order-confirmation">
          ✅ Your order has been placed! Thanks for ordering from Habesha Bites.
        </p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p>Your cart is empty. Go back to the menu to add something.</p>
      ) : (
        <ul>
          {items.map((item, i) => (
            <li key={`${item.id}-${i}`}>
              {item.name} — {item.price} ETB
            </li>
          ))}
        </ul>
      )}
      <p>Total: {total} ETB</p>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="TeleBirr number (09XXXXXXXX)" />
        {form.phone && !isValidPhone && <p className="error">Enter a valid TeleBirr number</p>}
        <input name="area" value={form.area} onChange={handleChange} placeholder="Delivery area" />
        <button type="submit" disabled={!canSubmit || items.length === 0}>
          Place order
        </button>
      </form>
    </div>
  );
}

export default Checkout;