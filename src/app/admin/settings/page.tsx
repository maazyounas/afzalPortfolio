import { getSettings } from "@/actions/settings";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const initialData = await getSettings();

  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Site Settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Manage your website&apos;s global settings, footer content, and contact information.
        </p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 lg:p-8">
        <SettingsForm initialData={initialData} />
      </div>
    </div>
  );
}
