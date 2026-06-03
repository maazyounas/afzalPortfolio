import { ServiceForm } from "@/features/admin/components/ServiceForm";
import dbConnect from "@/lib/db/db";
import Service from "@/models/Service";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  await dbConnect();
  const service = await Service.findById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Edit Service</h1>
        <p className="text-sm text-neutral-400">Update the details for &quot;{service.name}&quot;.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
        <ServiceForm initialData={JSON.parse(JSON.stringify(service))} />
      </div>
    </div>
  );
}
