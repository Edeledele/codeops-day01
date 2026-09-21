import Link from "next/link";
import NavigationButton from "../components/NavigationButton";

export default function HomePage() {
  return (
    <main className="home-page">
      <nav className="page-nav">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="welcome-text">
            WELCOME TO OUR RESTAURANT
          </p>

          <h1>
            Delicious Food,
            <br />
            Made With Love
          </h1>

          <p className="hero-description">
            Enjoy delicious meals, fresh ingredients,
            and a wonderful dining experience.
          </p>

          <div className="hero-buttons">
            <Link className="menu-button" href="/menu">
              Explore Menu
            </Link>

            <NavigationButton />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🍕 Fresh Food</h3>
          <p>
            Fresh and delicious meals prepared
            with quality ingredients.
          </p>
        </div>

        <div className="feature-card">
          <h3>🚀 Fast Service</h3>
          <p>
            Quick and friendly service for
            a comfortable experience.
          </p>
        </div>

        <div className="feature-card">
          <h3>❤️ Great Taste</h3>
          <p>
            Enjoy delicious flavors made
            especially for you.
          </p>
        </div>
      </section>
    </main>
  );
}