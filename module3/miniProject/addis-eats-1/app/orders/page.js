import { getSession } from "../lib/auth";
import { getUserOrders } from "../lib/orders";
import TrackOrderClient from "./TrackOrderClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Track Order · Addis Eats",
  description: "Track your authentic Ethiopian food order status in real time.",
};

export default async function OrdersIndexPage() {
  const session = await getSession();
  const user = session?.user || null;
  const userOrders = user ? await getUserOrders(user.id) : [];

  return (
    <main className="order-status-page">
      <TrackOrderClient user={user} userOrders={userOrders} />
    </main>
  );
}
