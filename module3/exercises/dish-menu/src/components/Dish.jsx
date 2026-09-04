import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <div className="dish">
      <h3 className="dish__name">{name}</h3>
      <p className="dish__price">
        {price.toFixed(2)} {currency}
      </p>
      {!!spicy && <span className="dish__badge">Spicy</span>}
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

export default Dish;