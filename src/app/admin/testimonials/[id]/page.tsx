import { TestimonialForm } from "../TestimonialForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dbConnect from "@/lib/db/db";
import Testimonial from "@/models/Testimonial";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: any) {
  return {
    title: `${'[Id]'} | Softech Financials`,
    description: `Detailed view of ${'[Id]'} on Softech Financials.`,
    keywords: ["portfolio", "[id]", "Softech Financials"],
    alternates: {
      canonical: `/admin/testimonials/[id]`, // Update dynamically if needed
    },
    openGraph: {
    images: ["/opengraph-image"],
      title: `${'[Id]'} | Softech Financials`,
      description: `Detailed view of ${'[Id]'} on Softech Financials.`,
      url: `/admin/testimonials/[id]`,
    },
  };
}


type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  await dbConnect();
  const testimonial = await Testimonial.findById(id);

  if (!testimonial) {
    notFound();
  }

  const initialData = JSON.parse(JSON.stringify(testimonial));

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
          <h1 className="text-2xl font-bold sm:text-3xl">Edit Testimonial</h1>
          <p className="max-w-xl text-sm text-neutral-400">Update the client testimonial details.</p>
        </div>
      </div>
      <TestimonialForm initialData={initialData} />
    </div>
  );
}
