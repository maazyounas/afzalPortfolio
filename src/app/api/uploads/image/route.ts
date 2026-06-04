import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

const ALLOWED_FOLDERS = new Set(["team", "blogs", "testimonials"]);

function createSignature(params: Record<string, string>, apiSecret: string) {
  const stringToSign = Object.entries(params)
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto.createHash("sha1").update(`${stringToSign}${apiSecret}`).digest("hex");
}

export async function POST(request: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ success: false, error: "Cloudinary is not configured." }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "");

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ success: false, error: "Invalid upload folder." }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "No file provided." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "Only image files are allowed." }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = createSignature({ folder, timestamp }, apiSecret);
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("api_key", apiKey);
    uploadForm.append("timestamp", timestamp);
    uploadForm.append("signature", signature);
    uploadForm.append("folder", folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: uploadForm,
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: payload?.error?.message || "Image upload failed." },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      url: payload.secure_url,
      publicId: payload.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json({ success: false, error: "Failed to upload image." }, { status: 500 });
  }
}
