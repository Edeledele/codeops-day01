import { useState } from "react";
import { useCart } from "../components/Cartcontext";


function Checkout() {
  const { items, total, dispatch } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [placed, setPlaced] = useState(false);

  const canSubmit = form.name.trim() && phoneValid && form.area.trim() && items.length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setPlaced(true);
    dispatch({ type: "clear" });
  }

  if (placed) {
    return <p className="status">Thanks, {form.name}! Your order is on its way to {form.area}.</p>;
  }

  return (
    <section>
      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p className="status">Your cart is empty. Go add something from the menu.</p>
      ) : (
        <ul className="cart-list">
          {items.map((item, i) => (
            <li key={item.id + "-" + i}>
              {item.name} — {item.price} ETB
              <button className="remove-btn" onClick={() => dispatch({ type: "remove", id: item.id })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="total">Total: {total} ETB</p>

      
    </section>
  );
}

export default Checkout;