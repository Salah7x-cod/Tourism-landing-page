import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);
const TOKEN_KEY = "tourism_auth_token";
const USER_KEY = "tourism_auth_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .me(token)
      .then((nextUser) => {
        setUser(nextUser);
        localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token]);

  const setSession = (authPayload) => {
    setToken(authPayload.access_token);
    setUser(authPayload.user);
    localStorage.setItem(TOKEN_KEY, authPayload.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(authPayload.user));
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(user),
      login: async (credentials) => {
        const result = await api.login(credentials);
        setSession(result);
        return result;
      },
      register: async (payload) => {
        const result = await api.register(payload);
        setSession(result);
        return result;
      },
      logout,
    }),
    [token, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
