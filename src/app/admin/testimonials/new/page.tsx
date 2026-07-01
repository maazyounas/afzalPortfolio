import { TestimonialForm } from "../TestimonialForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export const metadata = {
  title: "New | Afzal's Portfolio",
  description: "New page of Afzal's Portfolio.",
  keywords: ["portfolio", "new", "Afzal"],
  alternates: {
    canonical: "/admin/testimonials/new",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "New | Afzal's Portfolio",
    description: "New page of Afzal's Portfolio.",
    url: "/admin/testimonials/new",
  },
};


export default function NewTestimonialPage() {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          href="/admin/testimonials"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">New Testimonial</h1>
          <p className="max-w-xl text-sm text-neutral-400">Add a new client review.</p>
        </div>
      </div>
      <TestimonialForm />
    </div>
  );
}
