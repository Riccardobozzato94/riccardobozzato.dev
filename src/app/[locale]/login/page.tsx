"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { Eye, EyeOff, LogIn, AlertCircle, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already authenticated
  if (isAuthenticated) {
    router.replace(redirectTo);
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      router.replace(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[120px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="dots-login" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-login)" />
        </svg>
      </div>

      <div className="relative w-full max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
            <Sparkles className="size-3.5" />
            Client Area
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access the demo tools.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 space-y-5"
        >
          {error && (
            <div className="flex items-start gap-2.5 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
              className="w-full h-11 rounded-xl border border-border/50 bg-background px-4 text-sm
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
                placeholder:text-muted-foreground/40 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full h-11 rounded-xl border border-border/50 bg-background px-4 pr-11 text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
                  placeholder:text-muted-foreground/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-accent text-accent-foreground font-medium text-sm
              hover:bg-accent/90 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="size-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="size-4" />
                Sign In
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground/60 text-center">
            Demo credentials are provided upon engagement.
          </p>
        </form>
      </div>
    </div>
  );
}
