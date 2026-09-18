"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NoteForm({ leadId }: { leadId: string }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!note.trim()) return;
        setSaving(true);
        await fetch(`/api/admin/leads/${leadId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note }),
        });
        setNote("");
        setSaving(false);
        router.refresh();
      }}
      className="mt-4"
    >
      <label htmlFor="note" className="mb-1 block text-sm font-medium text-charcoal">Add an internal note</label>
      <textarea
        id="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        className="w-full rounded-md border border-stone-line bg-white px-4 py-3 text-charcoal focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
        placeholder="Never shown to the client — internal only."
      />
      <button
        type="submit"
        disabled={saving || !note.trim()}
        className="mt-2 rounded-full bg-clay px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-clay-dark disabled:opacity-50"
      >
        {saving ? "Saving…" : "Add Note"}
      </button>
    </form>
  );
}
