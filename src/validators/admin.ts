import { z } from "zod";

export const adminLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(254, "Username is too long."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password is too long."),
});

export const adminCredentialsSchema = z
  .object({
    currentUsername: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid current email address.")
      .max(254, "Current username is too long."),
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters.")
      .max(128, "Current password is too long."),
    newUsername: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid new email address.")
      .max(254, "New username is too long."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters.")
      .max(128, "New password is too long."),
    confirmNewPassword: z
      .string()
      .min(8, "Please confirm the new password.")
      .max(128, "Confirmation password is too long."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match.",
    path: ["confirmNewPassword"],
  });
