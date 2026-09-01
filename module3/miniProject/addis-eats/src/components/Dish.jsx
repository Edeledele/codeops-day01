function Dish({ name, description, price }) {
  return (
    <div className="dish">
      <div className="dish-text">
        <h3 className="dish-name">{name}</h3>
        {description && <p className="dish-description">{description}</p>}
      </div>
      <p className="dish-price">{price} ETB</p>
    </div>
  )
}

export default Dish
