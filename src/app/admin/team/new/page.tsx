import { TeamForm } from "@/features/admin/components/TeamForm";


export const metadata = {
  title: "New | Softech Financials",
  description: "New page of Softech Financials.",
  keywords: ["portfolio", "new", "Softech Financials"],
  alternates: {
    canonical: "/admin/team/new",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "New | Softech Financials",
    description: "New page of Softech Financials.",
    url: "/admin/team/new",
  },
};


export default function NewTeamMemberPage() {
  return (
    <div className="max-w-2xl text-white">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Add Team Member</h1>
        <p className="max-w-xl text-sm text-neutral-400">Add a new specialist to the team roster.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 lg:p-8">
        <TeamForm />
      </div>
    </div>
  );
}
