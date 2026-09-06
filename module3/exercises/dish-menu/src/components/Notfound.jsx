import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h2>404 — Page not found</h2>
      <Link to="/">Back to home</Link>
    </div>
  );
}

export default NotFound;