import { InfoPageShell } from "@/components/ui/InfoPageShell";

export const metadata = {
  title: "Terms of Service | Softtech Financials",
  description: "Read the basic terms for using the Softtech Financials website.",
};

export default function TermsPage() {
  return (
    <InfoPageShell
      eyebrow="Terms of Service"
      title="Website usage terms"
      intro="By using this website, you agree to the basic terms below."
    >
      <div className="space-y-6 rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
        <section>
          <h2 className="text-lg font-semibold text-(--color-ink)">Use of site</h2>
          <p className="mt-2 text-sm leading-6 text-(--color-muted)">
            The site is provided for general information and business communication. You agree not to misuse forms or attempt unauthorized access.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-ink)">Services</h2>
          <p className="mt-2 text-sm leading-6 text-(--color-muted)">
            Any service descriptions are informational until a proposal or agreement is confirmed with our team.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-ink)">Content</h2>
          <p className="mt-2 text-sm leading-6 text-(--color-muted)">
            Website content may change without notice. We may update or remove information as needed.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-ink)">Contact</h2>
          <p className="mt-2 text-sm leading-6 text-(--color-muted)">
            For questions about these terms, please reach out via the support page.
          </p>
        </section>
      </div>
    </InfoPageShell>
  );
}

