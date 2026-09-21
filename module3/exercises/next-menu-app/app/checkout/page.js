import { cookies } from "next/headers";
import CheckoutClient from "./CheckoutClient";

// Reading cookies() is a Request-time API: it can only be resolved per
// request, so this turns the checkout route from static into dynamic.
// Watch its marker change from "○ Static" to "ƒ Dynamic" in the
// `next build` output after this change.
export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const promoCode = cookieStore.get("promo")?.value ?? null;

  return <CheckoutClient promoCode={promoCode} />;
}