import Link from "next/link";

export const metadata = {
  title: "Unauthorized Access · Addis Eats",
};

export default function UnauthorizedPage() {
  return (
    <main className="unauthorized-page">
      <div className="unauthorized-card">
        <span className="unauthorized-icon">🚫</span>
        <h1>403 · Access Denied</h1>
        <p>
          You do not have the required staff permissions to access this internal
          dashboard.
        </p>
        <div className="unauthorized-actions">
          <Link href="/account" className="primary-btn">
            Go to My Account
          </Link>
          <Link href="/login" className="secondary-btn">
            Sign In with Staff Account
          </Link>
        </div>
      </div>
    </main>
  );
}
