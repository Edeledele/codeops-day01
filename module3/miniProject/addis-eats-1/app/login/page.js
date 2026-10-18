import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "../lib/auth";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign In · Addis Eats",
  description: "Sign in to Addis Eats for delivery tracking and orders.",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session?.user) {
    redirect(session.user.role === "staff" ? "/staff" : "/account");
  }

  return (
    <main className="login-page">
      <Suspense fallback={<div className="login-card">Loading sign in...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
