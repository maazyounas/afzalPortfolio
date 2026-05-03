import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { teamMembers } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the professionals behind Softech Financials.",
};

export default function TeamPage() {
  return (
    <SectionWrapper
      eyebrow="Leadership"
      title="A team built around execution, not just advice."
      intro="Our specialists combine advisory insight with hands-on implementation across finance, compliance, and reporting."
    >
      <Breadcrumb items={[{ label: "Team", href: "/team" }]} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
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
        ))}
      </div>
    </SectionWrapper>
  );
}
