import { redirect } from "next/navigation";
import { getSessionUsername } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";
import NoteForm from "@/components/admin/NoteForm";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getSessionUsername())) redirect("/admin/login");
  const lead = await prisma.lead.findUnique({
    where: { id: (await params).id },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });
  if (!lead) notFound();

  return (
    <div>
      <Link href="/admin" className="text-sm font-medium text-clay-dark hover:text-clay">← Back to pipeline</Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">{lead.name}</h1>
          <p className="mt-1 text-charcoal-muted">
            Submitted {lead.createdAt.toLocaleString()} via {lead.source}
          </p>
        </div>
        <LeadStatusSelect leadId={lead.id} status={lead.status} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-stone-line bg-white p-6">
            <h2 className="font-serif text-lg text-charcoal">Project details</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Project type</dt>
                <dd className="mt-0.5 text-charcoal">{lead.projectType}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Budget range</dt>
                <dd className="mt-0.5 text-charcoal">{lead.budgetRange || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Timeline</dt>
                <dd className="mt-0.5 text-charcoal">{lead.timeline || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">ZIP code</dt>
                <dd className="mt-0.5 text-charcoal">{lead.zip || "—"}</dd>
              </div>
            </dl>
            {lead.message && (
              <div className="mt-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap text-charcoal">{lead.message}</dd>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-stone-line bg-white p-6">
            <h2 className="font-serif text-lg text-charcoal">Internal notes</h2>
            <NoteForm leadId={lead.id} />
            <ul className="mt-6 space-y-4 border-t border-stone-line pt-4">
              {lead.notes.length === 0 && <li className="text-sm text-charcoal-muted">No notes yet.</li>}
              {lead.notes.map((n) => (
                <li key={n.id} className="text-sm">
                  <p className="text-charcoal">{n.body}</p>
                  <p className="mt-1 text-xs text-charcoal-muted">{n.createdAt.toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-stone-line bg-white p-6">
            <h2 className="font-serif text-lg text-charcoal">Contact</h2>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Email</dt>
                <dd className="mt-0.5"><a href={`mailto:${lead.email}`} className="text-clay-dark hover:text-clay">{lead.email}</a></dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">Phone</dt>
                <dd className="mt-0.5"><a href={`tel:${lead.phone}`} className="text-clay-dark hover:text-clay">{lead.phone}</a></dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-muted">SMS consent</dt>
                <dd className="mt-0.5 text-charcoal">
                  {lead.smsConsent ? `Yes — v${lead.smsConsentVersion} at ${lead.smsConsentAt?.toLocaleString()}` : "No"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
