import { SectionWrapper } from "../ui/SectionWrapper";

const steps = [
  "Diagnose reporting gaps, control risks, and decision bottlenecks.",
  "Design a finance operating model with clear ownership and milestones.",
  "Implement tools, dashboards, and routines that leadership can sustain.",
];

export function Process() {
  return (
    <SectionWrapper
      eyebrow="Process"
      title="A simple delivery rhythm that keeps momentum high."
      intro="We prefer small, high-trust systems over bloated transformation programs."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Step {index + 1}
            </p>
            <p className="mt-4 text-[var(--color-muted)]">{step}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
