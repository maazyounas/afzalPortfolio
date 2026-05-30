import Link from "next/link";
import { getTestimonials } from "@/actions/testimonials";
import { TestimonialList } from "./TestimonialList";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="mt-2 text-neutral-400">
            Manage client testimonials. Active ones will be displayed on the site.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600"
        >
          + New Testimonial
        </Link>
      </header>

      <TestimonialList testimonials={testimonials} />
    </div>
  );
}
