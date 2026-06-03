import { FaqForm } from "../FaqForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dbConnect from "@/lib/db/db";
import Faq from "@/models/Faq";
import { notFound } from "next/navigation";

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
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/faq"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit FAQ</h1>
          <p className="text-sm text-neutral-400">Update the frequently asked question details.</p>
        </div>
      </div>
      <FaqForm initialData={initialData} />
    </div>
  );
}
