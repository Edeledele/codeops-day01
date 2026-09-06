import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Capture the flag once, at mount, so clearing the history state below
  // doesn't make the confirmation flicker away immediately after showing.
  const [orderPlaced] = useState(() => Boolean(location.state?.orderPlaced));

  // Replace the history entry so refreshing or navigating back to "/"
  // later doesn't resurrect the confirmation message.
  useEffect(() => {
    if (orderPlaced) {
      navigate(".", { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      {orderPlaced && (
        <p className="order-confirmation">
          ✅ Your order has been placed! Thanks for ordering from Habesha Bites.
        </p>
      )}
      <h2>Welcome to Habesha Bites</h2>
      <p>A small React project: browse the menu, add dishes to your order, and check out.</p>
      <Link to="/menu">
        <button>View the menu</button>
      </Link>
    </div>
  );
}

export default Home;