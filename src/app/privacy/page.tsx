import { InfoPageShell } from "@/components/ui/InfoPageShell";

export const metadata = {
  title: "Privacy Policy | Softtech Financials",
  description: "Read how Softtech Financials handles personal information on this website.",
};

export default function PrivacyPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy Policy"
      title="How we handle your information"
      intro="This page explains the basic privacy practices for the Softtech Financials website."
    >
      <div className="space-y-6 rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
        <section>
          <h2 className="text-lg font-semibold text-(--color-ink)">Information we collect</h2>
          <p className="mt-2 text-sm leading-6 text-(--color-muted)">
            We may collect contact details, message content, and basic website usage information when you submit forms or contact us.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-ink)">How we use it</h2>
          <p className="mt-2 text-sm leading-6 text-(--color-muted)">
            We use the information to respond to inquiries, provide services, and improve the website experience.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-ink)">Sharing</h2>
          <p className="mt-2 text-sm leading-6 text-(--color-muted)">
            We do not sell your personal information. We only share information when needed to operate the website or comply with legal obligations.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-ink)">Contact</h2>
          <p className="mt-2 text-sm leading-6 text-(--color-muted)">
            If you have privacy questions, please contact us through the support page.
          </p>
        </section>
      </div>
    </InfoPageShell>
  );
}

