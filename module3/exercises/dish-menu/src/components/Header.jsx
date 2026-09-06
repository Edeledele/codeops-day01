import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../components/Cartcontext";

function Header() {
  const { items } = useContext(CartContext);

  return (
    <header className="app-header">
      <h1>Habesha Bites</h1>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Menu
        </NavLink>
        <NavLink to="/checkout" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Checkout{items.length > 0 && <span className="cart-badge">{items.length}</span>}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;