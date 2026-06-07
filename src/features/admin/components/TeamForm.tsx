"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { TeamMemberSchema, type TeamMemberInput } from "@/validators/team";
import { createTeamMember, updateTeamMember } from "@/actions/team";
import { ITeamMember } from "@/models/TeamMember";
import { useState } from "react";
import { ImageUploadField } from "./ImageUploadField";

type TeamFormValues = z.input<typeof TeamMemberSchema>;
type TeamInitialData = Partial<TeamFormValues> & {
  _id?: string | { toString(): string };
};

interface TeamFormProps {
  initialData?: ITeamMember | TeamInitialData;
}

export function TeamForm({ initialData }: TeamFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEdit = !!initialData;

  // Specialties helper to convert array to string and vice versa
  const initialSpecialties = initialData?.specialties
    ? initialData.specialties.join(", ")
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TeamFormValues, unknown, TeamMemberInput>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      role: initialData?.role || "",
      bio: initialData?.bio || "",
      longBio: initialData?.longBio || "",
      image: initialData?.image || "",
      order: initialData?.order || 0,
      socialLinks: {
        linkedin: initialData?.socialLinks?.linkedin || "",
        twitter: initialData?.socialLinks?.twitter || "",
      },
    },
  });

  async function onSubmit(data: TeamFormValues) {
    setLoading(true);

    // Parse specialties comma-separated string from the raw input DOM
    const rawSpecialties = (document.getElementById("specialties-input") as HTMLInputElement)?.value || "";
    const specialtiesArray = rawSpecialties
      ? rawSpecialties.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const finalData: TeamMemberInput = {
      ...data,
      order: data.order || 0,
      specialties: specialtiesArray,
      image: data.image || undefined,
      socialLinks: {
        linkedin: data.socialLinks?.linkedin || undefined,
        twitter: data.socialLinks?.twitter || undefined,
      }
    };

    let result;
    if (isEdit) {
      result = await updateTeamMember(String(initialData?._id), finalData);
    } else {
      result = await createTeamMember(finalData);
    }

    if (result.success) {
      router.push("/admin/team");
      router.refresh();
    } else {
      alert(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-200">Full Name</label>
          <input
            {...register("name")}
            className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="e.g. Amina Rahman"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-200">Slug</label>
          <input
            {...register("slug")}
            className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="amina-rahman"
          />
          {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-200">Role</label>
          <input
            {...register("role")}
            className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="e.g. Managing Partner"
          />
          {errors.role && <p className="text-xs text-red-400">{errors.role.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-200">Display Order</label>
          <input
            type="number"
            {...register("order", { valueAsNumber: true })}
            className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          {errors.order && <p className="text-xs text-red-400">{errors.order.message}</p>}
        </div>
      </div>

      <ImageUploadField
        label="Team Member Image"
        helperText="Upload, drag, zoom, and crop the portrait before we save it."
        value={watch("image")}
        onChange={(url) => setValue("image", url, { shouldDirty: true, shouldValidate: true })}
        folder="team"
        aspectRatio={1}
      />
      {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>}

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Short Bio</label>
        <textarea
          {...register("bio")}
          rows={3}
          className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
          placeholder="Brief summary bio for the card..."
        />
        {errors.bio && <p className="text-xs text-red-400">{errors.bio.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Long Bio</label>
        <textarea
          {...register("longBio")}
          rows={5}
          className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
          placeholder="Full background/experience details..."
        />
        {errors.longBio && <p className="text-xs text-red-400">{errors.longBio.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Specialties (Comma Separated)</label>
        <input
          id="specialties-input"
          defaultValue={initialSpecialties}
          className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
          placeholder="Forecasting, close process, controls, board reporting"
        />
        {errors.specialties && <p className="text-xs text-red-400">{errors.specialties.message}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-200">LinkedIn URL</label>
          <input
            {...register("socialLinks.linkedin")}
            className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="https://linkedin.com/in/username"
          />
          {errors.socialLinks?.linkedin && <p className="text-xs text-red-400">{errors.socialLinks.linkedin.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-200">Twitter URL</label>
          <input
            {...register("socialLinks.twitter")}
            className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 text-white focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="https://twitter.com/username"
          />
          {errors.socialLinks?.twitter && <p className="text-xs text-red-400">{errors.socialLinks.twitter.message}</p>}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg px-6 py-2 text-sm font-medium text-neutral-400 transition-all hover:bg-white/5 hover:text-white sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--color-accent)] px-8 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Saving..." : isEdit ? "Update Member" : "Create Member"}
        </button>
      </div>
    </form>
  );
}
