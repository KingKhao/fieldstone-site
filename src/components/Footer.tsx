import Link from "next/link";
import { SITE_NAME, SERVICE_AREA } from "@/lib/site";
import { getSettings } from "@/lib/settings";

export default async function Footer() {
  const { home } = await getSettings();

  return (
    <footer className="border-t border-stone-line bg-charcoal text-paper">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-semibold">{SITE_NAME}</p>
            <p className="mt-2 max-w-xs text-sm text-paper/70">
              Design-build kitchen and bathroom remodeling, serving {SERVICE_AREA}.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-paper/50">Get in touch</p>
            <ul className="mt-3 space-y-2 text-sm text-paper/80">
              <li>
                <a href={`tel:${home.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-clay-light">
                  {home.phone}
                </a>
              </li>
              <li>{home.address}</li>
              <li className="text-paper/50">{home.licenseNumber}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-paper/50">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-paper/80">
              <li>
                <Link href="/services" className="hover:text-clay-light">Services</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-clay-light">Gallery</Link>
              </li>
              <li>
                <Link href="/estimate" className="hover:text-clay-light">Get a Free Estimate</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Fictional company — demo site.</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-clay-light">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-clay-light">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-clay-light">Accessibility</Link>
          </nav>
        </div>

        <p className="mt-4 text-center text-xs text-paper/70 sm:text-right">
          Site by{" "}
          <a
            href="https://clinchvalleydigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-clay-light"
          >
            Clinch Valley Digital
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
