import Link from "next/link";
import { CartProvider } from "./components/cartContext";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian food, delivered with love.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header>
            <nav className="navbar">
              <Link href="/" className="logo">
                Addis Eats
              </Link>

              <div className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/cart" className="cart-link">
                  🛒 Cart
                </Link>
              </div>
            </nav>
          </header>

          {children}

          <footer className="footer">
            <p>
              © 2026 <strong>Addis Eats</strong> — Ethiopian food,
              delivered with love.
            </p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}