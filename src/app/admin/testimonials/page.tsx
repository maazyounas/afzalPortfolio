import Link from "next/link";
import { getTestimonials } from "@/actions/testimonials";
import { TestimonialList } from "./TestimonialList";
import { Plus } from "lucide-react";


export const metadata = {
  title: "Testimonials | Softtech Financials",
  description: "Testimonials page of Softtech Financials.",
  keywords: ["portfolio", "testimonials", "Softtech Financials"],
  alternates: {
    canonical: "/admin/testimonials",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Testimonials | Softtech Financials",
    description: "Testimonials page of Softtech Financials.",
    url: "/admin/testimonials",
  },
};


export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Testimonials</h1>
          <p className="admin-page-subtitle">
            Manage client testimonials. Active ones are displayed on the site.
          </p>
        </div>
        <Link href="/admin/testimonials/new" className="admin-btn admin-btn-primary">
          <Plus size={16} aria-hidden="true" />
          New Testimonial
        </Link>
      </div>

      <TestimonialList testimonials={testimonials} />
    </div>
  );
}

