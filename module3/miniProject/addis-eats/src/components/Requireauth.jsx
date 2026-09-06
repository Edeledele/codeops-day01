import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/Authcontext";

export function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="status">Checking your session…</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}