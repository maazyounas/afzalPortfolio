"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db/db";
import Settings from "@/models/Settings";
import { formatError } from "@/lib/formatError";
import { siteConfig } from "@/lib/data/site-config";

function normalizeSiteName(siteName?: string | null) {
  if (!siteName) {
    return siteConfig.name;
  }

  const trimmed = siteName.trim();

  if (/^softech/i.test(trimmed)) {
    return siteConfig.name;
  }

  return trimmed;
}

const fallbackSettings = {
  siteName: siteConfig.name,
  siteDescription: siteConfig.description,
  companyName: siteConfig.company.legalName,
  contactEmail: siteConfig.company.email,
  contactPhone: siteConfig.company.phone,
  email: siteConfig.company.email,
  phone: siteConfig.company.phone,
  address: siteConfig.location.address,
  mapLocation: siteConfig.location.address,
  mapLatitude: null,
  mapLongitude: null,
  website: siteConfig.url,
  logoUrl: "",
  workingHours: siteConfig.businessHours,
};

export async function getSettings() {
  if (!process.env.MONGODB_URI) {
    return fallbackSettings;
  }

  try {
    await dbConnect();
    const settings = await Settings.findOne({});

    if (!settings) {
      return fallbackSettings;
    }

    const serialized = JSON.parse(JSON.stringify(settings));

    return {
      ...serialized,
      siteName: normalizeSiteName(serialized.siteName),
    };
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return fallbackSettings;
  }
}

export async function updateSettings(data: Record<string, unknown>) {
  try {
    if (!process.env.MONGODB_URI) {
      return { success: false, error: "Database is not configured" };
    }

    await dbConnect();
    const settings = await Settings.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");

    return { success: true, data: JSON.parse(JSON.stringify(settings)) };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: formatError(error) };
  }
}
