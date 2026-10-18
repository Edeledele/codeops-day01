import { createOrder } from "../../lib/orders";
import { getSession } from "../../lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const session = await getSession();

    const {
      customerName,
      phone,
      deliveryAddress,
      deliveryZone,
      items,
      subtotal,
      total,
    } = body;

    if (!items || !items.length) {
      return Response.json(
        { error: "Cannot create order with an empty cart." },
        { status: 400 }
      );
    }

    const orderData = {
      userId: session?.user?.id || null,
      customerName: customerName || session?.user?.name || "Customer",
      phone: phone || session?.user?.phone || "0911000000",
      deliveryAddress: deliveryAddress || session?.user?.address || "Addis Ababa",
      deliveryZone: deliveryZone || "Addis Ababa",
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      subtotal: subtotal || 0,
      total: total || (subtotal || 0) + 50,
    };

    const newOrder = await createOrder(orderData);

    return Response.json({
      success: true,
      order: newOrder,
      redirectUrl: `/orders/${newOrder.id}`,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to place order.", details: error.message },
      { status: 500 }
    );
  }
}
