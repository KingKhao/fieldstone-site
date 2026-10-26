import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, OWNER_NAME, SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: `The story, crew, and standards behind ${SITE_NAME}, serving ${SERVICE_AREA}.`,
};

const VALUES = [
  {
    title: "One crew, start to finish",
    body: "The people who start your project are the people who finish it — no rotating subs you've never met.",
  },
  {
    title: "Fixed pricing, no change-order games",
    body: "We scope thoroughly up front so the number we quote is the number you pay, barring surprises we'll always flag first.",
  },
  {
    title: "Built to be lived in",
    body: "We design for how a family actually uses a room in year five, not just how it photographs on day one.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-clay">Our story</p>
            <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Built on craftsmanship, not shortcuts</h1>
            <p className="mt-6 text-charcoal-muted">
              {SITE_NAME} was founded by {OWNER_NAME}, a second-generation carpenter who started framing houses
              with his father before he could legally drive a truck. After a decade building custom homes across
              East Tennessee, he set out to fix a problem he kept seeing on remodel jobs: homeowners getting
              beautiful renderings and then a completely different experience once the sledgehammers came out.
            </p>
            <p className="mt-4 text-charcoal-muted">
              In this fictional business story, Fieldstone is a small design-build team serving{" "}
              {SERVICE_AREA}. We take on a limited number of kitchen and bathroom projects at a time so every
              client gets an actual crew — not a rotating cast of subcontractors meeting each other for the first
              time on your job site.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image src="/images/craftsman.jpg" alt="A Fieldstone craftsman working on custom cabinetry" fill className="object-cover" sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
        </div>
      </section>

      <section className="bg-stone px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-clay">What we stand for</p>
            <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">Our approach</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-stone-line bg-paper p-7">
                <h3 className="font-serif text-xl text-charcoal">{v.title}</h3>
                <p className="mt-2 text-sm text-charcoal-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-24">
        <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">Ready to work with us?</h2>
        <p className="mx-auto mt-4 max-w-xl text-charcoal-muted">
          Tell us about your project and this is a simulation; no one will contact you.
        </p>
        <Link
          href="/estimate"
          className="mt-8 inline-block rounded-full bg-clay px-8 py-4 font-semibold text-paper shadow-sm transition-colors hover:bg-clay-dark"
        >
          Get My Free Estimate
        </Link>
      </section>
    </div>
  );
}
