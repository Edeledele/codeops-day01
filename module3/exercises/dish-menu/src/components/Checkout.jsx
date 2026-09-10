import { useContext, useRef, useState } from "react";
import { CartContext } from "../components/Cartcontext";


const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

const TELEBIRR_PATTERN = /^09\d{8}$/; // e.g. 0912345678


function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please tell us who this order is for.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your TeleBirr number.";
  } else if (!TELEBIRR_PATTERN.test(form.phone.trim())) {
    errors.phone = "Enter a valid TeleBirr number, e.g. 0912345678.";
  }

  if (!form.area) {
    errors.area = "Please choose a delivery area.";
  }

  if (form.notes.length > 200) {
    errors.notes = "Keep notes under 200 characters.";
  }

  return errors;
}

const FIELD_ORDER = ["name", "phone", "area", "notes"];

function Checkout() {
  const { items, total, removeFromCart, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({ name: "", phone: "", area: "", notes: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [placed, setPlaced] = useState(null); // { name, area } once an order actually goes through

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);
  const notesRef = useRef(null);
  const refs = { name: nameRef, phone: phoneRef, area: areaRef, notes: notesRef };


  const errors = validate(form);


  const touchedError = (field) => Boolean(touched[field] && errors[field]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function focusFirstInvalid(currentErrors) {
    const firstBad = FIELD_ORDER.find((f) => currentErrors[f]);
    if (firstBad) refs[firstBad].current?.focus();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    setSubmitError(null);
    setTouched({ name: true, phone: true, area: true, notes: true });

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      focusFirstInvalid(currentErrors);
      return;
    }
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      await placeOrder(form, items);
      setPlaced({ name: form.name, area: form.area });
      clearCart();
    } catch (err) {
      setSubmitError(err.message);
      nameRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  if (placed) {
    return (
      <p className="status" role="status">
        Thanks, {placed.name}! Your order is on its way to {placed.area}.
      </p>
    );
  }

  const buttonLabel = submitting
    ? `Placing order — ${total} ETB…`
    : `Place order — ${total} ETB`;

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
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            ref={nameRef}
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touchedError("name")}
            aria-describedby={touchedError("name") ? "name-error" : undefined}
          />
          {touchedError("name") && (
            <p id="name-error" className="field-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="phone">TeleBirr number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0912345678"
            ref={phoneRef}
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touchedError("phone")}
            aria-describedby={touchedError("phone") ? "phone-error" : undefined}
          />
          {touchedError("phone") && (
            <p id="phone-error" className="field-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="area">Delivery area</label>
          <select
            id="area"
            name="area"
            ref={areaRef}
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touchedError("area")}
            aria-describedby={touchedError("area") ? "area-error" : undefined}
          >
            <option value="">Select an area…</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          {touchedError("area") && (
            <p id="area-error" className="field-error" role="alert">
              {errors.area}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="notes">Delivery notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            ref={notesRef}
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={3}
            aria-invalid={touchedError("notes")}
            aria-describedby={touchedError("notes") ? "notes-error" : undefined}
          />
          {touchedError("notes") && (
            <p id="notes-error" className="field-error" role="alert">
              {errors.notes}
            </p>
          )}
        </div>

        {submitError && (
          <p className="field-error" role="alert">
            {submitError}
          </p>
        )}

        <button type="submit" className="add-btn" disabled={submitting || items.length === 0}>
          {buttonLabel}
        </button>
      </form>
    </section>
  );
}

function placeOrder(form, items) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const networkFailed = Math.random() < 0.15;
      if (networkFailed) {
        reject(new Error("We couldn't reach the kitchen. Check your connection and try again."));
      } else {
        resolve({ form, items });
      }
    }, 700);
  });
}

export default Checkout;