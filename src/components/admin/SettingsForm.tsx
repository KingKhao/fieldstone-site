"use client";

import { useState } from "react";
import type { HomeContentSetting } from "@/lib/settings";

export default function SettingsForm({ initial }: { initial: HomeContentSetting }) {
  const [home, setHome] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const field =
    "w-full rounded-md border border-stone-line bg-white px-3 py-2 text-sm text-charcoal focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

  const set = (key: keyof HomeContentSetting) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setHome((h) => ({ ...h, [key]: e.target.value }));

  return (
    <form
      className="rounded-xl border border-stone-line bg-white p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await fetch("/api/admin/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ home }),
        });
        setSaving(false);
        setSavedAt(Date.now());
      }}
    >
      <h2 className="font-serif text-lg text-charcoal">Homepage content</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Hero eyebrow</label>
          <input value={home.heroEyebrow} onChange={set("heroEyebrow")} className={field} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Hero title</label>
          <input value={home.heroTitle} onChange={set("heroTitle")} className={field} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Hero subtitle</label>
          <textarea value={home.heroSubtitle} onChange={set("heroSubtitle")} rows={3} className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Phone</label>
            <input value={home.phone} onChange={set("phone")} className={field} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Email</label>
            <input value={home.email} onChange={set("email")} className={field} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Address</label>
            <input value={home.address} onChange={set("address")} className={field} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">License number</label>
            <input value={home.licenseNumber} onChange={set("licenseNumber")} className={field} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Years in business</label>
            <input value={home.yearsInBusiness} onChange={set("yearsInBusiness")} className={field} />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button type="submit" disabled={saving} className="rounded-full bg-clay px-5 py-2 text-sm font-semibold text-paper hover:bg-clay-dark disabled:opacity-50">
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {savedAt && <span className="text-xs text-charcoal-muted">Saved.</span>}
      </div>
    </form>
  );
}
