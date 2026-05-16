import { ServiceForm } from "@/features/admin/components/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Add New Service</h1>
        <p className="text-sm text-neutral-400">Create a new service offering for your portfolio.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
        <ServiceForm />
      </div>
    </div>
  );
}
