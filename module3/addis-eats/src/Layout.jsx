import { Link, Outlet } from 'react-router-dom'
import CartBadge from './cart/CartBadge.jsx'
import { useAuth } from './auth/AuthProvider.jsx'

export default function Layout() {
  const { user, signOut } = useAuth()

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          Addis Eats
        </Link>
        <nav>
          <Link to="/menu">Menu</Link>
          <CartBadge />
          {user ? (
            <button className="link-button" onClick={signOut}>
              Sign out ({user.name})
            </button>
          ) : (
            <Link to="/signin">Sign in</Link>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>Addis Eats — a CodeOps mini-project.</p>
      </footer>
    </div>
  )
}
