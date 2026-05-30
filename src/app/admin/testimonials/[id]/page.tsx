import { TestimonialForm } from "../TestimonialForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dbConnect from "@/lib/db/db";
import Testimonial from "@/models/Testimonial";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const testimonial = await Testimonial.findById(params.id);

  if (!testimonial) {
    notFound();
  }

  const initialData = JSON.parse(JSON.stringify(testimonial));

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/testimonials"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Testimonial</h1>
          <p className="text-sm text-neutral-400">Update the client testimonial details.</p>
        </div>
      </div>
      <TestimonialForm initialData={initialData} />
    </div>
  );
}
