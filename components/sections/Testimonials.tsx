import { testimonials } from "@/lib/data/testimonials";

import { SectionWrapper } from "../ui/SectionWrapper";

export function Testimonials() {
  return (
    <SectionWrapper
      eyebrow="Client Voice"
      title="Trusted by teams who need sharper financial visibility."
      intro="A few examples of the outcomes clients cite most often after implementation."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <blockquote
            key={testimonial.name}
            className="rounded-[2rem] bg-[var(--color-panel)] p-6"
          >
            <p className="text-[var(--color-ink)]">“{testimonial.quote}”</p>
            <footer className="mt-5 text-sm text-[var(--color-muted)]">
              {testimonial.name}, {testimonial.title}
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionWrapper>
  );
}
