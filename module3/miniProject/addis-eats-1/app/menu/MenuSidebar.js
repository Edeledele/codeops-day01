"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../lib/dishes";


export default function MenuSidebar() {
  const categories = getCategories();

  const [activeCategory, setActiveCategory] = useState("All");
  const [note, setNote] = useState("");
  const [clicks, setClicks] = useState(0);

  const [mountedAt, setMountedAt] = useState(null);

  useEffect(() => {
    setMountedAt(new Date().toLocaleTimeString("en-GB", { hour12: false }));
  }, []);

  return (
    <aside className="menu-sidebar">
      <h2 className="sidebar-title">Browse</h2>

      <ul className="sidebar-categories">
        {["All", ...categories].map((category) => (
          <li key={category}>
            <button
              type="button"
              className={
                category === activeCategory
                  ? "sidebar-chip active"
                  : "sidebar-chip"
              }
              onClick={() => {
                setActiveCategory(category);
                setClicks((c) => c + 1);
              }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar-note">
        <label htmlFor="kitchen-note">Note for the kitchen</label>

        <input
          id="kitchen-note"
          type="text"
          value={note}
          placeholder="Extra berbere, please"
          onChange={(event) => setNote(event.target.value)}
        />
      </div>

      <div className="sidebar-proof">
        <p className="sidebar-proof-title">Sidebar state</p>

        <p>
          Mounted at <strong>{mountedAt ?? "—"}</strong>
        </p>

        <p>
          Filter clicks: <strong>{clicks}</strong>
        </p>

        <p>
          Note kept: <strong>{note ? `"${note}"` : "—"}</strong>
        </p>

        <p className="sidebar-hint">
          Open a dish and come back — these three values do not change,
          because the layout never re-mounts.
        </p>
      </div>

      <Link href="/cart" className="sidebar-cart-link">
        Go to cart →
      </Link>
    </aside>
  );
}