import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>That page doesn't exist. Let's get you back on track.</p>
      <Link to="/">Back to home</Link>
    </section>
  );
}

export default NotFound;