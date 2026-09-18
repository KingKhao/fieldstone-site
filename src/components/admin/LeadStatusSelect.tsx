"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"];

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-clay/10 text-clay-dark border-clay/30",
  CONTACTED: "bg-brass/10 text-brass-deep border-brass/30",
  QUOTED: "bg-charcoal/5 text-charcoal border-charcoal/20",
  WON: "bg-green-100 text-green-800 border-green-300",
  LOST: "bg-red-100 text-red-800 border-red-300",
};

export default function LeadStatusSelect({ leadId, status }: { leadId: string; status: string }) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState(false);

  return (
    <select
      value={current}
      disabled={saving}
      onChange={async (e) => {
        const next = e.target.value;
        setCurrent(next);
        setSaving(true);
        await fetch(`/api/admin/leads/${leadId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: next }),
        });
        setSaving(false);
        router.refresh();
      }}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${STATUS_STYLES[current] || ""}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
