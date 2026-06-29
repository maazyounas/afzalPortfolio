import { ServiceForm } from "@/features/admin/components/ServiceForm";
import dbConnect from "@/lib/db/db";
import Service from "@/models/Service";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: any) {
  return {
    title: `${'Edit'} | Afzal's Portfolio`,
    description: `Detailed view of ${'Edit'} on Afzal's Portfolio.`,
    keywords: ["portfolio", "edit", "Afzal"],
    alternates: {
      canonical: `/admin/services/[id]/edit`, // Update dynamically if needed
    },
    openGraph: {
      title: `${'Edit'} | Afzal's Portfolio`,
      description: `Detailed view of ${'Edit'} on Afzal's Portfolio.`,
      url: `/admin/services/[id]/edit`,
    },
  };
}


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
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Service</h1>
        <p className="max-w-xl text-sm text-neutral-400">Update the details for &quot;{service.name}&quot;.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 lg:p-8">
        <ServiceForm initialData={JSON.parse(JSON.stringify(service))} />
      </div>
    </div>
  );
}
