import Header from './components/Header.jsx'
import Dish from './components/Dish.jsx'
import dishes from './data/dishes.js'

function App() {
  return (
    <div className="page">
      <Header />
      <main className="menu">
        <h2 className="menu-heading">Today's Menu</h2>
        <div className="menu-list">
          {dishes.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
