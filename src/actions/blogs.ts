"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db/db";
import BlogPost from "@/models/BlogPost";
import { BlogPostSchema, type BlogPostInput } from "@/validators/blog";

export async function createBlogPost(data: BlogPostInput) {
  try {
    await dbConnect();
    const validatedData = BlogPostSchema.parse(data);
    const post = await BlogPost.create(validatedData);
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true, data: JSON.parse(JSON.stringify(post)) };
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return { error: "Failed to create blog post" };
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPostInput>) {
  try {
    await dbConnect();
    const post = await BlogPost.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, data: JSON.parse(JSON.stringify(post)) };
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return { error: "Failed to update blog post" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await dbConnect();
    await BlogPost.findByIdAndDelete(id);
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return { error: "Failed to delete blog post" };
  }
}

export async function getBlogPosts() {
  try {
    await dbConnect();
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}
