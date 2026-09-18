import { prisma } from "@/lib/prisma";
import TestimonialForm from "@/components/admin/TestimonialForm";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Testimonials</h1>
          <p className="mt-1 text-charcoal-muted">Shown on the homepage.</p>
        </div>
        <TestimonialForm />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl border border-stone-line bg-white p-5">
            <p className="text-sm text-charcoal">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-3 text-xs font-semibold text-charcoal">{t.name} <span className="font-normal text-charcoal-muted">· {t.location}</span></p>
            <div className="mt-3">
              <DeleteButton endpoint={`/api/admin/testimonials/${t.id}`} />
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-charcoal-muted">No testimonials yet — add your first above.</p>}
      </div>
    </div>
  );
}
