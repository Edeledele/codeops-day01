"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountClient({ user, orders }) {
  const router = useRouter();
  const [localOrders, setLocalOrders] = useState(orders);
  const [statusMessage, setStatusMessage] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const handleCancelOrder = async (orderId) => {
    setStatusMessage(null);
    setLoadingAction(true);
    try {
      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to cancel order.");
      }

      setStatusMessage({ type: "success", text: data.message });
      setLocalOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o))
      );
    } catch (err) {
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setLoadingAction(false);
    }
  };

  const handleTestIdorAttack = async () => {
    setStatusMessage(null);
    setLoadingAction(true);
    try {
      // Attempting to cancel Bethlehem's order (ord-102) while logged in as Abebe
      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: "ord-102" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatusMessage({
          type: "attack-blocked",
          text: `🛡️ ATTACK BLOCKED [HTTP ${res.status}]: ${data.error}`,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: "Vulnerability warning: order cancellation succeeded unexpectedly.",
        });
      }
    } catch (err) {
      setStatusMessage({ type: "attack-blocked", text: `🛡️ Attack Blocked: ${err.message}` });
    } finally {
      setLoadingAction(false);
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
    <div className="account-container">
      {/* Account Profile Header */}
      <section className="account-card profile-card">
        <div className="profile-header-row">
          <div>
            <span className="user-role-badge">{user.role.toUpperCase()} ACCOUNT</span>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email} · 📞 {user.phone}</p>
          </div>
          <button type="button" className="signout-btn" onClick={handleLogout}>
            Sign Out 🚪
          </button>
        </div>

        <div className="profile-info-grid">
          <div className="info-item">
            <span className="info-label">DEFAULT DELIVERY ADDRESS</span>
            <p className="info-val">{user.address}</p>
          </div>
          <div className="info-item">
            <span className="info-label">SESSION USER ID</span>
            <code className="info-code">{user.id}</code>
          </div>
        </div>
      </section>

      {/* Status Messages */}
      {statusMessage && (
        <div
          className={`account-message-banner ${
            statusMessage.type === "success"
              ? "banner-success"
              : statusMessage.type === "attack-blocked"
              ? "banner-blocked"
              : "banner-error"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Scoped Orders List */}
      <section className="account-card orders-card">
        <div className="orders-header-row">
          <div>
            <h2>Your Order History</h2>
            <p className="scoped-note">
              🔒 <strong>Query Scoped:</strong> Only orders belonging to session ID{" "}
              <code>{user.id}</code> are loaded from the database.
            </p>
          </div>
          <Link href="/menu" className="primary-btn new-order-btn">
            + New Order
          </Link>
        </div>

        {localOrders.length === 0 ? (
          <div className="no-orders-box">
            <p>You haven&apos;t placed any orders yet.</p>
            <Link href="/menu" className="secondary-btn">Browse Menu</Link>
          </div>
        ) : (
          <div className="orders-table-wrapper">
            <table className="account-orders-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {localOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link href={`/orders/${order.id}`} className="order-link">
                        #{order.id}
                      </Link>
                    </td>
                    <td>
                      {order.items?.map((it) => `${it.quantity}x ${it.name}`).join(", ")}
                    </td>
                    <td>{order.total} ETB</td>
                    <td>
                      <span className={`status-pill pill-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link href={`/orders/${order.id}`} className="view-link">
                          Track Live →
                        </Link>
                        {order.status !== "cancelled" && order.status !== "delivered" && (
                          <button
                            type="button"
                            className="cancel-btn"
                            disabled={loadingAction}
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Live Security Verification & Attack Simulation */}
      <section className="account-card security-sandbox-card">
        <h3>🛡️ Live Security Verification Suite</h3>
        <p className="sandbox-desc">
          Test active defenses against your own session in real time:
        </p>
        <div className="sandbox-actions">
          <div className="sandbox-item">
            <div>
              <strong>1. Test IDOR Write Attack</strong>
              <p>Attempt to cancel Order #ord-102 (owned by Bethlehem Assefa) using your session.</p>
            </div>
            <button
              type="button"
              className="danger-btn"
              disabled={loadingAction}
              onClick={handleTestIdorAttack}
            >
              Simulate IDOR Attack
            </button>
          </div>

          <div className="sandbox-item">
            <div>
              <strong>2. Test Staff Route Protection</strong>
              <p>Try visiting `/staff` while logged in as a standard customer.</p>
            </div>
            <Link href="/staff" className="secondary-btn">
              Attempt /staff Access
            </Link>
          </div>

          <div className="sandbox-item">
            <div>
              <strong>3. Test Open Redirect Protection</strong>
              <p>Attempt signing in with an external destination parameter.</p>
            </div>
            <a
              href="/login?next=https://evil-phishing-site.com"
              className="secondary-btn"
            >
              Test `?next=https://evil.com`
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
