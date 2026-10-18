"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next") || "";

  // Mode: "signin" or "signup"
  const [mode, setMode] = useState("signin");

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign up fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);

  // Load saved accounts and last used email from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem("addis_saved_accounts") || "[]");
        if (Array.isArray(stored)) {
          setSavedAccounts(stored);
        }
        const last = localStorage.getItem("addis_last_email");
        if (last) {
          setEmail((prev) => prev || last);
        }
      } catch (e) {
        console.error("Error reading saved accounts from localStorage", e);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "signin" ? "/api/auth/login" : "/api/auth/signup";

      // Read current local accounts from localStorage for backup sync
      let localAccounts = [];
      if (typeof window !== "undefined") {
        try {
          localAccounts = JSON.parse(localStorage.getItem("addis_saved_accounts") || "[]");
        } catch {
          localAccounts = [];
        }
      }

      const payload =
        mode === "signin"
          ? {
              email: email.trim().toLowerCase(),
              password,
              next: nextParam,
              localAccounts,
            }
          : {
              name: (name || "").trim(),
              email: email.trim().toLowerCase(),
              password,
              phone: (phone || "").trim(),
              address: (address || "").trim(),
              next: nextParam,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || (mode === "signin" ? "Sign in failed." : "Sign up failed."));
      }

      // Persist account in localStorage so user can always log back in even across server restarts
      if (typeof window !== "undefined") {
        try {
          const currentList = JSON.parse(localStorage.getItem("addis_saved_accounts") || "[]");
          const userAccount = {
            name: mode === "signup" ? (name || "").trim() : data.user?.name || "Customer",
            email: email.trim().toLowerCase(),
            password,
            phone: mode === "signup" ? (phone || "").trim() : data.user?.phone || "",
            address: mode === "signup" ? (address || "").trim() : data.user?.address || "",
            role: data.user?.role || "customer",
          };

          const updated = [
            userAccount,
            ...currentList.filter(
              (a) => (a.email || "").toLowerCase() !== email.trim().toLowerCase()
            ),
          ];

          localStorage.setItem("addis_saved_accounts", JSON.stringify(updated));
          localStorage.setItem("addis_last_email", email.trim().toLowerCase());
        } catch (e) {
          console.error("Error saving account to localStorage", e);
        }
      }

      router.push(data.redirectUrl || "/account");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      {/* Tab Switcher between Sign In and Sign Up */}
      <div className="auth-tab-row" role="tablist" aria-label="Authentication modes">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signin"}
          className={`auth-tab-btn ${mode === "signin" ? "active" : ""}`}
          onClick={() => {
            setMode("signin");
            setError("");
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signup"}
          className={`auth-tab-btn ${mode === "signup" ? "active" : ""}`}
          onClick={() => {
            setMode("signup");
            setError("");
          }}
        >
          Sign Up
        </button>
      </div>

      <div className="login-header">
        <h2>{mode === "signin" ? "Sign In to Addis Eats" : "Create Your Account"}</h2>
        <p>
          {mode === "signin"
            ? "Access your orders, favorites, and fast delivery tracking."
            : "Sign up in seconds to start ordering fresh Ethiopian flavors."}
        </p>
      </div>

      {/* Saved Accounts Quick Fill (from localStorage) */}
      {savedAccounts.length > 0 && mode === "signin" && (
        <div className="saved-accounts-section">
          <span className="saved-accounts-title">Saved accounts on this device:</span>
          <div className="saved-accounts-list">
            {savedAccounts.slice(0, 3).map((acc) => (
              <button
                key={acc.email}
                type="button"
                className="saved-account-pill"
                onClick={() => {
                  setEmail(acc.email);
                  if (acc.password) setPassword(acc.password);
                  setError("");
                }}
              >
                <span>👤 {acc.name || acc.email}</span>
                <span>{acc.email} →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {nextParam && (
        <div className="login-notice">
          <span>Target destination:</span>
          <code>{nextParam}</code>
          <small>Validated against open redirect vulnerabilities</small>
        </div>
      )}

      {error && <div className="login-error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        {mode === "signup" && (
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="e.g. Abebe Bikila"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder={mode === "signup" ? "At least 6 characters" : "••••••••"}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={mode === "signup" ? 6 : undefined}
          />
        </div>

        {mode === "signup" && (
          <>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                placeholder="e.g. 0911234567"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <input
                id="address"
                type="text"
                value={address}
                placeholder="e.g. Bole Medhanialem, House 412"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </>
        )}

        <button type="submit" className="primary-btn login-submit-btn" disabled={loading}>
          {loading
            ? mode === "signin"
              ? "Signing in..."
              : "Creating account..."
            : mode === "signin"
            ? "Sign In →"
            : "Sign Up & Start Ordering →"}
        </button>
      </form>

      <div className="auth-toggle-footer">
        {mode === "signin" ? (
          <p>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => {
                setMode("signup");
                setError("");
              }}
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => {
                setMode("signin");
                setError("");
              }}
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
