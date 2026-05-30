import Link from "next/link";
import { getFaqs } from "@/actions/faq";
import { FaqList } from "./FaqList";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const faqs = await getFaqs();

  return (
    <div>
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-2 text-neutral-400">
            Manage your FAQs. Active FAQs appear on the website.
          </p>
        </div>
        <Link
          href="/admin/faq/new"
          className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600"
        >
          + New FAQ
        </Link>
      </header>

      <FaqList faqs={faqs} />
    </div>
  );
}
