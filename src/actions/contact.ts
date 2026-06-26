"use server";

import { revalidatePath } from "next/cache";

import dbConnect from "@/lib/db/db";
import ContactMessage from "@/models/ContactMessage";

export async function getContactMessages() {
  try {
    await dbConnect();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return [];
  }
}

export async function markContactMessageRead(id: string, isRead: boolean) {
  try {
    await dbConnect();
    await ContactMessage.findByIdAndUpdate(id, { isRead });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to update contact message:", error);
    return { success: false, error: "Failed to update message status" };
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await dbConnect();
    await ContactMessage.findByIdAndDelete(id);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete contact message:", error);
    return { success: false, error: "Failed to delete message" };
  }
}
