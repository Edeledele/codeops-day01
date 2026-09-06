import { useState, useContext, memo } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../components/Cartcontext";

function Dish({ id, name, price, spicy, currency }) {
  const [count, setCount] = useState(0);
  const { addToCart, removeFromCart } = useContext(CartContext);

  function handleAdd() {
    if (count >= 1) return; // already added — do nothing
    setCount(1);
    addToCart({ id, name, price });
  }

  function handleRemove() {
    if (count === 0) return; // nothing to remove
    setCount(0);
    removeFromCart(id);
  }

  return (
    <div className="dish">
      <h3>
        {name} {count > 0 && `(${count})`}
      </h3>
      <p>
        {price} {currency}
      </p>
      {/* Boolean(...) guard so a falsy-but-not-boolean spicy value (like 0)
          never accidentally renders as text on screen. */}
      {Boolean(spicy) && <span className="badge">🌶 Spicy</span>}
      <div className="dish-actions">
        <button onClick={handleAdd} disabled={count >= 1}>
          {count >= 1 ? "Added" : "Add"}
        </button>
        <button onClick={handleRemove} disabled={count === 0}>
          Remove
        </button>
      </div>
    </div>
  );
}

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

Dish.defaultProps = {
  spicy: false,
  currency: "ETB",
};

// Memoized so a re-render of the parent list doesn't re-render every Dish
// unless that specific dish's own props changed.
export default memo(Dish);