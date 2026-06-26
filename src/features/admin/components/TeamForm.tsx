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
    <div className="admin-card" style={{ maxWidth: 800 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-card-body" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Full Name</label>
            <input
              {...register("name")}
              className={`admin-input${errors.name ? " error" : ""}`}
              placeholder="e.g. Amina Rahman"
            />
            {errors.name && <p className="admin-field-error">{errors.name.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Slug</label>
            <input
              {...register("slug")}
              className={`admin-input${errors.slug ? " error" : ""}`}
              placeholder="amina-rahman"
            />
            {errors.slug && <p className="admin-field-error">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Role</label>
            <input
              {...register("role")}
              className={`admin-input${errors.role ? " error" : ""}`}
              placeholder="e.g. Managing Partner"
            />
            {errors.role && <p className="admin-field-error">{errors.role.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Display Order</label>
            <input
              type="number"
              {...register("order", { valueAsNumber: true })}
              className={`admin-input${errors.order ? " error" : ""}`}
            />
            {errors.order && <p className="admin-field-error">{errors.order.message}</p>}
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
        {errors.image && <p className="admin-field-error">{errors.image.message}</p>}

        <div className="admin-form-group">
          <label className="admin-label">Short Bio</label>
          <textarea
            {...register("bio")}
            className={`admin-textarea${errors.bio ? " error" : ""}`}
            placeholder="Brief summary bio for the card..."
            style={{ minHeight: 80 }}
          />
          {errors.bio && <p className="admin-field-error">{errors.bio.message}</p>}
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Long Bio</label>
          <textarea
            {...register("longBio")}
            className={`admin-textarea${errors.longBio ? " error" : ""}`}
            placeholder="Full background/experience details..."
            style={{ minHeight: 120 }}
          />
          {errors.longBio && <p className="admin-field-error">{errors.longBio.message}</p>}
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Specialties (Comma Separated)</label>
          <input
            id="specialties-input"
            defaultValue={initialSpecialties}
            className={`admin-input${errors.specialties ? " error" : ""}`}
            placeholder="Forecasting, close process, controls, board reporting"
          />
          {errors.specialties && <p className="admin-field-error">{errors.specialties.message}</p>}
        </div>

        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Social Links</h3>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">LinkedIn URL</label>
              <input
                {...register("socialLinks.linkedin")}
                className={`admin-input${errors.socialLinks?.linkedin ? " error" : ""}`}
                placeholder="https://linkedin.com/in/username"
              />
              {errors.socialLinks?.linkedin && <p className="admin-field-error">{errors.socialLinks.linkedin.message}</p>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Twitter URL</label>
              <input
                {...register("socialLinks.twitter")}
                className={`admin-input${errors.socialLinks?.twitter ? " error" : ""}`}
                placeholder="https://twitter.com/username"
              />
              {errors.socialLinks?.twitter && <p className="admin-field-error">{errors.socialLinks.twitter.message}</p>}
            </div>
          </div>
        </div>

        <div className="admin-form-footer">
          <button
            type="button"
            onClick={() => router.back()}
            className="admin-btn admin-btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary"
          >
            {loading ? "Saving..." : isEdit ? "Update Member" : "Create Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
