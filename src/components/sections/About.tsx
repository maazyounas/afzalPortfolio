import { SectionWrapper } from "../ui/SectionWrapper";

export function About() {
  return (
    <SectionWrapper
      eyebrow="Why Softech"
      title="A partner that turns financial complexity into operating confidence."
      intro="We combine strategy with implementation so teams leave with better systems, not just slide decks."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {[
          "Board-ready reporting frameworks",
          "Audit-conscious workflows and controls",
          "Leadership support for forecasting and decision-making",
        ].map((item) => (
          <div
            key={item}
            className="rounded-[2rem] bg-[var(--color-panel)] p-6 text-[var(--color-ink)]"
          >
            {item}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
