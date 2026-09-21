import { CategoryFilterProvider } from "./menuFilterContext";
import CategorySidebar from "./CategorySidebar";
import MenuCounter from "./MenuCounter";

// This layout wraps every route under /menu, including /menu/[id].
// It must NOT render <html> or <body> - only the root layout owns those.
export default function MenuLayout({ children }) {
  return (
    <CategoryFilterProvider>
      <div className="menu-layout">
        <aside className="menu-sidebar">
          <CategorySidebar />
          <MenuCounter />
        </aside>

        <div className="menu-content">{children}</div>
      </div>
    </CategoryFilterProvider>
  );
}