import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Menu from './menu/Menu.jsx'
import DishDetail from './menu/DishDetail.jsx'
import CartPanel from './cart/CartPanel.jsx'
import SignIn from './auth/SignIn.jsx'
import NotFound from './pages/NotFound.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import ErrorBoundary from './ui/ErrorBoundary.jsx'
import Spinner from './ui/Spinner.jsx'

// Checkout is the least-visited screen, so it's a good candidate to split
// out of the initial bundle (Day 34: one lazy route).
const Checkout = lazy(() => import('./checkout/Checkout.jsx'))

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<DishDetail />} />
          <Route path="cart" element={<CartPanel />} />
          <Route path="signin" element={<SignIn />} />
          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Suspense fallback={<Spinner label="Loading checkout…" />}>
                  <Checkout />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
