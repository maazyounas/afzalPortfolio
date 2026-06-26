"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Pencil, Eye, EyeOff, Plus } from "lucide-react";
import { deleteBlogPost } from "@/actions/blogs";

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  isPublished: boolean;
  createdAt: string;
};

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(id);
    const result = await deleteBlogPost(id);
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

  if (posts.length === 0) {
    return (
      <div className="admin-table-wrapper">
        <div className="admin-table-empty" style={{ padding: "64px 20px" }}>
          <div className="admin-table-empty-title">No blog posts yet</div>
          <div className="admin-table-empty-desc" style={{ marginBottom: 20 }}>
            Create your first blog post to get started.
          </div>
          <Link href="/admin/blogs/new" className="admin-btn admin-btn-primary admin-btn-sm">
            <Plus size={14} />
            Create First Post
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
              <th>Title</th>
              <th style={{ display: "none" }} className="md-show">Category</th>
              <th style={{ display: "none" }} className="lg-show">Author</th>
              <th>Status</th>
              <th style={{ display: "none" }} className="md-show">Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>
                  <p style={{ fontWeight: 600, color: "var(--admin-primary)", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {post.title}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--admin-muted)", marginTop: 2, fontFamily: "monospace" }}>
                    /blog/{post.slug}
                  </p>
                </td>
                <td>
                  <span className="admin-badge admin-badge-info">{post.category}</span>
                </td>
                <td style={{ color: "var(--admin-text-secondary)", fontSize: 13 }}>
                  {post.author}
                </td>
                <td>
                  {post.isPublished ? (
                    <span className="admin-badge admin-badge-success">
                      <Eye size={10} /> Published
                    </span>
                  ) : (
                    <span className="admin-badge admin-badge-warning">
                      <EyeOff size={10} /> Draft
                    </span>
                  )}
                </td>
                <td style={{ color: "var(--admin-muted)", fontSize: 13 }}>
                  {formatDate(post.createdAt)}
                </td>
                <td>
                  <div className="admin-action-row">
                    <Link
                      href={`/admin/blogs/${post._id}`}
                      className="admin-btn-icon"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      disabled={deleting === post._id}
                      className="admin-btn-icon danger"
                      title="Delete"
                      style={{ opacity: deleting === post._id ? 0.5 : 1 }}
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
