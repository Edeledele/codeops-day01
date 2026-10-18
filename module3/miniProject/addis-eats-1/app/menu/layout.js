import { Suspense } from "react";
import MenuSidebar from "./MenuSidebar";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-shell">
      <Suspense fallback={<aside className="menu-sidebar"><h2 className="sidebar-title">Browse</h2></aside>}>
        <MenuSidebar />
      </Suspense>

      <section className="menu-content">{children}</section>
    </div>
  );
}
