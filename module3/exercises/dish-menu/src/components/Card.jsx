import PropTypes from "prop-types";

function card({ children }) {
  return <div className="card">{children}</div>;
}

card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default card;