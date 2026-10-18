import { redirect } from "next/navigation";
import { getSession } from "../lib/auth";
import { getUserOrders } from "../lib/orders";
import AccountClient from "./AccountClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Account · Addis Eats",
  description: "Manage your profile, addresses, and view your Addis Eats order history.",
};

export default async function AccountPage() {
  // Layer 2: Defense in Depth (verifying session while rendering on server)
  const session = await getSession();
  if (!session?.user) {
    redirect("/login?next=/account");
  }

  // Layer 3: Query scoped strictly to verified session.user.id (IDOR prevention)
  const scopedOrders = await getUserOrders(session.user.id);

  return (
    <main className="account-page">
      <AccountClient user={session.user} orders={scopedOrders} />
    </main>
  );
}
