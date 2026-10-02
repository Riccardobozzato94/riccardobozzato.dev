"use client";

import { useState, useCallback } from "react";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * ⚠️ SECURITY NOTE: JWT stored in localStorage.
 *
 * This is acceptable for a personal/admin-only dashboard with low-value
 * credentials. For production with multiple users, migrate to httpOnly
 * cookies to prevent XSS-based token exfiltration.
 *
 * The token expires in 24h and the admin panel is used exclusively by the
 * site owner — the risk is understood and accepted.
 */
const TOKEN_KEY = "rbz_token";

export function useAuth() {
  // Lazy initializer reads localStorage during render instead of in an
  // effect: no cascading render, correct value on first client paint.
  // Server renders isLoading:true; client hydrates with the stored token.
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === "undefined") {
      return { token: null, isAuthenticated: false, isLoading: true };
    }
    const token = localStorage.getItem(TOKEN_KEY);
    return { token, isAuthenticated: !!token, isLoading: false };
  });

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "Login failed" }));
      throw new Error(data.error || "Login failed");
    }

    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setState({ token: data.token, isAuthenticated: true, isLoading: false });
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setState({ token: null, isAuthenticated: false, isLoading: false });
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> => {
    if (!state.token) return { "X-Auth": "none" };
    return { Authorization: `Bearer ${state.token}` };
  }, [state.token]);

  const getFetchInit = useCallback(
    (extra: Record<string, unknown> = {}): RequestInit => {
      return {
        headers: {
          "Content-Type": "application/json",
          ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
        },
        ...extra,
      } as RequestInit;
    },
    [state.token],
  );

  return { ...state, login, logout, getAuthHeaders, getFetchInit };
}
