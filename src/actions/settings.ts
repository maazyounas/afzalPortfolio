"use server";

import dbConnect from "@/lib/db/db";
import Settings, { ISettings } from "@/models/Settings";

export async function getSettings() {
  try {
    await dbConnect();
    const settings = await Settings.findOne();
    return settings ? JSON.parse(JSON.stringify(settings)) : null;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export async function updateSettings(data: Partial<ISettings>) {
  try {
    await dbConnect();
    const settings = await Settings.findOneAndUpdate({}, data, {
      upsert: true,
      new: true,
    });
    return { success: true, data: JSON.parse(JSON.stringify(settings)) };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { error: "Failed to update settings" };
  }
}
