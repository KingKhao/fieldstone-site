"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE_NAME } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-charcoal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6 text-clay">
            <path d="M3 11 12 3l9 8" />
            <path d="M5 10v10h14V10" />
            <path d="M9 20v-6h6v6" />
          </svg>
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-charcoal-muted sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors hover:text-clay ${active ? "text-clay" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 sm:flex">
          <Link
            href="/estimate"
            className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-clay-dark"
          >
            Get a Free Estimate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center text-charcoal sm:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-stone-line bg-paper px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-charcoal-muted">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="hover:text-clay">
                {link.label}
              </Link>
            ))}
            <Link
              href="/estimate"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-clay px-5 py-2.5 text-center font-semibold text-paper hover:bg-clay-dark"
            >
              Get a Free Estimate
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
