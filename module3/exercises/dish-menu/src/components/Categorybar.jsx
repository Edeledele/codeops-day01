import PropTypes from "prop-types";

// Presentational only — owns no state. The parent (Main) decides what
// "selected" means and what happens on selection, this just renders it.
function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="chips">
      {categories.map((c) => (
        <button
          key={c}
          className={c === selected ? "chip active" : "chip"}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryBar;