"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Pencil, Eye, EyeOff, Plus } from "lucide-react";
import { deleteTestimonial } from "@/actions/testimonials";

type TestimonialItem = {
  _id: string;
  author: string;
  role?: string;
  company?: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
};

export function TestimonialList({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setDeleting(id);
    const result = await deleteTestimonial(id);
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

  if (testimonials.length === 0) {
    return (
      <div className="admin-table-wrapper">
        <div className="admin-table-empty" style={{ padding: "64px 20px" }}>
          <div className="admin-table-empty-title">No testimonials yet</div>
          <div className="admin-table-empty-desc" style={{ marginBottom: 20 }}>
            Create your first testimonial to get started.
          </div>
          <Link href="/admin/testimonials/new" className="admin-btn admin-btn-primary admin-btn-sm">
            <Plus size={14} />
            Create First Testimonial
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
              <th>Author</th>
              <th>Role / Company</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((item) => (
              <tr key={item._id}>
                <td>
                  <p style={{ fontWeight: 600, color: "var(--admin-primary)" }}>{item.author}</p>
                </td>
                <td style={{ color: "var(--admin-text-secondary)", fontSize: 13 }}>
                  {item.role} {item.company && `at ${item.company}`}
                </td>
                <td>
                  <span className="admin-badge admin-badge-neutral">
                    ★ {item.rating} / 5
                  </span>
                </td>
                <td>
                  {item.isActive ? (
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
                  {formatDate(item.createdAt)}
                </td>
                <td>
                  <div className="admin-action-row">
                    <Link
                      href={`/admin/testimonials/${item._id}`}
                      className="admin-btn-icon"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deleting === item._id}
                      className="admin-btn-icon danger"
                      title="Delete"
                      style={{ opacity: deleting === item._id ? 0.5 : 1 }}
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
