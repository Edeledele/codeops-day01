"use server";

import { revalidatePath } from "next/cache";
import { createOrder, getOrder, validateOrder } from "../../lib/orders";
import { ensureSessionId, getSessionId } from "../../lib/session";

// State shape returned to useActionState. `status` mirrors the HTTP status
// codes of POST /api/orders, so the form branches on it exactly the same way.
//   201 created | 400 bad payload | 422 fieldErrors
const emptyState = {
  status: null,
  message: null,
  fieldErrors: {},
  orderId: null,
};

export async function placeOrder(prevState, formData) {
  let items;
  try {
    items = JSON.parse(formData.get("items") ?? "[]");
  } catch {
    return {
      ...emptyState,
      status: 400,
      message: "Your cart could not be read. Please refresh and try again.",
    };
  }

  const result = validateOrder({
    name: formData.get("name"),
    phone: formData.get("phone"),
    items: items.map(({ id, quantity }) => ({ id, quantity })),
  });

  if (!result.ok) {
    return {
      ...emptyState,
      status: 422,
      message: "Please fix the highlighted fields.",
      fieldErrors: result.fieldErrors,
    };
  }

  const ownerId = await ensureSessionId();
  const order = createOrder(ownerId, result.value);

  revalidatePath("/orders");
  revalidatePath("/checkout");

  return {
    ...emptyState,
    status: 201,
    message: "Order placed successfully!",
    orderId: order.id,
  };
}

// Cancels an order. Checks: 401 no session -> 404 no such order ->
// 403 not the owner -> 409 not cancellable -> write.
export async function cancelOrder(prevState, formData) {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return { status: 401, message: "You need a session to cancel an order." };
  }

  const orderId = String(formData.get("orderId") ?? "");
  const order = getOrder(orderId);
  if (!order) {
    return { status: 404, message: `Order "${orderId}" not found.` };
  }

  if (order.ownerId !== sessionId) {
    return { status: 403, message: "You can only cancel your own orders." };
  }

  if (order.status !== "pending") {
    return { status: 409, message: `A ${order.status} order cannot be cancelled.` };
  }

  order.status = "cancelled";

  revalidatePath("/orders");
  return { status: 200, message: `Order #${order.id} cancelled.` };
}