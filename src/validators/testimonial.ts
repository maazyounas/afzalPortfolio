import { z } from "zod";

export const TestimonialSchema = z.object({
  author: z.string().min(2, "Author is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  rating: z.number().min(1).max(5).default(5),
  image: z.string().url().optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;
