import { useContext, memo } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../components/Cartcontext";

function Dish({ id, name, price, spicy, currency }) {
  const { items, addToCart, removeFromCart } = useContext(CartContext);

  
  const inCart = items.some((i) => i.id === id);

  function handleAdd() {
    if (inCart) return;
    addToCart({ id, name, price });
  }

  function handleRemove() {
    if (!inCart) return;
    removeFromCart(id);
  }

  return (
    <div className="dish">
      <h3>{name}</h3>
      <p>
        {price} {currency}
      </p>
     
      {Boolean(spicy) && <span className="badge">🌶 Spicy</span>}
      <div className="dish-actions">
        <button onClick={handleAdd} disabled={inCart}>
          {inCart ? "Added" : "Add"}
        </button>
        <button onClick={handleRemove} disabled={!inCart}>
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


export default memo(Dish);