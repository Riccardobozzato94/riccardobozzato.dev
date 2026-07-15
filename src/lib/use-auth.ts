"use client";

import { useState, useEffect, useCallback } from "react";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const TOKEN_KEY = "rbz_token";

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    setState({
      token,
      isAuthenticated: !!token,
      isLoading: false,
    });
  }, []);

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
