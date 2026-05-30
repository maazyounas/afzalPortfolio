"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db/db";
import Faq from "@/models/Faq";
import { FaqSchema, type FaqInput } from "@/validators/faq";

export async function createFaq(data: FaqInput) {
  try {
    await dbConnect();
    const validatedData = FaqSchema.parse(data);
    const faq = await Faq.create(validatedData);
    revalidatePath("/admin/faq");
    revalidatePath("/");
    return { success: true, data: JSON.parse(JSON.stringify(faq)) };
  } catch (error: any) {
    console.error("Failed to create FAQ:", error);
    const errorMessage = error?.errors?.[0]?.message || error?.message || "Failed to create FAQ";
    return { error: errorMessage };
  }
}

export async function updateFaq(id: string, data: Partial<FaqInput>) {
  try {
    await dbConnect();
    const faq = await Faq.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/admin/faq");
    revalidatePath("/");
    return { success: true, data: JSON.parse(JSON.stringify(faq)) };
  } catch (error: any) {
    console.error("Failed to update FAQ:", error);
    const errorMessage = error?.errors?.[0]?.message || error?.message || "Failed to update FAQ";
    return { error: errorMessage };
  }
}

export async function deleteFaq(id: string) {
  try {
    await dbConnect();
    await Faq.findByIdAndDelete(id);
    revalidatePath("/admin/faq");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete FAQ:", error);
    const errorMessage = error?.message || "Failed to delete FAQ";
    return { error: errorMessage };
  }
}

export async function getFaqs() {
  try {
    await dbConnect();
    const faqs = await Faq.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(faqs));
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return [];
  }
}
