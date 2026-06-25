"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { ensureAdminCredential } from "@/lib/auth/admin-credential";
import {
  assertTrustedOrigin,
  throttleCredentialChange,
  throttleLoginAttempt,
} from "@/lib/security/auth-guards";
import { adminCredentialsSchema, adminLoginSchema } from "@/validators/admin";
import { formatError } from "@/lib/formatError";
import { revalidatePath } from "next/cache";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_me";
const secret = new TextEncoder().encode(JWT_SECRET);

async function createAdminToken(username: string) {
  return new SignJWT({ role: "admin", username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

export async function login(formData: FormData) {
  try {
    await assertTrustedOrigin();

    const parsed = adminLoginSchema.safeParse({
      username: getFormValue(formData, "username"),
      password: getFormValue(formData, "password"),
    });

    if (!parsed.success) {
      return {
        error: parsed.error.issues[0]?.message || "Invalid login details.",
      };
    }

    await throttleLoginAttempt(parsed.data.username);

    const credential = await ensureAdminCredential();
    const isUsernameValid = safeEqual(
      credential.username.toLowerCase(),
      parsed.data.username.toLowerCase()
    );
    const isPasswordValid = await bcrypt.compare(
      parsed.data.password,
      credential.passwordHash
    );

    if (!isUsernameValid || !isPasswordValid) {
      return { error: "Invalid username or password." };
    }

    const token = await createAdminToken(credential.username);

    (await cookies()).set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to log in admin:", error);
    return { error: formatError(error) };
  }
}

export async function updateAdminCredentials(formData: FormData) {
  try {
    await assertTrustedOrigin();

    const parsed = adminCredentialsSchema.safeParse({
      currentUsername: getFormValue(formData, "currentUsername"),
      currentPassword: getFormValue(formData, "currentPassword"),
      newUsername: getFormValue(formData, "newUsername"),
      newPassword: getFormValue(formData, "newPassword"),
      confirmNewPassword: getFormValue(formData, "confirmNewPassword"),
    });

    if (!parsed.success) {
      return {
        error: parsed.error.issues[0]?.message || "Please review the form inputs.",
      };
    }

    await throttleCredentialChange();

    const credential = await ensureAdminCredential();
    const isCurrentUsernameValid = safeEqual(
      credential.username.toLowerCase(),
      parsed.data.currentUsername.toLowerCase()
    );
    const isCurrentPasswordValid = await bcrypt.compare(
      parsed.data.currentPassword,
      credential.passwordHash
    );

    if (!isCurrentUsernameValid || !isCurrentPasswordValid) {
      return { error: "Current username or password is incorrect." };
    }

    credential.username = parsed.data.newUsername;
    credential.passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
    await credential.save();

    (await cookies()).delete("admin_token");
    revalidatePath("/admin/login");
    revalidatePath("/admin/change-password");

    return {
      success: true,
      message: "Credentials updated successfully. Please sign in again.",
    };
  } catch (error) {
    console.error("Failed to update admin credentials:", error);
    return { error: formatError(error) };
  }
}

export async function logout() {
  (await cookies()).delete("admin_token");
  return { success: true };
}
