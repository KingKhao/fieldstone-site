import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import { SITE_NAME } from "@/lib/site";

const NAV = [
  { href: "/admin", label: "Pipeline" },
  { href: "/admin/projects", label: "Gallery Projects" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/settings", label: "Site Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone">
      <header className="border-b border-stone-line bg-charcoal text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-paper/50">Admin</p>
            <p className="font-serif text-lg">{SITE_NAME}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-3.5 py-2 font-medium text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper">
                {item.label}
              </Link>
            ))}
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
