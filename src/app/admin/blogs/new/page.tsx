import { BlogForm } from "../BlogForm";


export const metadata = {
  title: "New | Afzal's Portfolio",
  description: "New page of Afzal's Portfolio.",
  keywords: ["portfolio", "new", "Afzal"],
  alternates: {
    canonical: "/admin/blogs/new",
  },
  openGraph: {
    title: "New | Afzal's Portfolio",
    description: "New page of Afzal's Portfolio.",
    url: "/admin/blogs/new",
  },
};


export default function NewBlogPostPage() {
  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Create New Post</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Fill in the details below to create a new blog article.
        </p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 lg:p-8">
        <BlogForm />
      </div>
    </div>
  );
}
