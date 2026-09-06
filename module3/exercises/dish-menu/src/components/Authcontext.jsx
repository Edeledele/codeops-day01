import { createContext, useState, useMemo, useCallback } from "react";

export const AuthContext = createContext({
  isAuthed: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);

  const login = useCallback(() => setIsAuthed(true), []);
  const logout = useCallback(() => setIsAuthed(false), []);

  const value = useMemo(() => ({ isAuthed, login, logout }), [isAuthed, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}