import { dishes } from "../../menu/dishes";

// GET /api/dishes -> the full menu as JSON
export async function GET() {
  return Response.json(dishes);
}