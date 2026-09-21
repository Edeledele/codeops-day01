import "./globals.css";
import { CartProvider } from "../components/cartContext";

export const metadata = {
  title: "Restaurant Menu",
  description: "Restaurant menu application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}