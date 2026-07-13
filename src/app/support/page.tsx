import Link from "next/link";
import { getSettings } from "@/actions/settings";
import { siteConfig } from "@/lib/data/site-config";
import { InfoPageShell } from "@/components/ui/InfoPageShell";

export const metadata = {
  title: "Support | Softtech Financials",
  description: "Get direct support from the Softtech Financials team.",
};

export default async function SupportPage() {
  const settings = await getSettings();
  const email = settings?.contactEmail || siteConfig.company.email;
  const phone = settings?.contactPhone || siteConfig.company.phone;

  return (
    <InfoPageShell
      eyebrow="Support"
      title="Talk to our team"
      intro="Use these contact options when you need help with an active project or want to discuss next steps."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-(--color-ink)">Direct contact</h2>
          <div className="mt-4 space-y-3 text-sm text-(--color-muted)">
            <p>
              Email:{" "}
              <a className="font-medium text-(--color-accent)" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
            <p>
              Phone:{" "}
              <a className="font-medium text-(--color-accent)" href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-(--color-ink)">What we can help with</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-(--color-muted)">
            <li>Service questions and onboarding help</li>
            <li>Billing and account updates</li>
            <li>Technical issues on the website</li>
            <li>Project changes or additional requests</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-[1.75rem] bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) p-6 text-white shadow-lg">
        <h2 className="text-xl font-semibold">Need a fast reply?</h2>
        <p className="mt-2 text-sm leading-6 opacity-90">
          Send us your name, service type, and a short note so we can route your request quickly.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-(--color-accent)">
            Open Contact Page
          </Link>
          <Link href="/help" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white">
            Visit Help Center
          </Link>
        </div>
      </div>
    </InfoPageShell>
  );
}

