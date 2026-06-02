"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db/db";
import TeamMember from "@/models/TeamMember";
import { TeamMemberSchema, type TeamMemberInput } from "@/validators/team";
import slugify from "@/lib/slugify";

export async function createTeamMember(data: TeamMemberInput) {
  try {
    await dbConnect();
    const validatedData = TeamMemberSchema.parse({
      ...data,
      slug: data.slug ? slugify(data.slug) : slugify(data.name),
    });
    const member = await TeamMember.create(validatedData);
    revalidatePath("/admin/team");
    revalidatePath("/team");
    return { success: true, data: JSON.parse(JSON.stringify(member)) };
  } catch (error) {
    console.error("Failed to create team member:", error);
    return { error: "Failed to create team member" };
  }
}

export async function updateTeamMember(id: string, data: Partial<TeamMemberInput>) {
  try {
    await dbConnect();
    const updateData = { ...data };
    if (updateData.slug) {
      updateData.slug = slugify(updateData.slug);
    }
    const member = await TeamMember.findByIdAndUpdate(id, updateData, { new: true });
    revalidatePath("/admin/team");
    revalidatePath("/team");
    return { success: true, data: JSON.parse(JSON.stringify(member)) };
  } catch (error) {
    console.error("Failed to update team member:", error);
    return { error: "Failed to update team member" };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await dbConnect();
    await TeamMember.findByIdAndDelete(id);
    revalidatePath("/admin/team");
    revalidatePath("/team");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete team member:", error);
    return { error: "Failed to delete team member" };
  }
}

export async function getTeamMemberBySlug(slug: string) {
  try {
    await dbConnect();
    const normalizedSlug = slugify(slug);
    let member = await TeamMember.findOne({ slug });
    if (!member) {
      member = await TeamMember.findOne({ slug: normalizedSlug });
    }
    if (!member) {
      const altSlug = slug.replace(/-/g, " ");
      member = await TeamMember.findOne({ slug: altSlug });
    }
    if (!member) {
      const altSlug2 = slug.replace(/\s+/g, "-");
      member = await TeamMember.findOne({ slug: altSlug2 });
    }
    return member ? JSON.parse(JSON.stringify(member)) : null;
  } catch (error) {
    console.error("Failed to fetch team member by slug:", error);
    return null;
  }
}

export async function getTeamMembers() {
  try {
    await dbConnect();
    const members = await TeamMember.find().sort({ order: 1 });
    return JSON.parse(JSON.stringify(members));
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}
