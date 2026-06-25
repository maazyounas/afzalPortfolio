import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db/db";
import AdminCredential from "@/models/AdminCredential";

export const DEFAULT_ADMIN_USERNAME = "afzal@gmail.com";
export const DEFAULT_ADMIN_PASSWORD = "Admin@123";
export const ADMIN_KEY = "admin";

export async function ensureAdminCredential() {
  await dbConnect();

  const existingCredential = await AdminCredential.findOne({ key: ADMIN_KEY });

  if (existingCredential) {
    return existingCredential;
  }

  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);
  return AdminCredential.create({
    key: ADMIN_KEY,
    username: DEFAULT_ADMIN_USERNAME,
    passwordHash,
  });
}

export async function getAdminCredentialSummary() {
  try {
    const credential = await ensureAdminCredential();
    return {
      username: credential.username,
    };
  } catch (error) {
    console.error("Failed to load admin credential summary:", error);
    return {
      username: DEFAULT_ADMIN_USERNAME,
    };
  }
}
