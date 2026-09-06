import { NavLink, Link } from "react-router-dom";
import { useCart } from "../components/Cartcontext";
import { useTheme } from "../components/Themecontext";

function Header() {
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        Addis Eats
      </Link>

      <nav className="nav">
        <NavLink to="/menu" className={({ isActive }) => (isActive ? "nav-active" : "")}>
          Menu
        </NavLink>
        <NavLink to="/checkout" className={({ isActive }) => (isActive ? "nav-active" : "")}>
          Cart{items.length > 0 && <span className="cart-badge">{items.length}</span>}
        </NavLink>
      </nav>

    
    </header>
  );
}

export default Header;