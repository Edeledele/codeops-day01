import { searchDishes } from "../../../lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  try {
    const data = await searchDishes(q);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Search failed", details: error.message },
      { status: 500 }
    );
  }
}
