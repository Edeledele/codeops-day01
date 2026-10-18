import { redirect } from "next/navigation";
import { getSession } from "../lib/auth";
import { getAllOrders } from "../lib/orders";
import StaffClient from "./StaffClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Staff Dashboard · Addis Eats",
  description: "Kitchen order management and dispatch operations.",
};

export default async function StaffPage() {
  // Layer 2: Defense in Depth (server-rendered verification)
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?next=/staff");
  }

  // Staff role check
  if (session.user.role !== "staff") {
    redirect("/unauthorized");
  }

  const allOrders = await getAllOrders();

  return (
    <main className="staff-page">
      <StaffClient staffUser={session.user} allOrders={allOrders} />
    </main>
  );
}
