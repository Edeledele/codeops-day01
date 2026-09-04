import Dish from "./Dish";
import Card from "./Card";
import menu from "./Data";


function FeaturedDish() {
  const featured = menu[0];
  return (
    <Card>
      <Dish name={featured.name} price={featured.price} spicy={featured.spicy} />
    </Card>
  );
}

function MenuSection({ category }) {
  const filtered = menu.filter((dish) => dish.category === category);

  if (filtered.length === 0) {
    return <p className="menu-empty">No dishes found in "{category}".</p>;
  }

  return (
    <div className="menu-grid">
      {filtered.map((dish) => (

        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
    </div>
  );
}

function Main() {
  return (
    <main className="menu">
      <section>
        <h2>Featured</h2>
        <FeaturedDish />
      </section>

      <section>
        <h2>Mains</h2>
        <MenuSection category="mains" />
      </section>

      <section>
        <h2>Sides</h2>
        <MenuSection category="sides" />
      </section>

      <section>
        <h2>Drinks</h2>
        <MenuSection category="drinks" />
      </section>

      <section>
        <h2>Desserts</h2>
        {/* No desserts in the data yet — exercises the empty state. */}
        <MenuSection category="desserts" />
      </section>
    </main>
  );
}

export default Main;