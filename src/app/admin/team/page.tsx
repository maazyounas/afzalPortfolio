import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { getTeamMembers, deleteTeamMember } from "@/actions/team";
import { ITeamMember } from "@/models/TeamMember";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteTeamMember(id);
    revalidatePath("/admin/team");
    revalidatePath("/team");
  }

  return (
    <div>
      {/* Page header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Team Members</h1>
          <p className="admin-page-subtitle">
            Manage team profiles displayed on your website.
          </p>
        </div>
        <Link href="/admin/team/new" className="admin-btn admin-btn-primary">
          <Plus size={16} aria-hidden="true" />
          Add Member
        </Link>
      </div>

      {/* Table */}
      <div className="admin-table-wrapper">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Specialties</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="admin-table-empty">
                      <div className="admin-table-empty-title">No team members yet</div>
                      <div className="admin-table-empty-desc">
                        Add your first team member to get started.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                members.map((member: ITeamMember) => (
                  <tr key={member._id.toString()}>
                    <td>
                      <span style={{ fontWeight: 600, color: "var(--admin-primary)" }}>
                        {member.name}
                      </span>
                    </td>
                    <td style={{ color: "var(--admin-text-secondary)", fontSize: 13 }}>
                      {member.role}
                    </td>
                    <td>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {member.specialties?.map((tag) => (
                          <span key={tag} className="admin-badge admin-badge-neutral">
                            {tag}
                          </span>
                        )) || <span style={{ color: "var(--admin-muted)" }}>—</span>}
                      </div>
                    </td>
                    <td style={{ color: "var(--admin-muted)", fontSize: 13 }}>
                      {member.order}
                    </td>
                    <td>
                      <div className="admin-action-row">
                        <Link
                          href={`/admin/team/${String(member._id)}/edit`}
                          className="admin-btn-icon"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </Link>
                        <form action={handleDelete} className="inline">
                          <input type="hidden" name="id" value={String(member._id)} />
                          <DeleteButton />
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
