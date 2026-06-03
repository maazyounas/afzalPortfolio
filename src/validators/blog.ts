import { z } from "zod";

const imagePathSchema = z
  .string()
  .refine(
    (value) => !value || value.startsWith("/") || /^https?:\/\//.test(value),
    "Must be a valid image path or URL",
  );

export const BlogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(5, "Slug must be at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(2, "Category is required"),
  author: z.string().min(2, "Author is required"),
  featuredImage: imagePathSchema.optional().or(z.literal("")),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().optional(),
});

export type BlogPostInput = z.infer<typeof BlogPostSchema>;
