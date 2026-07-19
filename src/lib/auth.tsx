import { createContext, useContext, ReactNode } from "react";

// Stub — Legacy Panel auth lives on the self-hosted VPS backend, not in this preview.
const AuthContext = createContext<{ user: null }>({ user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={{ user: null }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
