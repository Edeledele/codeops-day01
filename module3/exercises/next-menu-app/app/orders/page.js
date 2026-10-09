import Link from "next/link";
import { listOrdersFor } from "../../lib/orders";
import { getSessionId } from "../../lib/session";
import CancelButton from "./CancelButton";

export const metadata = {
  title: "Orders",
  description: "View your past and pending orders.",
};

// Reads cookies, so this route is dynamic and always reflects the latest writes.
export default async function OrdersPage() {
  const sessionId = await getSessionId();
  const orders = sessionId ? listOrdersFor(sessionId).reverse() : [];

  return (
    <main className="checkout-page">
      <h1>My Orders</h1>
      <hr />

      {orders.length === 0 ? (
        <div className="empty-cart">
          <h2>No orders yet</h2>
          <Link className="primary-link" href="/menu">
            Go to Menu
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div className="checkout-card" key={order.id}>
            <h2>
              Order #{order.id} · {order.status}
            </h2>
            {order.items.map((l) => (
              <p key={l.id}>
                {l.quantity} × {l.name} ({l.price} ETB)
              </p>
            ))}
            <strong>{order.total} ETB</strong>
            {order.status === "pending" && <CancelButton orderId={order.id} />}
          </div>
        ))
      )}
    </main>
  );
}