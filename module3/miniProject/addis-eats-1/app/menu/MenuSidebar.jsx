"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "../lib/dishes";

export default function MenuSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "All";
  const categories = ["All", ...getCategories()];

  const [note, setNote] = useState("");
  const [clicks, setClicks] = useState(0);
  const [mountedAt, setMountedAt] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMountedAt(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    setClicks((c) => c + 1);

    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.set("page", "1");

    startTransition(() => {
      router.push(`/menu?${params.toString()}`);
    });
  };

  return (
    <aside className="menu-sidebar">
      <h2 className="sidebar-title">Browse</h2>

      <ul className="sidebar-categories">
        {categories.map((category) => {
          const isActive =
            category.toLowerCase() === currentCategory.toLowerCase();

          return (
            <li key={category}>
              <button
                type="button"
                className={isActive ? "sidebar-chip active" : "sidebar-chip"}
                onClick={() => handleCategoryClick(category)}
                aria-pressed={isActive}
              >
                {category}
              </button>
            </li>
          );
        })}
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
          Open a dish and come back — these three values do not change, because
          the layout never re-mounts.
        </p>
      </div>

      <Link href="/cart" className="sidebar-cart-link">
        Go to cart →
      </Link>
    </aside>
  );
}
