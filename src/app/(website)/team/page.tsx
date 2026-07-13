import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getTeamMembers } from "@/actions/team";
import type { ITeamMember } from "@/models/TeamMember";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the professionals behind Softtech Financials. Our team combines advisory insight with hands-on implementation across finance, compliance, and reporting.",
  openGraph: {
    title: "Our Team | Softtech Financials",
    description: "Meet the professionals behind Softtech Financials. Our team combines advisory insight with hands-on implementation across finance, compliance, and reporting.",
    url: "/team",
  },
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <SectionWrapper
      isMainHeader={true}
      eyebrow="Leadership"
      title="A team built around execution, not just advice."
      intro="Our specialists combine advisory insight with hands-on implementation across finance, compliance, and reporting."
    >
      <Breadcrumb items={[{ label: "Team", href: "/team" }]} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.length > 0 ? (
          teamMembers.map((member: ITeamMember) => (
            <article
              key={member.slug}
              className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {member.role}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
                {member.name}
              </h2>
              <p className="mt-3 text-[var(--color-muted)]">{member.bio}</p>
              <Link
                href={`/team/${member.slug}`}
                className="mt-6 inline-flex text-sm font-semibold text-[var(--color-accent)]"
              >
                View profile
              </Link>
            </article>
          ))
        ) : (
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)] text-center text-[var(--color-muted)]">
            <p className="text-lg font-semibold text-[var(--color-ink)]">No team members found.</p>
            <p className="mt-2">Add your first team member in the admin dashboard to populate this page.</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

