import { teamMembers } from "@/lib/data/team";

import { SectionWrapper } from "../ui/SectionWrapper";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Team() {
  return (
    <SectionWrapper
      id="team"
      eyebrow="Team"
      title="Senior specialists who stay close to the work."
      intro="Our model keeps experienced operators involved in both the strategic framing and the practical rollout."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.slug}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50 text-xl font-semibold text-slate-800">
                {initials(member.name)}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">{member.role}</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{member.name}</h3>
              </div>
            </div>

            <p className="mt-4 text-[var(--color-muted)]">{member.bio}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {member.specialties?.map((s) => (
                <span key={s} className="rounded-full bg-[var(--color-panel)] px-3 py-1 text-xs text-[var(--color-ink)]">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
