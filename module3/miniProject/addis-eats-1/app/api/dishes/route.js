import { getPagedDishes } from "../../lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 4;
  const category = searchParams.get("category") || "All";

  try {
    const data = await getPagedDishes({ page, limit, category });
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to load dishes", details: error.message },
      { status: 500 }
    );
  }
}
