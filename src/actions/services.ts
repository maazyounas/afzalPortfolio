"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db/db";
import Service from "@/models/Service";
import { ServiceSchema, type ServiceInput } from "@/validators/service";

export async function createService(data: ServiceInput) {
  try {
    await dbConnect();
    const validatedData = ServiceSchema.parse(data);
    const service = await Service.create(validatedData);
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { success: true, data: JSON.parse(JSON.stringify(service)) };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { error: "Failed to create service" };
  }
}

export async function updateService(id: string, data: Partial<ServiceInput>) {
  try {
    await dbConnect();
    const service = await Service.findByIdAndUpdate(id, data, { new: true });
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

export async function getServices() {
  try {
    await dbConnect();
    const services = await Service.find().sort({ order: 1 });
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}
