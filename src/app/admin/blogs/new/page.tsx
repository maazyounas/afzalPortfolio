import { BlogForm } from "../BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="mt-2 text-neutral-400">
          Fill in the details below to create a new blog article.
        </p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-6 sm:p-8">
        <BlogForm />
      </div>
    </div>
  );
}
