import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Gallery Projects</h1>
          <p className="mt-1 text-charcoal-muted">These power the public /gallery page and homepage sliders.</p>
        </div>
        <ProjectForm />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-xl border border-stone-line bg-white">
            <div className="grid grid-cols-2">
              <div className="relative aspect-square">
                <Image src={p.beforeImage} alt={`${p.title} before`} fill className="object-cover" sizes="200px" />
              </div>
              <div className="relative aspect-square">
                <Image src={p.afterImage} alt={`${p.title} after`} fill className="object-cover" sizes="200px" />
              </div>
            </div>
            <div className="p-4">
              <p className="font-serif text-charcoal">{p.title}</p>
              <p className="text-xs uppercase tracking-wide text-charcoal-muted">{p.category} · {p.location || "—"}</p>
              <p className="mt-2 text-sm text-charcoal-muted">{p.description}</p>
              <div className="mt-3">
                <DeleteButton endpoint={`/api/admin/projects/${p.id}`} />
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-charcoal-muted">No projects yet — add your first above.</p>}
      </div>
    </div>
  );
}
