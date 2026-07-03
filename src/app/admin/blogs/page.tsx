import Link from "next/link";
import { getBlogPosts } from "@/actions/blogs";
import { BlogList } from "./BlogList";
import { Plus } from "lucide-react";


export const metadata = {
  title: "Blogs | Softech Financials",
  description: "Blogs page of Softech Financials.",
  keywords: ["portfolio", "blogs", "Softech Financials"],
  alternates: {
    canonical: "/admin/blogs",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Blogs | Softech Financials",
    description: "Blogs page of Softech Financials.",
    url: "/admin/blogs",
  },
};


export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Blog Posts</h1>
          <p className="admin-page-subtitle">
            Manage your blog articles. Published posts appear on the website.
          </p>
        </div>
        <Link href="/admin/blogs/new" className="admin-btn admin-btn-primary">
          <Plus size={16} aria-hidden="true" />
          New Post
        </Link>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}
