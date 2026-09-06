import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = window.sessionStorage?.getItem("addis-eats-user");
    const timer = setTimeout(() => {
      if (saved) setUser(JSON.parse(saved));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  function login(name) {
    const loggedInUser = { name };
    setUser(loggedInUser);
    window.sessionStorage?.setItem("addis-eats-user", JSON.stringify(loggedInUser));
  }

  function logout() {
    setUser(null);
    window.sessionStorage?.removeItem("addis-eats-user");
  }

  const value = { user, isAuthenticated: !!user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}