"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Pencil, Eye, EyeOff } from "lucide-react";
import { deleteFaq } from "@/actions/faq";

type FaqItem = {
  _id: string;
  question: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
};

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    setDeleting(id);
    const result = await deleteFaq(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to delete");
    }
    setDeleting(null);
  }

  function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr));
  }

  if (faqs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-16 text-center">
        <p className="text-lg font-semibold text-neutral-300">No FAQs yet</p>
        <p className="mt-2 text-sm text-neutral-500">Create your first FAQ to get started.</p>
        <Link
          href="/admin/faq/new"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600"
        >
          + Create First FAQ
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/10 bg-white/5">
          <tr>
            <th className="px-6 py-4 font-semibold text-neutral-300">Question</th>
            <th className="hidden px-6 py-4 font-semibold text-neutral-300 md:table-cell">Category</th>
            <th className="px-6 py-4 font-semibold text-neutral-300">Status</th>
            <th className="hidden px-6 py-4 font-semibold text-neutral-300 md:table-cell">Date</th>
            <th className="px-6 py-4 text-right font-semibold text-neutral-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {faqs.map((faq) => (
            <tr key={faq._id} className="transition-colors hover:bg-white/[0.03]">
              <td className="px-6 py-4">
                <p className="font-medium text-white truncate max-w-[350px]">{faq.question}</p>
              </td>
              <td className="hidden px-6 py-4 md:table-cell">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                  {faq.category || "General"}
                </span>
              </td>
              <td className="px-6 py-4">
                {faq.isActive ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400">
                    <Eye className="h-3.5 w-3.5" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-400">
                    <EyeOff className="h-3.5 w-3.5" /> Hidden
                  </span>
                )}
              </td>
              <td className="hidden px-6 py-4 text-neutral-500 md:table-cell">{formatDate(faq.createdAt)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/faq/${faq._id}`}
                    className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    disabled={deleting === faq._id}
                    className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
