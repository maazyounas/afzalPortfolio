import { TeamForm } from "@/features/admin/components/TeamForm";
import dbConnect from "@/lib/db/db";
import TeamMember from "@/models/TeamMember";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTeamMemberPage({ params }: Props) {
  const { id } = await params;
  await dbConnect();
  const member = await TeamMember.findById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="max-w-2xl text-white">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Edit Team Member</h1>
        <p className="text-sm text-neutral-400">Update the details for &quot;{member.name}&quot;.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
        <TeamForm initialData={JSON.parse(JSON.stringify(member))} />
      </div>
    </div>
  );
}
