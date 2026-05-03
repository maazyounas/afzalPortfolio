import { Button } from "../ui/Button";
import { SectionWrapper } from "../ui/SectionWrapper";

export function Contact() {
  return (
    <SectionWrapper
      eyebrow="Get Started"
      title="Let us build a finance function that supports better decisions."
      intro="Share your current reporting setup, team shape, or upcoming compliance needs and we’ll outline a practical starting point."
    >
      <div className="rounded-[2rem] bg-[linear-gradient(135deg,#103d3a,#18534e)] p-8 text-white">
        <p className="max-w-2xl text-lg text-white/80">
          Most engagements begin with a short diagnostic to understand reporting friction, close-cycle pain points, and leadership information gaps.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="mailto:hello@softechfinancials.com">hello@softechfinancials.com</Button>
          <Button href="/about" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
            Learn more about our approach
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
