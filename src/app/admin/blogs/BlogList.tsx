"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Pencil, Eye, EyeOff } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-16 text-center">
        <p className="text-lg font-semibold text-neutral-300">No blog posts yet</p>
        <p className="mt-2 text-sm text-neutral-500">Create your first blog post to get started.</p>
        <Link
          href="/admin/blogs/new"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600"
        >
          + Create First Post
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/10 bg-white/5">
          <tr>
            <th className="px-6 py-4 font-semibold text-neutral-300">Title</th>
            <th className="hidden px-6 py-4 font-semibold text-neutral-300 md:table-cell">Category</th>
            <th className="hidden px-6 py-4 font-semibold text-neutral-300 lg:table-cell">Author</th>
            <th className="px-6 py-4 font-semibold text-neutral-300">Status</th>
            <th className="hidden px-6 py-4 font-semibold text-neutral-300 md:table-cell">Date</th>
            <th className="px-6 py-4 text-right font-semibold text-neutral-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {posts.map((post) => (
            <tr
              key={post._id}
              className="transition-colors hover:bg-white/[0.03]"
            >
              <td className="px-6 py-4">
                <p className="font-medium text-white truncate max-w-[250px]">{post.title}</p>
                <p className="mt-0.5 text-xs text-neutral-500 truncate max-w-[250px]">/blog/{post.slug}</p>
              </td>
              <td className="hidden px-6 py-4 md:table-cell">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                  {post.category}
                </span>
              </td>
              <td className="hidden px-6 py-4 text-neutral-400 lg:table-cell">{post.author}</td>
              <td className="px-6 py-4">
                {post.isPublished ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400">
                    <Eye className="h-3.5 w-3.5" /> Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-400">
                    <EyeOff className="h-3.5 w-3.5" /> Draft
                  </span>
                )}
              </td>
              <td className="hidden px-6 py-4 text-neutral-500 md:table-cell">{formatDate(post.createdAt)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/blogs/${post._id}`}
                    className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    disabled={deleting === post._id}
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
