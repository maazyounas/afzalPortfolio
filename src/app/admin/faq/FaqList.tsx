"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Pencil, Eye, EyeOff, Plus } from "lucide-react";
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
      <div className="admin-table-wrapper">
        <div className="admin-table-empty" style={{ padding: "64px 20px" }}>
          <div className="admin-table-empty-title">No FAQs yet</div>
          <div className="admin-table-empty-desc" style={{ marginBottom: 20 }}>
            Create your first FAQ to get started.
          </div>
          <Link href="/admin/faq/new" className="admin-btn admin-btn-primary admin-btn-sm">
            <Plus size={14} />
            Create First FAQ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <div className="admin-table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq._id}>
                <td>
                  <p style={{ fontWeight: 500, color: "var(--admin-primary)", maxWidth: 380, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {faq.question}
                  </p>
                </td>
                <td>
                  <span className="admin-badge admin-badge-info">
                    {faq.category || "General"}
                  </span>
                </td>
                <td>
                  {faq.isActive ? (
                    <span className="admin-badge admin-badge-success">
                      <Eye size={10} /> Active
                    </span>
                  ) : (
                    <span className="admin-badge admin-badge-warning">
                      <EyeOff size={10} /> Hidden
                    </span>
                  )}
                </td>
                <td style={{ color: "var(--admin-muted)", fontSize: 13 }}>
                  {formatDate(faq.createdAt)}
                </td>
                <td>
                  <div className="admin-action-row">
                    <Link
                      href={`/admin/faq/${faq._id}`}
                      className="admin-btn-icon"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      disabled={deleting === faq._id}
                      className="admin-btn-icon danger"
                      title="Delete"
                      style={{ opacity: deleting === faq._id ? 0.5 : 1 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
