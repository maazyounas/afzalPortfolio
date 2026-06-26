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
      {/* Page header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Services</h1>
          <p className="admin-page-subtitle">
            Manage your service offerings displayed on the public website.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="admin-btn admin-btn-primary"
        >
          <Plus size={16} aria-hidden="true" />
          Add Service
        </Link>
      </div>

      {/* Table */}
      <div className="admin-table-wrapper">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="admin-table-empty">
                      <div className="admin-table-empty-title">No services yet</div>
                      <div className="admin-table-empty-desc">
                        Add your first service to get started.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                services.map((service: IService) => (
                  <tr key={service._id.toString()}>
                    <td>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: "#eff6ff",
                          color: "#3b82f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ServiceIcon name={service.icon} className="h-4 w-4" />
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: "var(--admin-primary)" }}>
                        {service.name}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: 13, color: "var(--admin-muted)", fontFamily: "monospace" }}>
                        {service.slug}
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          service.isActive
                            ? "admin-badge admin-badge-success"
                            : "admin-badge admin-badge-danger"
                        }
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-action-row">
                        <Link
                          href={`/admin/services/${String(service._id)}/edit`}
                          className="admin-btn-icon"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </Link>
                        <form action={handleDelete} className="inline">
                          <input type="hidden" name="id" value={String(service._id)} />
                          <button
                            type="submit"
                            className="admin-btn-icon danger"
                            title="Delete"
                          >
                            <Trash2 size={15} />
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
    </div>
  );
}
