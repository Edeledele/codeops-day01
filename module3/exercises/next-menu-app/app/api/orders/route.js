import { revalidatePath } from "next/cache";
import { errorResponse } from "../../../lib/errors";
import { createOrder, validateOrder } from "../../../lib/orders";
import { ensureSessionId } from "../../../lib/session";

// POST /api/orders
// 201 -> created order | 400 -> body is not valid JSON | 422 -> fieldErrors
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "Request body must be valid JSON.");
  }

  const result = validateOrder(body);
  if (!result.ok) {
    return errorResponse(422, "Validation failed.", result.fieldErrors);
  }

  const ownerId = await ensureSessionId();
  const order = createOrder(ownerId, result.value);

  revalidatePath("/orders");
  return Response.json(order, { status: 201 });
}