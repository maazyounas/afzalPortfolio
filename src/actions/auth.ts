"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function login(formData: FormData) {
  const password = formData.get("password");

  if (password !== ADMIN_PASSWORD) {
    return { error: "Invalid password" };
  }

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);

  (await cookies()).set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return { success: true };
}

export async function logout() {
  (await cookies()).delete("admin_token");
  return { success: true };
}
