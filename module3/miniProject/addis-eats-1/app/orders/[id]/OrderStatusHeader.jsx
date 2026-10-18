"use client";

import useSWR from "swr";
import fetcher from "../../lib/fetcher";

/**
 * Component 1 requesting /api/orders/${orderId}
 * Proves that multiple components sharing the same key share cache
 * and trigger only 1 network request per polling interval.
 */
export default function OrderStatusHeader({ orderId, fallbackOrder }) {
  const { data: order, mutate } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData: fallbackOrder,
      refreshInterval: 5000,
    }
  );

  const currentOrder = order || fallbackOrder;

  const handleAdvance = async () => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "advance" }),
      });
      // Immediately revalidate to reflect simulated status update
      mutate();
    } catch (err) {
      console.error("Failed to advance order status", err);
    }
  };

  const handleReset = async () => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      mutate();
    } catch (err) {
      console.error("Failed to reset order status", err);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "received":
        return "badge-received";
      case "preparing":
        return "badge-preparing";
      case "out_for_delivery":
        return "badge-transit";
      case "delivered":
        return "badge-delivered";
      default:
        return "badge-default";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "received":
        return "Order Received";
      case "preparing":
        return "Kitchen Preparing";
      case "out_for_delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  return (
    <header className="order-status-header">
      <div className="order-header-top">
        <div>
          <div className="order-tag-row">
            <span className="order-id-tag">Order #{currentOrder.id}</span>
            <span className={`order-status-pill ${getStatusBadgeClass(currentOrder.status)}`}>
              <span className="status-dot-pulse" />
              {getStatusLabel(currentOrder.status)}
            </span>
          </div>
          <h1 className="order-page-title">Live Order Tracker</h1>
          <p className="order-recipient-subtitle">
            Customer: <strong>{currentOrder.customerName}</strong> · Zone:{" "}
            <strong>{currentOrder.deliveryZone}</strong>
          </p>
        </div>

        <div className="order-header-actions">
          <div className="poll-badge" title="SWR polls this key every 5 seconds">
            <span className="pulse-indicator" />
            <span>Polling every 5s (Poll count: {currentOrder.pollCount || 1})</span>
          </div>

          <div className="sim-buttons">
            <button
              type="button"
              className="sim-advance-btn"
              onClick={handleAdvance}
              title="Advances status to test live polling"
            >
              ⚡ Simulate Next Stage
            </button>
            <button
              type="button"
              className="sim-reset-btn"
              onClick={handleReset}
              title="Reset order status to received"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
