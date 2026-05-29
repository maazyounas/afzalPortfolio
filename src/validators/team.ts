import { z } from "zod";

export const TeamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  role: z.string().min(2, "Role is required"),
  bio: z.string().optional(),
  longBio: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  image: z.string().url("Must be a valid image URL").optional().or(z.literal("")),
  order: z.number().default(0),
  socialLinks: z.object({
    linkedin: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
  }).optional(),
});

export type TeamMemberInput = z.infer<typeof TeamMemberSchema>;
