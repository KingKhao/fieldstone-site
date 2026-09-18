import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/settings";
import { SITE_NAME, SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: `Get in touch with ${SITE_NAME}, serving ${SERVICE_AREA}.`,
};

export default async function ContactPage() {
  const { home } = await getSettings();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-clay">Get in touch</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal-muted">
          Have a question before you request an estimate? Reach out directly — we&apos;re happy to talk through
          your project.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Phone</p>
              <a href={`tel:${home.phone.replace(/[^0-9+]/g, "")}`} className="mt-1 block font-serif text-xl text-clay-dark hover:text-clay">
                {home.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Email</p>
              <a href={`mailto:${home.email}`} className="mt-1 block text-charcoal hover:text-clay-dark">
                {home.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Service area</p>
              <p className="mt-1 text-charcoal">{home.address} &amp; surrounding {SERVICE_AREA.split("&")[1]?.trim() || "area"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">License</p>
              <p className="mt-1 text-charcoal">{home.licenseNumber}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Hours</p>
              <p className="mt-1 text-charcoal">Monday–Friday, 8am–5pm</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
