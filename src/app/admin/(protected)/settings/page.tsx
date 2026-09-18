import { getSettings } from "@/lib/settings";
import SettingsForm from "@/components/admin/SettingsForm";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default async function AdminSettingsPage() {
  const { home } = await getSettings();

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal">Site Settings</h1>
      <p className="mt-1 text-charcoal-muted">Edit homepage copy and contact details, or update your admin password.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SettingsForm initial={home} />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
