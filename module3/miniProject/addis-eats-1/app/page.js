
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">
            FRESHLY MADE · LOCALLY LOVED
          </p>

          <h1>
            Taste the heart of <span>Addis</span>
          </h1>

          <p>
            Discover the rich flavors of Ethiopia, from traditional
            doro wot and delicious vegetarian platters to your
            favorite everyday meals. Fresh food, easy ordering,
            and a taste of home.
          </p>

          <div className="hero-buttons">
            <Link href="/menu" className="primary-btn">
              Explore the Menu →
            </Link>

            <Link href="/cart" className="secondary-btn">
              View Your Cart
            </Link>
          </div>
        </div>
      </section>

      <section
        className="container home-highlights"
        aria-label="Why choose Addis Eats"
      >
        <article>
          <span aria-hidden="true">✦</span>
          <h2>Authentic Flavors</h2>
          <p>
            Enjoy Ethiopian favorites and popular meals
            prepared with care.
          </p>
        </article>

        <article>
          <span aria-hidden="true">♡</span>
          <h2>Freshly Prepared</h2>
          <p>
            Delicious food, quality ingredients, and
            a menu full of tasty choices.
          </p>
        </article>

        <article>
          <span aria-hidden="true">➜</span>
          <h2>Easy Ordering</h2>
          <p>
            Explore our menu, add your favorite dishes,
            and proceed to checkout with ease.
          </p>
        </article>
      </section>
    </main>
  );
}
