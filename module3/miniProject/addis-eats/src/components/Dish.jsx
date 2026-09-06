import PropTypes from "prop-types";
import Card from "./Card";

function Dish({ id, name, price, currency = "ETB", spicy = false, inCart = false, onAdd, onRemove }) {
  return (
    <Card className="dish">
      <h3>
        {name} {spicy && <span className="badge">• Spicy</span>}
      </h3>
      <p className="price">
        {price} {currency}
      </p>
      {inCart ? (
        onRemove && (
          <button className="remove-btn-dish" onClick={() => onRemove(id)}>
            Remove from cart
          </button>
        )
      ) : (
        onAdd && (
          <button className="add-btn" onClick={() => onAdd({ id, name, price })}>
            Add to cart
          </button>
        )
      )}
    </Card>
  );
}

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  inCart: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Dish;