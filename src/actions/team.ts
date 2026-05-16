"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db/db";
import TeamMember from "@/models/TeamMember";
import { TeamMemberSchema, type TeamMemberInput } from "@/validators/team";

export async function createTeamMember(data: TeamMemberInput) {
  try {
    await dbConnect();
    const validatedData = TeamMemberSchema.parse(data);
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
    const member = await TeamMember.findByIdAndUpdate(id, data, { new: true });
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
