import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: `Services | ${SITE_NAME}`,
  description: "Kitchen remodeling, bathroom remodeling, and design-build additions in " + SERVICE_AREA + ".",
};

const SERVICES = [
  {
    title: "Kitchen Remodeling",
    image: "/images/kitchen-after.jpg",
    description:
      "From a cabinet-and-counter refresh to a full gut-and-reconfigure, we design kitchens around how your household actually cooks and gathers.",
    includes: [
      "Custom & semi-custom cabinetry",
      "Islands, layout changes & open-concept walls",
      "Countertops: quartz, granite, butcher block",
      "Tile backsplash & flooring",
      "Lighting, electrical & plumbing rough-in",
      "Appliance coordination & install",
    ],
  },
  {
    title: "Bathroom Remodeling",
    image: "/images/bath-after.jpg",
    description:
      "Walk-in showers, tub-to-shower conversions, and full primary-bath renovations — built to handle daily use and still look sharp in ten years.",
    includes: [
      "Walk-in & curbless showers",
      "Custom tile work",
      "Vanities, lighting & mirrors",
      "Heated flooring",
      "Layout changes for small or awkward baths",
      "Waterproofing done to code, not shortcuts",
    ],
  },
  {
    title: "Design-Build Additions",
    image: "/images/craftsman.jpg",
    description:
      "Adding square footage — a pantry, a mudroom, a primary suite — handled by one team from initial design through final permit sign-off.",
    includes: [
      "Structural framing & foundation work",
      "Permitting & inspections handled for you",
      "Matched exterior finishes",
      "HVAC & electrical extension",
      "Interior finish-out",
      "Single point of contact, start to finish",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-stone px-6 py-16 text-center sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-clay">What we do</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Services</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-muted">
          We keep our focus narrow on purpose — kitchens, baths, and the additions that go with them — so every
          project gets a crew that has genuinely done this exact work before.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="space-y-20">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(min-width: 1024px) 560px, 100vw" />
              </div>
              <div>
                <h2 className="font-serif text-3xl text-charcoal">{s.title}</h2>
                <p className="mt-4 text-charcoal-muted">{s.description}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-charcoal">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-clay"><path d="M20 6 9 17l-5-5" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/estimate"
                  className="mt-7 inline-block rounded-full bg-clay px-6 py-3 font-semibold text-paper transition-colors hover:bg-clay-dark"
                >
                  Get a Free Estimate
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-charcoal px-6 py-16 text-center text-paper sm:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl">Not sure which service fits your project?</h2>
        <p className="mx-auto mt-3 max-w-xl text-paper/70">
          Tell us what you&apos;re working with and we&apos;ll point you in the right direction — no obligation.
        </p>
        <Link
          href="/estimate"
          className="mt-7 inline-block rounded-full bg-clay px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-clay-dark"
        >
          Get My Free Estimate
        </Link>
      </section>
    </div>
  );
}
