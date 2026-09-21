import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo">
          🍽 Our Restaurant
        </Link>

        <nav className="page-nav">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}