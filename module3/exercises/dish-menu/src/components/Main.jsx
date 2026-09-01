import React from "react"
import Dish from './Dish'


const dishes = [
  { id: 1, name: 'Doro Wat', price: 120 },
  { id: 2, name: 'Ful Medames', price: 800 },
  { id: 3, name: 'Tibs', price: 60 },
  { id: 4, name: 'Kitfo', price: 60 },
  { id: 5, name: 'Niter Kibbeh', price: 60 },
  { id:6, name:'Chechebsa', price:150},
  { id:7, name:'Rice & Chicken', price:350}
]

function Main() {
  return (
    <div className="dish">
      {dishes.map((dish) => (
        <Dish key={dish.id} name={dish.name} price={dish.price} />
      ))}
    </div>
  )
}

export default Main