import { z } from "zod";

export const FaqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type FaqInput = z.infer<typeof FaqSchema>;
