"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TrackOrderClient({ user, userOrders }) {
  const router = useRouter();
  const [searchId, setSearchId] = useState("");
  const [recentOrderId, setRecentOrderId] = useState(null);
  const [lookupError, setLookupError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("addis_latest_order_id");
      if (saved) {
        const timer = setTimeout(() => {
          setRecentOrderId(saved);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleLookup = (e) => {
    e.preventDefault();
    setLookupError("");
    const cleaned = searchId.trim();
    if (!cleaned) {
      setLookupError("Please enter an Order ID.");
      return;
    }
    router.push(`/orders/${cleaned}`);
  };

  return (
    <div className="track-order-shell">
      {/* Header */}
      <section className="page-header" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1>Track Your Order</h1>
        <p>Monitor kitchen preparation, chef dispatch, and live courier delivery in real time.</p>
      </section>

      {/* Order Lookup Card */}
      <div className="track-lookup-card">
        <h2>Enter Your Order ID</h2>
        <p className="track-lookup-desc">
          Have an Order ID from your confirmation? Enter it below to follow live status updates.
        </p>

        <form onSubmit={handleLookup} className="track-lookup-form">
          <input
            type="text"
            className="track-lookup-input"
            value={searchId}
            placeholder="e.g. ord-101"
            onChange={(e) => setSearchId(e.target.value)}
            aria-label="Order ID to track"
          />
          <button type="submit" className="primary-btn track-lookup-btn">
            Track Order →
          </button>
        </form>

        {lookupError && <p className="track-lookup-error">{lookupError}</p>}

        {recentOrderId && (
          <div className="recent-order-pill-box">
            <span>Recent order found:</span>
            <Link href={`/orders/${recentOrderId}`} className="recent-order-link">
              Track Order #{recentOrderId} →
            </Link>
          </div>
        )}
      </div>

      {/* Authenticated User Orders */}
      {user && userOrders && userOrders.length > 0 ? (
        <div className="user-active-orders-section">
          <h2>Your Orders ({userOrders.length})</h2>
          <div className="orders-track-grid">
            {userOrders.map((order) => (
              <article key={order.id} className="order-track-card">
                <div className="order-track-card-top">
                  <div>
                    <span className="order-track-id">#{order.id}</span>
                    <span className="order-track-date">
                      {order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                  <span className={`status-pill status-${order.status || "received"}`}>
                    {(order.status || "received").replace(/_/g, " ").toUpperCase()}
                  </span>
                </div>

                <div className="order-track-items">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((it, idx) => (
                      <span key={idx} className="track-item-pill">
                        {it.name} × {it.quantity || 1}
                      </span>
                    ))
                  ) : (
                    <span>Addis Eats Specialty Dishes</span>
                  )}
                </div>

                <div className="order-track-bottom">
                  <div>
                    <span className="order-track-total">{order.total} ETB</span>
                    <p className="order-track-address">📍 {order.deliveryAddress}</p>
                  </div>
                  <Link href={`/orders/${order.id}`} className="primary-btn track-cta-btn">
                    Live Tracking →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        /* Empty / No Order State */
        <div className="no-order-state-card">
          <div className="no-order-icon">🛵</div>
          <h2>No Active Order in Progress</h2>
          <p>
            You haven&apos;t placed any orders yet. Explore our authentic Ethiopian menu to order Kitfo,
            Doro Wot, Shiro, and more with live delivery tracking.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "18px" }}>
            <Link href="/menu" className="primary-btn">
              Browse Menu &amp; Order
            </Link>
            {!user && (
              <Link href="/login" className="secondary-btn">
                Sign In to View Past Orders
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
