import { notFound } from "next/navigation";
import { getBlogPostById } from "@/actions/blogs";
import { BlogForm } from "../BlogForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <p className="mt-2 text-neutral-400">
          Update the details for &ldquo;{post.title}&rdquo;
        </p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-6 sm:p-8">
        <BlogForm initialData={post} />
      </div>
    </div>
  );
}
