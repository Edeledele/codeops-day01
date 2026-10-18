"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StaffClient({ staffUser, allOrders }) {
  const router = useRouter();
  const [orders, setOrders] = useState(allOrders);
  const [loadingId, setLoadingId] = useState(null);

  const handleAdvance = async (orderId) => {
    setLoadingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "advance" }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: data.status } : o))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="staff-container">
      {/* Staff Header */}
      <section className="staff-card staff-header-card">
        <div className="staff-header-row">
          <div>
            <span className="staff-role-pill">STAFF ONLY · KITCHEN DISPATCH</span>
            <h1>Addis Eats Staff Dashboard</h1>
            <p>
              Signed in as: <strong>{staffUser.name}</strong> ({staffUser.email})
            </p>
          </div>
          <button type="button" className="signout-btn" onClick={handleLogout}>
            Staff Sign Out 🚪
          </button>
        </div>
      </section>

      {/* Orders Dispatch Board */}
      <section className="staff-card">
        <div className="board-header">
          <h2>Active Kitchen & Dispatch Queue ({orders.length} orders)</h2>
          <p className="staff-sub">
            🔒 Only authorized staff members can access this screen and transition order statuses.
          </p>
        </div>

        <div className="staff-orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="staff-order-box">
              <div className="order-box-top">
                <span className="order-box-id">#{order.id}</span>
                <span className={`status-pill pill-${order.status}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-box-customer">
                <strong>{order.customerName}</strong>
                <span>📞 {order.phone}</span>
                <p className="order-box-address">📍 {order.deliveryAddress}</p>
              </div>

              <div className="order-box-items">
                {order.items?.map((it, idx) => (
                  <div key={idx} className="staff-item-row">
                    <span>{it.quantity}x {it.name}</span>
                    <span>{it.price * it.quantity} ETB</span>
                  </div>
                ))}
              </div>

              <div className="order-box-total">
                <span>Total</span>
                <strong>{order.total} ETB</strong>
              </div>

              <div className="order-box-actions">
                <button
                  type="button"
                  className="primary-btn advance-stage-btn"
                  disabled={loadingId === order.id || order.status === "delivered"}
                  onClick={() => handleAdvance(order.id)}
                >
                  {loadingId === order.id ? "Updating..." : "Advance Status ⚡"}
                </button>
                <Link href={`/orders/${order.id}`} className="view-link">
                  Open Tracker →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
