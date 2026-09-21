import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <h1>404</h1>

      <p>
        Sorry, we couldn't find that page.
      </p>

      <Link href="/" className="primary-btn">
        Back to Home
      </Link>
    </main>
  );
}