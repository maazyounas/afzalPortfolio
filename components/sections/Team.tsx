import { teamMembers } from "@/lib/data/team";

import { SectionWrapper } from "../ui/SectionWrapper";

export function Team() {
  return (
    <SectionWrapper
      eyebrow="Team"
      title="Senior specialists who stay close to the work."
      intro="Our model keeps experienced operators involved in both the strategic framing and the practical rollout."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.slug}
            className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)]"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {member.role}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
              {member.name}
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">{member.bio}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
