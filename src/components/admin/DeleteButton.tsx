"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ endpoint, confirmLabel = "Delete" }: { endpoint: string; confirmLabel?: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} className="text-xs font-semibold text-error hover:underline">
        {confirmLabel}
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-xs">
      <span className="text-charcoal-muted">Are you sure?</span>
      <button
        type="button"
        disabled={saving}
        onClick={async () => {
          setSaving(true);
          await fetch(endpoint, { method: "DELETE" });
          router.refresh();
        }}
        className="font-semibold text-error hover:underline"
      >
        Yes, delete
      </button>
      <button type="button" onClick={() => setConfirming(false)} className="text-charcoal-muted hover:underline">
        Cancel
      </button>
    </span>
  );
}
