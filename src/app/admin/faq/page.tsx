import Link from "next/link";
import { getFaqs } from "@/actions/faq";
import { FaqList } from "./FaqList";
import { Plus } from "lucide-react";


export const metadata = {
  title: "Faq | Afzal's Portfolio",
  description: "Faq page of Afzal's Portfolio.",
  keywords: ["portfolio", "faq", "Afzal"],
  alternates: {
    canonical: "/admin/faq",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Faq | Afzal's Portfolio",
    description: "Faq page of Afzal's Portfolio.",
    url: "/admin/faq",
  },
};


export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const faqs = await getFaqs();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Frequently Asked Questions</h1>
          <p className="admin-page-subtitle">
            Manage your FAQs. Active items are displayed on the website.
          </p>
        </div>
        <Link href="/admin/faq/new" className="admin-btn admin-btn-primary">
          <Plus size={16} aria-hidden="true" />
          New FAQ
        </Link>
      </div>

      <FaqList faqs={faqs} />
    </div>
  );
}
