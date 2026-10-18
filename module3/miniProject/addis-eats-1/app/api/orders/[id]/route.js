import { getOrder, advanceOrderStatus, resetOrderStatus } from "../../../lib/orders";

export async function GET(request, { params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return Response.json(
      { error: "Order not found", id },
      { status: 404 }
    );
  }

  return Response.json(order);
}

export async function POST(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const action = body.action || "advance";

  let updatedOrder;
  if (action === "reset") {
    updatedOrder = await resetOrderStatus(id);
  } else {
    updatedOrder = await advanceOrderStatus(id);
  }

  if (!updatedOrder) {
    return Response.json(
      { error: "Order not found", id },
      { status: 404 }
    );
  }

  return Response.json(updatedOrder);
}
