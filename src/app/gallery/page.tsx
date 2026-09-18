import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { prisma } from "@/lib/prisma";
import { SITE_NAME, SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: `Project Gallery | ${SITE_NAME}`,
  description: "Before-and-after kitchen and bathroom remodeling projects in " + SERVICE_AREA + ".",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <section className="bg-stone px-6 py-16 text-center sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-clay">Our work</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Project Gallery</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-muted">
          Every project here is a real Fieldstone remodel. Drag any photo to see the full before-and-after.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {projects.length === 0 ? (
          <p className="text-center text-charcoal-muted">Gallery projects are being added — check back soon.</p>
        ) : (
          <div className="grid gap-14 sm:grid-cols-2">
            {projects.map((p) => (
              <div key={p.id}>
                <BeforeAfterSlider beforeSrc={p.beforeImage} afterSrc={p.afterImage} title={p.title} />
                <div className="mt-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-serif text-lg text-charcoal">{p.title}</p>
                    {p.location && <p className="text-xs uppercase tracking-wide text-charcoal-muted">{p.location}</p>}
                  </div>
                  <p className="mt-1 text-sm text-charcoal-muted">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="bg-charcoal px-6 py-16 text-center text-paper sm:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl">Like what you see?</h2>
        <p className="mx-auto mt-3 max-w-xl text-paper/70">Your project could be the next one on this page.</p>
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
