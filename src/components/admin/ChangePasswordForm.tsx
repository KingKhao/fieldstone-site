"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const field =
    "w-full rounded-md border border-stone-line bg-white px-3 py-2 text-sm text-charcoal focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

  return (
    <form
      className="rounded-xl border border-stone-line bg-white p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setDone(false);
        const res = await fetch("/api/admin/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
        setSaving(false);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data.error || "Something went wrong.");
          return;
        }
        setCurrentPassword("");
        setNewPassword("");
        setDone(true);
      }}
    >
      <h2 className="font-serif text-lg text-charcoal">Change password</h2>
      <div className="mt-4 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Current password</label>
          <input type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={field} autoComplete="current-password" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">New password</label>
          <input type="password" required minLength={10} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={field} autoComplete="new-password" />
          <p className="mt-1 text-xs text-charcoal-muted">At least 10 characters.</p>
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-error">{error}</p>}
      {done && <p className="mt-3 text-sm text-clay-dark">Password updated.</p>}
      <button type="submit" disabled={saving} className="mt-4 rounded-full bg-clay px-5 py-2 text-sm font-semibold text-paper hover:bg-clay-dark disabled:opacity-50">
        {saving ? "Updating…" : "Update Password"}
      </button>
    </form>
  );
}
