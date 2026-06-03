import { z } from "zod";

const imagePathSchema = z
  .string()
  .refine(
    (value) => !value || value.startsWith("/") || /^https?:\/\//.test(value),
    "Must be a valid image path or URL",
  );

export const TestimonialSchema = z.object({
  author: z.string().min(2, "Author is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  rating: z.number().min(1).max(5).default(5),
  image: imagePathSchema.optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;
