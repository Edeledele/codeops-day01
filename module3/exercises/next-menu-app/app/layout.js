import "./globals.css";
import { CartProvider } from "../components/cartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Restaurant Menu",
  description: "Restaurant menu application",
};

// This is the ROOT layout: it is the only layout in the app that is
// allowed to render <html> and <body>. Every other layout (e.g.
// app/menu/layout.js) just returns the UI it wraps.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}