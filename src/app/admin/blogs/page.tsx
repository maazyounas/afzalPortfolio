import Link from "next/link";
import { getBlogPosts } from "@/actions/blogs";
import { BlogList } from "./BlogList";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="mt-2 text-neutral-400">
            Manage all your blog articles. Published posts appear on the website.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600"
        >
          + New Post
        </Link>
      </header>

      <BlogList posts={posts} />
    </div>
  );
}
