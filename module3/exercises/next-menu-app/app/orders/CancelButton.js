"use client";

import { useActionState } from "react";
import { cancelOrder } from "../checkout/actions";

export default function CancelButton({ orderId }) {
  const [state, formAction, isPending] = useActionState(cancelOrder, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="orderId" value={orderId} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Cancelling..." : "Cancel order"}
      </button>
      {state && state.status !== 200 && (
        <p role="alert" style={{ color: "crimson" }}>
          {state.message}
        </p>
      )}
    </form>
  );
}