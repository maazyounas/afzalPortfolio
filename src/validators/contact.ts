import { z } from "zod";

export const ContactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .max(120, "Subject is too long")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactSubmissionInput = z.infer<typeof ContactSubmissionSchema>;
