"use client";

import { useState } from "react";

export default function MenuCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="menu-counter">
      <p>
        Sidebar views: <strong>{count}</strong>
      </p>

      <button
        type="button"
        className="menu-counter-button"
        onClick={() => setCount((current) => current + 1)}
      >
        + Increment
      </button>
    </div>
  );
}