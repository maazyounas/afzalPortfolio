import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import { getServices, deleteService } from "@/actions/services";
import { IService } from "@/models/Service";
import { ServiceIcon } from "@/lib/utils/icons";

export default async function AdminServicesPage() {
  const services = await getServices();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deleteService(id);
    revalidatePath("/admin/services");
    revalidatePath("/services");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-white/5 bg-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-sm font-medium text-neutral-400">
              <th className="px-6 py-4">Icon</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-neutral-500">
                  No services found. Add your first service to get started.
                </td>
              </tr>
            ) : (
              services.map((service: IService) => (
                <tr key={service._id.toString()} className="group hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-(--color-accent)">
                      <ServiceIcon name={service.icon} className="h-4 w-4" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{service.name}</td>
                  <td className="px-6 py-4 text-sm text-neutral-400">{service.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${service.isActive ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/services/${String(service._id)}/edit`}
                        className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-white/5 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <form action={handleDelete} className="inline">
                        <input type="hidden" name="id" value={String(service._id)} />
                        <button
                          type="submit"
                          className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-red-400/10 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
