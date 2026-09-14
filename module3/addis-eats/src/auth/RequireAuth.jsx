import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'

export default function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    // Remember where the user was headed so we can send them back after sign-in.
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}
