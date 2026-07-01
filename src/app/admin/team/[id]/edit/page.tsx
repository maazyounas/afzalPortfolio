import { TeamForm } from "@/features/admin/components/TeamForm";
import dbConnect from "@/lib/db/db";
import TeamMember from "@/models/TeamMember";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: any) {
  return {
    title: `${'Edit'} | Afzal's Portfolio`,
    description: `Detailed view of ${'Edit'} on Afzal's Portfolio.`,
    keywords: ["portfolio", "edit", "Afzal"],
    alternates: {
      canonical: `/admin/team/[id]/edit`, // Update dynamically if needed
    },
    openGraph: {
    images: ["/opengraph-image"],
      title: `${'Edit'} | Afzal's Portfolio`,
      description: `Detailed view of ${'Edit'} on Afzal's Portfolio.`,
      url: `/admin/team/[id]/edit`,
    },
  };
}


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
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Team Member</h1>
        <p className="max-w-xl text-sm text-neutral-400">Update the details for &quot;{member.name}&quot;.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 lg:p-8">
        <TeamForm initialData={JSON.parse(JSON.stringify(member))} />
      </div>
    </div>
  );
}
