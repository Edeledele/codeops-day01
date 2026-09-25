import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">AUTHENTIC ETHIOPIAN FOOD</p>

          <h1>
            Taste the heart of <span>Addis</span>
          </h1>

          <p>
            Discover delicious Ethiopian dishes, traditional flavors, and modern
            favorites — all in one place.
          </p>

          <div className="hero-buttons">
            <Link href="/menu" className="primary-btn">
              Explore Menu
            </Link>

            <Link href="/cart" className="secondary-btn">
              View Cart
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
