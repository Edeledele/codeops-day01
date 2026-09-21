import MenuSidebar from "./MenuSidebar";


export default function MenuLayout({ children }) {
    return (
        <div className="menu-shell">
            <MenuSidebar />

            <section className="menu-content">{children}</section>
        </div>
    );
}