export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="category-bar" role="tablist" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={category === selected}
          className={`category-pill ${category === selected ? 'active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
