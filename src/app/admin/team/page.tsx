import Link from "next/link";
import { Plus, Edit, Trash2, Shield } from "lucide-react";
import { getTeamMembers, deleteTeamMember } from "@/actions/team";
import { ITeamMember } from "@/models/TeamMember";
import { revalidatePath } from "next/cache";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-white/5 bg-white/5">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-sm font-medium text-neutral-400">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Specialties</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-neutral-500">
                  No team members found. Add your first member to get started.
                </td>
              </tr>
            ) : (
              members.map((member: ITeamMember) => (
                <tr key={member._id.toString()} className="group hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-neutral-400">{member.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {member.specialties?.map((tag) => (
                        <span key={tag} className="inline-flex rounded-full bg-white/5 px-2 py-0.5 text-xs text-neutral-300">
                          {tag}
                        </span>
                      )) || <span className="text-neutral-500">-</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">{member.order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Link
                        href={`/admin/team/${String(member._id)}/edit`}
                        className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-white/5 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      
                      <form action={handleDelete} className="inline">
                        <input type="hidden" name="id" value={String(member._id)} />
                        <button
                          type="submit"
                          onClick={(e) => {
                            if (!confirm("Are you sure you want to delete this team member?")) {
                              e.preventDefault();
                            }
                          }}
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
