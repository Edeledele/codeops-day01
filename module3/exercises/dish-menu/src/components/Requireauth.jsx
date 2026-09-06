import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/Authcontext";

function RequireAuth({ children }) {
  const { isAuthed } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthed) {
    // Remember where the user was headed so Login can send them back.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;