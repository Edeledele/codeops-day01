import Link from "next/link";
import { getSession } from "./lib/auth";
import Providers from "./providers";
import NavbarCartLink from "./components/NavbarCartLink";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://addis-eats.vercel.app"),
  title: {
    default: "Addis Eats · Authentic Ethiopian Food",
    template: "%s · Addis Eats",
  },
  description:
    "Authentic Ethiopian dining delivered fresh across Addis Ababa. Order Kitfo, Doro Wot, Shiro, and more with live real-time delivery tracking.",
  openGraph: {
    title: "Addis Eats · Authentic Ethiopian Food",
    description:
      "Taste the heart of Addis. Traditional flavors, fast delivery, and real-time order tracking.",
    type: "website",
    siteName: "Addis Eats",
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats · Authentic Ethiopian Food",
    description: "Authentic Ethiopian dishes delivered fresh with live tracking.",
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <Providers>
          <header>
            <nav className="navbar">
              <Link href="/" className="logo">
                Addis Eats
              </Link>

              <div className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/orders">Track Order</Link>

                {session?.user ? (
                  <>
                    <Link href="/account">
                      Account ({session.user.name.split(" ")[0]})
                    </Link>
                    {session.user.role === "staff" && (
                      <Link href="/staff">Staff</Link>
                    )}
                    <a href="/api/auth/logout" className="nav-signout-link">
                      Sign Out
                    </a>
                  </>
                ) : (
                  <>
                    <Link href="/login">Sign In</Link>
                  </>
                )}

                <NavbarCartLink />
              </div>
            </nav>
          </header>

          {children}

          <footer className="footer">
            <p>
              © 2026 <strong>Addis Eats</strong> — Ethiopian food, delivered with
              love.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
