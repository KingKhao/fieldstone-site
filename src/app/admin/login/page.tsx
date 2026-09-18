"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE_NAME } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="font-serif text-lg text-charcoal">{SITE_NAME}</p>
          <h1 className="mt-1 font-serif text-2xl text-charcoal">Admin Login</h1>
        </div>

        <form
          className="mt-8 space-y-4 rounded-2xl border border-stone-line bg-white p-6 shadow-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            setError(null);
            try {
              const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
              });
              const data = await res.json();
              if (!res.ok) {
                setError(data.error || "Login failed.");
                return;
              }
              router.push("/admin");
              router.refresh();
            } catch {
              setError("Network error. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-charcoal">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-md border border-stone-line bg-white px-4 py-2.5 text-charcoal focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-charcoal">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-md border border-stone-line bg-white px-4 py-2.5 pr-16 text-charcoal focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-charcoal-muted hover:text-clay-dark"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-error" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-clay px-6 py-2.5 font-semibold text-paper transition-colors hover:bg-clay-dark disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
