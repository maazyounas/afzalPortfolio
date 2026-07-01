import { FaqForm } from "../FaqForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dbConnect from "@/lib/db/db";
import Faq from "@/models/Faq";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: any) {
  return {
    title: `${'[Id]'} | Afzal's Portfolio`,
    description: `Detailed view of ${'[Id]'} on Afzal's Portfolio.`,
    keywords: ["portfolio", "[id]", "Afzal"],
    alternates: {
      canonical: `/admin/faq/[id]`, // Update dynamically if needed
    },
    openGraph: {
    images: ["/opengraph-image"],
      title: `${'[Id]'} | Afzal's Portfolio`,
      description: `Detailed view of ${'[Id]'} on Afzal's Portfolio.`,
      url: `/admin/faq/[id]`,
    },
  };
}


type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditFaqPage({ params }: Props) {
  const { id } = await params;
  await dbConnect();
  const faq = await Faq.findById(id);

  if (!faq) {
    notFound();
  }

  const initialData = JSON.parse(JSON.stringify(faq));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          href="/admin/faq"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Edit FAQ</h1>
          <p className="max-w-xl text-sm text-neutral-400">Update the frequently asked question details.</p>
        </div>
      </div>
      <FaqForm initialData={initialData} />
    </div>
  );
}
