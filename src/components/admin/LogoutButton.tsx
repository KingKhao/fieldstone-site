"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="ml-2 rounded-full border border-paper/20 px-3.5 py-2 text-sm font-medium text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
    >
      Log out
    </button>
  );
}
