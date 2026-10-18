import { redirect } from "next/navigation";

export default async function OrderStatusRedirectPage({ params }) {
  const { id } = await params;
  redirect(`/orders/${id || "ord-101"}`);
}
