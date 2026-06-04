"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db/db";
import Service from "@/models/Service";
import { ServiceSchema, type ServiceInput } from "@/validators/service";
import { formatError } from "@/lib/formatError";
import slugify from "@/lib/slugify";
import { sanitizeRichText } from "@/lib/utils/richText";

export async function createService(data: ServiceInput) {
  try {
    await dbConnect();
    // Ensure slug is URL-friendly (lowercase, hyphens)
    let validatedData = ServiceSchema.parse(data);
    if (!validatedData.slug) {
      validatedData = {
        ...validatedData,
        slug: slugify(validatedData.name),
      };
    } else {
      // sanitize provided slug
      validatedData.slug = slugify(validatedData.slug);
    }
    if (validatedData.content) {
      validatedData.content = sanitizeRichText(validatedData.content);
    }
    const service = await Service.create(validatedData);
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { success: true, data: JSON.parse(JSON.stringify(service)) };
  } catch (error: any) {
    console.error("Failed to create service:", error);
    const errorMessage = formatError(error);
    return { error: errorMessage };
  }
}

export async function updateService(id: string, data: Partial<ServiceInput>) {
  try {
    await dbConnect();
    const updateData = { ...data };
    if (updateData.slug) {
      updateData.slug = slugify(updateData.slug);
    }
    if (updateData.content) {
      updateData.content = sanitizeRichText(updateData.content);
    }
    const service = await Service.findByIdAndUpdate(id, updateData, { new: true });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { success: true, data: JSON.parse(JSON.stringify(service)) };
  } catch (error) {
    console.error("Failed to update service:", error);
    return { error: "Failed to update service" };
  }
}

export async function deleteService(id: string) {
  try {
    await dbConnect();
    await Service.findByIdAndDelete(id);
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { error: "Failed to delete service" };
  }
}

export async function getServices(activeOnly = false) {
  try {
    await dbConnect();
    const filter = activeOnly ? { isActive: true } : {};
    const services = await Service.find(filter).sort({ order: 1, name: 1 });
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    await dbConnect();
    const normalizedSlug = slugify(slug);
    let service = await Service.findOne({ slug });
    if (!service) {
      service = await Service.findOne({ slug: normalizedSlug });
    }
    if (!service) {
      const altSlug1 = slug.replace(/-/g, " ");
      service = await Service.findOne({ slug: altSlug1 });
    }
    if (!service) {
      const altSlug2 = slug.replace(/\s+/g, "-");
      service = await Service.findOne({ slug: altSlug2 });
    }
    return service ? JSON.parse(JSON.stringify(service)) : null;
  } catch (error) {
    console.error("Failed to fetch service by slug:", error);
    return null;
  }
}
