import Link from "next/link";
import { getOrder } from "../../lib/orders";
import OrderStatusTracker from "./OrderStatusTracker";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order #${id} Status · Addis Eats`,
    description: `Track real-time status and delivery for Addis Eats order #${id}.`,
  };
}

export default async function OrderStatusPage({ params }) {
  const { id } = await params;
  const initialOrder = await getOrder(id);

  if (!initialOrder) {
    return (
      <main className="order-status-page" style={{ paddingBlock: "60px 80px" }}>
        <div className="no-order-state-card">
          <div className="no-order-icon">🔍</div>
          <h2>Order #{id} Not Found</h2>
          <p>
            We couldn&apos;t find an order matching ID <strong>{id}</strong>. Please check your confirmation or receipt.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
            <Link href="/orders" className="primary-btn">
              Track Another Order
            </Link>
            <Link href="/menu" className="secondary-btn">
              Browse Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="order-status-page">
      <OrderStatusTracker orderId={id} fallbackOrder={initialOrder} />
    </main>
  );
}
