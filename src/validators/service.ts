import { z } from "zod";

export const ServiceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

export type ServiceInput = z.infer<typeof ServiceSchema>;
