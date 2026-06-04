import Link from "next/link";
import { getSettings } from "@/actions/settings";
import { siteConfig } from "@/lib/data/site-config";
import { InfoPageShell } from "@/components/ui/InfoPageShell";

export const metadata = {
  title: "Help Center | Softech Financials",
  description: "Find answers to common questions and learn how to get support from Softech Financials.",
};

export default async function HelpCenterPage() {
  const settings = await getSettings();
  const email = settings?.contactEmail || siteConfig.company.email;
  const phone = settings?.contactPhone || siteConfig.company.phone;

  const helpTopics = [
    {
      title: "Getting started",
      text: "Learn how to request a consultation, choose a service, and share your business needs with our team.",
    },
    {
      title: "Service questions",
      text: "Review what each service includes and what information helps us give you an accurate proposal.",
    },
    {
      title: "Billing and support",
      text: "Need help after onboarding? Our support channels are listed below and we respond quickly.",
    },
  ];

  return (
    <InfoPageShell
      eyebrow="Help Center"
      title="Find quick answers and next steps"
      intro="Use this page when you need guidance on services, onboarding, or how to contact us for help."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {helpTopics.map((topic) => (
          <div key={topic.title} className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--color-ink)">{topic.title}</h2>
            <p className="mt-3 text-sm leading-6 text-(--color-muted)">{topic.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-(--color-ink)">Need more help?</h2>
        <p className="mt-3 text-sm leading-6 text-(--color-muted)">
          If your question is not covered here, reach out and we&apos;ll help you directly.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/support" className="rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Contact Support
          </Link>
          <Link href="/faq" className="rounded-xl border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-(--color-ink) transition hover:bg-gray-50">
            Browse FAQs
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-(--color-ink)">Email</h3>
          <p className="mt-2 text-sm text-(--color-muted)">{email}</p>
        </div>
        <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-(--color-ink)">Phone</h3>
          <p className="mt-2 text-sm text-(--color-muted)">{phone}</p>
        </div>
      </div>
    </InfoPageShell>
  );
}
