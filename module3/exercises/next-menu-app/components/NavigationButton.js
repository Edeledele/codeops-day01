"use client";

import { useRouter } from "next/navigation";

export default function NavigationButton() {
  const router = useRouter();

  function goToCheckout() {
    router.push("/checkout");
  }

  return (
    <button onClick={goToCheckout}>
      Go to Checkout
    </button>
  );
}