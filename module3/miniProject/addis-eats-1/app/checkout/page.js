import { cookies, headers } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const headerList = await headers();

  const deliveryZone =
    cookieStore.get("delivery-zone")?.value ??
    (headerList.get("x-forwarded-for") ? "Addis Ababa" : "Bole, Addis Ababa");

  const quotedAt = new Date().toLocaleTimeString("en-GB", { hour12: false });

  return <CheckoutForm deliveryZone={deliveryZone} quotedAt={quotedAt} />;
}
