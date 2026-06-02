import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getTeamMemberBySlug } from "@/actions/team";
import type { ITeamMember } from "@/models/TeamMember";

export const dynamic = "force-dynamic";

type Props = {
  params: { member: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { member: slug } = params;
  const teamMember = await getTeamMemberBySlug(slug);

  return teamMember
    ? {
        title: teamMember.name,
        description: teamMember.bio || teamMember.longBio || "",
      }
    : {};
}

export default async function TeamMemberPage({ params }: Props) {
  const { member: slug } = params;
  const member: ITeamMember | null = await getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <SectionWrapper eyebrow="Team Member" title={member.name} intro={member.bio || ""}>
      <Breadcrumb
        items={[
          { label: "Team", href: "/team" },
          { label: member.name, href: `/team/${member.slug}` },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] bg-[var(--color-panel)] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Focus Areas
          </p>
          <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
            {(member.specialties || []).map((specialty) => (
              <li key={specialty}>• {specialty}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_60px_rgba(17,33,31,0.08)]">
          <p className="text-lg leading-8 text-[var(--color-muted)]">
            {member.longBio}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
