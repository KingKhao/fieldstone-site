"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestimonialForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [quote, setQuote] = useState("");
  const [saving, setSaving] = useState(false);

  const field =
    "w-full rounded-md border border-stone-line bg-white px-3 py-2 text-sm text-charcoal focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-clay-dark">
        + Add Testimonial
      </button>
    );
  }

  return (
    <form
      className="rounded-xl border border-stone-line bg-white p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, location, quote }),
        });
        setSaving(false);
        setName("");
        setLocation("");
        setQuote("");
        setOpen(false);
        router.refresh();
      }}
    >
      <h3 className="font-serif text-lg text-charcoal">New testimonial</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className={field} />
        </div>
      </div>
      <div className="mt-3">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Quote</label>
        <textarea required value={quote} onChange={(e) => setQuote(e.target.value)} rows={3} className={field} />
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" disabled={saving} className="rounded-full bg-clay px-5 py-2 text-sm font-semibold text-paper hover:bg-clay-dark disabled:opacity-50">
          {saving ? "Saving…" : "Save Testimonial"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-stone-line px-5 py-2 text-sm font-semibold text-charcoal hover:bg-stone">
          Cancel
        </button>
      </div>
    </form>
  );
}
