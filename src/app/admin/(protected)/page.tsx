import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"] as const;

export default async function AdminPipelinePage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const counts = Object.fromEntries(STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length]));

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal">Lead Pipeline</h1>
      <p className="mt-1 text-charcoal-muted">Every estimate request and contact form submission lands here.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {STATUSES.map((s) => (
          <div key={s} className="rounded-xl border border-stone-line bg-white p-4 text-center">
            <p className="font-serif text-2xl text-clay-dark">{counts[s]}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-charcoal-muted">{s}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-stone-line bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-stone-line text-xs uppercase tracking-wide text-charcoal-muted">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Project</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold">Received</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-charcoal-muted">No leads yet.</td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-stone-line last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-charcoal hover:text-clay-dark">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-charcoal-muted">{lead.projectType}</td>
                <td className="px-4 py-3 text-charcoal-muted">
                  <div>{lead.email}</div>
                  <div>{lead.phone}</div>
                </td>
                <td className="px-4 py-3 text-charcoal-muted">{lead.source}</td>
                <td className="px-4 py-3 text-charcoal-muted">{lead.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <LeadStatusSelect leadId={lead.id} status={lead.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
