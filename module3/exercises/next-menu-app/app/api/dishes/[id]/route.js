import { getDishById } from "../../../menu/dishes";
import { errorResponse } from "../../../../lib/errors";

// GET /api/dishes/:id -> one dish, or 404 with the standard error shape
export async function GET(request, { params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return errorResponse(404, `Dish "${id}" not found.`);
  }
  return Response.json(dish);
}