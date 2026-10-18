import { getSession } from "../../../lib/auth";
import { cancelOrderWithOwnershipCheck } from "../../../lib/orders";

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return Response.json(
        { error: "Unauthorized: Please sign in first." },
        { status: 401 }
      );
    }

    const { orderId } = await request.json();
    if (!orderId) {
      return Response.json({ error: "orderId is required." }, { status: 400 });
    }

    // Both session AND ownership are checked inside cancelOrderWithOwnershipCheck
    const updatedOrder = await cancelOrderWithOwnershipCheck(orderId, session.user);

    return Response.json({
      success: true,
      message: `Order #${orderId} successfully cancelled.`,
      order: updatedOrder,
    });
  } catch (error) {
    const isForbidden = error.message.includes("Forbidden");
    const isNotFound = error.message.includes("Not Found");
    const status = isForbidden ? 403 : isNotFound ? 404 : 500;

    return Response.json(
      { error: error.message },
      { status }
    );
  }
}
