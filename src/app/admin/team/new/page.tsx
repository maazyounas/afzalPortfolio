import { TeamForm } from "@/features/admin/components/TeamForm";

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-2xl text-white">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Add Team Member</h1>
        <p className="text-sm text-neutral-400">Add a new specialist to the team roster.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
        <TeamForm />
      </div>
    </div>
  );
}
