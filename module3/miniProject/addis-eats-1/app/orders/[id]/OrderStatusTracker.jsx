"use client";

import OrderStatusHeader from "./OrderStatusHeader";
import OrderTimelineAndDetails from "./OrderTimelineAndDetails";

export default function OrderStatusTracker({ orderId, fallbackOrder }) {
  return (
    <div className="order-tracker-wrapper">
      <OrderStatusHeader orderId={orderId} fallbackOrder={fallbackOrder} />
      <OrderTimelineAndDetails orderId={orderId} fallbackOrder={fallbackOrder} />
    </div>
  );
}
