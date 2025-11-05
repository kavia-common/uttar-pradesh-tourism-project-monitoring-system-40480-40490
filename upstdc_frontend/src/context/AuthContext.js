import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAccessToken, clearTokens } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getAccessToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToken(getAccessToken());
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      refreshAuth: () => setToken(getAccessToken()),
      signOut: () => {
        clearTokens();
        setToken(null);
      },
    }),
    [token]
  );

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth state and actions. */
  return useContext(AuthContext);
}
