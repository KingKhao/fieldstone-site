import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { getSettings } from "@/lib/settings";
import { SERVICE_AREA } from "@/lib/site";

const STATS = [
  { value: "14", label: "Years in business" },
  { value: "260+", label: "Projects completed" },
  { value: "4.9★", label: "Average client rating" },
  { value: "6–10", label: "Week avg. build time" },
];

const SERVICES = [
  {
    title: "Kitchen Remodeling",
    description: "Full gut renovations, layout changes, custom cabinetry, and islands built around how you cook.",
    icon: "M4 4h16v4H4zM4 10h16v10H4z",
  },
  {
    title: "Bathroom Remodeling",
    description: "Walk-in showers, tile work, vanities, and layouts that make small rooms feel larger.",
    icon: "M4 12h16M6 12V6a2 2 0 0 1 2-2h2v8M8 20h8",
  },
  {
    title: "Design-Build Additions",
    description: "Room additions and structural changes handled by one team from permit to punch list.",
    icon: "M3 11 12 3l9 8M5 10v10h14V10",
  },
];

const PROCESS = [
  { step: "1", title: "Free estimate", body: "Tell us about your project. We respond within one business day." },
  { step: "2", title: "Design & scope", body: "We walk your space, nail down materials, and lock in a fixed price." },
  { step: "3", title: "Build", body: "One dedicated crew, weekly updates, and a realistic timeline you can plan around." },
  { step: "4", title: "Walkthrough", body: "A final walkthrough before we call it done — and a warranty behind it." },
];

const TESTIMONIALS = [
  {
    quote: "Marcus and his crew gutted our 1970s kitchen and gave us back a room we actually want to cook in. On budget, on time, zero drama.",
    name: "Renee H.",
    location: "Farragut, TN",
  },
  {
    quote: "The bathroom remodel was done in five weeks flat. Communication the entire way through — no surprises on the invoice either.",
    name: "David P.",
    location: "West Knoxville",
  },
  {
    quote: "We interviewed four contractors. Fieldstone was the only one who showed up with an actual design plan instead of a ballpark guess.",
    name: "Ana & Chris T.",
    location: "Knoxville, TN",
  },
];

export default async function HomePage() {
  const { home } = await getSettings();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-clay">{home.heroEyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl">
              {home.heroTitle}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-charcoal-muted">{home.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/estimate"
                className="rounded-full bg-clay px-7 py-3.5 font-semibold text-paper shadow-sm transition-colors hover:bg-clay-dark"
              >
                Get a Free Estimate
              </Link>
              <Link
                href="/gallery"
                className="rounded-full border-2 border-charcoal/15 px-7 py-3.5 font-semibold text-charcoal transition-colors hover:border-clay/40 hover:text-clay-dark"
              >
                View Our Work
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-charcoal-muted">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-clay"><path d="M20 6 9 17l-5-5" /></svg>
                Licensed &amp; insured
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-clay"><path d="M20 6 9 17l-5-5" /></svg>
                2-year workmanship warranty
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-clay"><path d="M20 6 9 17l-5-5" /></svg>
                Serving {SERVICE_AREA}
              </span>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image src="/images/hero-kitchen.jpg" alt="A finished warm farmhouse-style kitchen by Fieldstone" fill className="object-cover" priority sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-stone-line bg-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl text-clay-dark sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-charcoal-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before/After */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">See the difference</p>
          <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">Real projects. Real transformations.</h2>
          <p className="mt-4 text-charcoal-muted">Drag the slider to see what a Fieldstone remodel actually looks like, start to finish.</p>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <BeforeAfterSlider beforeSrc="/images/kitchen-before.jpg" afterSrc="/images/kitchen-after.jpg" title="Kitchen remodel" />
            <p className="mt-4 text-center font-serif text-lg text-charcoal">Full kitchen remodel — West Knoxville</p>
          </div>
          <div>
            <BeforeAfterSlider beforeSrc="/images/bath-before.jpg" afterSrc="/images/bath-after.jpg" title="Bathroom remodel" />
            <p className="mt-4 text-center font-serif text-lg text-charcoal">Primary bath remodel — Farragut</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/gallery" className="font-semibold text-clay-dark underline underline-offset-4 hover:text-clay">
            See more projects in the full gallery →
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-stone py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-clay">What we do</p>
            <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">Focused on kitchens and baths — done right</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-stone-line bg-paper p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-clay/10 text-clay">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6"><path d={s.icon} /></svg>
                </div>
                <h3 className="mt-4 font-serif text-xl text-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm text-charcoal-muted">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="font-semibold text-clay-dark underline underline-offset-4 hover:text-clay">
              See all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">How it works</p>
          <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">A straightforward process, start to finish</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <div key={p.step}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clay font-serif text-lg text-paper">{p.step}</div>
              <h3 className="mt-4 font-serif text-lg text-charcoal">{p.title}</h3>
              <p className="mt-2 text-sm text-charcoal-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-charcoal py-20 text-paper sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-clay-light">Client stories</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Don&apos;t just take our word for it</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-paper/10 bg-paper/5 p-6">
                <div className="flex gap-0.5 text-clay-light" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-paper/90">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-paper/70">
                  {t.name} <span className="font-normal text-paper/50">· {t.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
        <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">Ready to start your project?</h2>
        <p className="mx-auto mt-4 max-w-xl text-charcoal-muted">
          Get a free, no-pressure estimate in about two minutes — we&apos;ll follow up within one business day.
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
