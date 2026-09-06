import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../components/Teamecontext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={theme === "dark" ? "app-header dark" : "app-header"}>
      <h1>Habesha Bites</h1>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Menu
        </NavLink>
        <NavLink to="/checkout" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Checkout
        </NavLink>
      </nav>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </header>
  );
}

export default Header;