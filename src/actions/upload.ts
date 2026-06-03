"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { randomUUID } from "crypto";

type UploadFolder = "team" | "blogs" | "testimonials";

async function uploadImageToFolder(formData: FormData, folder: UploadFolder) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "Only image files are allowed" };
    }
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "Image must be 10MB or smaller" };
    }

    const extension = file.type.split("/")[1] || "png";
    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;

    // Ensure directory exists
    const uploadDir = join(process.cwd(), "public", "uploads", folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Write file
    const filePath = join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    // Return the public URL
    const publicUrl = `/uploads/${folder}/${fileName}`;
    return { success: true, url: publicUrl, fileName };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to upload image" };
  }
}

export async function uploadTeamImage(formData: FormData) {
  return uploadImageToFolder(formData, "team");
}

export async function uploadBlogImage(formData: FormData) {
  return uploadImageToFolder(formData, "blogs");
}

export async function uploadTestimonialImage(formData: FormData) {
  return uploadImageToFolder(formData, "testimonials");
}
