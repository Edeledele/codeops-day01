import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/Teamecontext";
import { CartProvider } from "./components/Cartcontext";
import Layout from "./components/Layout";
import Main from "./components/Main";
import Checkout from "./components/Checkout";
import NotFound from "./components/Notfound";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
 
export default App;
 