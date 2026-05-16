"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db/db";
import Testimonial from "@/models/Testimonial";
import { TestimonialSchema, type TestimonialInput } from "@/validators/testimonial";

export async function createTestimonial(data: TestimonialInput) {
  try {
    await dbConnect();
    const validatedData = TestimonialSchema.parse(data);
    const testimonial = await Testimonial.create(validatedData);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true, data: JSON.parse(JSON.stringify(testimonial)) };
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return { error: "Failed to create testimonial" };
  }
}

export async function updateTestimonial(id: string, data: Partial<TestimonialInput>) {
  try {
    await dbConnect();
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true, data: JSON.parse(JSON.stringify(testimonial)) };
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return { error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await dbConnect();
    await Testimonial.findByIdAndDelete(id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return { error: "Failed to delete testimonial" };
  }
}

export async function getTestimonials() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}
