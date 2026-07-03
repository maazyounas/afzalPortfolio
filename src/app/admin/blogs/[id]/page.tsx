import { notFound } from "next/navigation";
import { getBlogPostById } from "@/actions/blogs";
import { BlogForm } from "../BlogForm";


export async function generateMetadata({ params }: any) {
  return {
    title: `${'[Id]'} | Softech Financials`,
    description: `Detailed view of ${'[Id]'} on Softech Financials.`,
    keywords: ["portfolio", "[id]", "Softech Financials"],
    alternates: {
      canonical: `/admin/blogs/[id]`, // Update dynamically if needed
    },
    openGraph: {
    images: ["/opengraph-image"],
      title: `${'[Id]'} | Softech Financials`,
      description: `Detailed view of ${'[Id]'} on Softech Financials.`,
      url: `/admin/blogs/[id]`,
    },
  };
}


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
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Post</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Update the details for &ldquo;{post.title}&rdquo;
        </p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 lg:p-8">
        <BlogForm initialData={post} />
      </div>
    </div>
  );
}
