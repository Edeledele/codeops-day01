import React from "react"

function Dish({ name, price }) {
  return (
    <div className="card-container">
      <h2 className="card-title">{name}</h2>
      <p>ETB{price.toFixed(2)}</p>
    </div>
  )
}

export default Dish