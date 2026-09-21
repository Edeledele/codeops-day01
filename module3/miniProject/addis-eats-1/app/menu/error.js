"use client";

export default function Error({ reset }) {
  return (
    <main className="status-page">
      <h1>Oops!</h1>

      <p>
        Something went wrong while loading the menu.
      </p>

      <button
        className="primary-btn"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </main>
  );
}