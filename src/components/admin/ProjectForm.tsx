"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["KITCHEN", "BATHROOM", "ADDITION", "WHOLE_HOME", "OTHER"];

export default function ProjectForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("KITCHEN");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [beforeImage, setBeforeImage] = useState("/images/kitchen-before.jpg");
  const [afterImage, setAfterImage] = useState("/images/kitchen-after.jpg");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const field =
    "w-full rounded-md border border-stone-line bg-white px-3 py-2 text-sm text-charcoal focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-clay-dark"
      >
        + Add Project
      </button>
    );
  }

  return (
    <form
      className="rounded-xl border border-stone-line bg-white p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, category, location, description, beforeImage, afterImage }),
        });
        setSaving(false);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || "Something went wrong.");
          return;
        }
        setTitle("");
        setLocation("");
        setDescription("");
        setOpen(false);
        router.refresh();
      }}
    >
      <h3 className="font-serif text-lg text-charcoal">New gallery project</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={field} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className={field} placeholder="e.g. West Knoxville" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} className={field} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Before image path</label>
          <input required value={beforeImage} onChange={(e) => setBeforeImage(e.target.value)} className={field} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">After image path</label>
          <input required value={afterImage} onChange={(e) => setAfterImage(e.target.value)} className={field} />
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-error">{error}</p>}
      <div className="mt-4 flex gap-2">
        <button type="submit" disabled={saving} className="rounded-full bg-clay px-5 py-2 text-sm font-semibold text-paper hover:bg-clay-dark disabled:opacity-50">
          {saving ? "Saving…" : "Save Project"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-stone-line px-5 py-2 text-sm font-semibold text-charcoal hover:bg-stone">
          Cancel
        </button>
      </div>
    </form>
  );
}
