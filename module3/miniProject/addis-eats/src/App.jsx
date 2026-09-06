import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/Themecontext";
import { CartProvider } from "./components/Cartcontext";

import Layout from "./components/Layout";
import Menu from "./components/Menu";
import DishPage from "./components/Dishpage";
import Checkout from "./components/Checkout";
import NotFound from "./components/Notfound";

import "./css/App.css";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Menu />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishPage />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;