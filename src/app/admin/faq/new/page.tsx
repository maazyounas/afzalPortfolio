import { FaqForm } from "../FaqForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewFaqPage() {
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
          <h1 className="text-2xl font-bold">New FAQ</h1>
          <p className="text-sm text-neutral-400">Add a new frequently asked question.</p>
        </div>
      </div>
      <FaqForm />
    </div>
  );
}
