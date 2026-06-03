"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { TeamMemberSchema, type TeamMemberInput } from "@/validators/team";
import { createTeamMember, updateTeamMember } from "@/actions/team";
import { ITeamMember } from "@/models/TeamMember";
import { useState, useEffect, useRef } from "react";
import { uploadTeamImage } from "@/actions/upload";
import { Upload, X } from "lucide-react";

type TeamFormValues = z.input<typeof TeamMemberSchema>;
type TeamInitialData = Partial<TeamFormValues> & {
  _id?: string | { toString(): string };
};

interface TeamFormProps {
  initialData?: ITeamMember | TeamInitialData;
}

export function TeamForm({ initialData }: TeamFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setUploading(true);
    setUploadProgress("Uploading...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadTeamImage(formData);

      if (result.success) {
        setUploadProgress(null);
        setValue("image", result.url);
      } else {
        alert(result.error || "Upload failed");
        setUploadProgress(null);
      }
    } catch (error) {
      alert("Upload error: " + (error instanceof Error ? error.message : "Unknown error"));
      setUploadProgress(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };



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

      {/* Image Upload - Full Width */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Team Member Image</label>
        
        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-xl border-2 border-dashed transition-all p-6 text-center cursor-pointer ${
            dragActive
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
              : "border-white/20 bg-white/[0.02] hover:border-white/30"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-6 w-6 text-[var(--color-accent)]" />
            <div>
              <p className="text-sm font-medium text-white">Drag image here or click to browse</p>
              <p className="text-xs text-neutral-400">PNG, JPG, WebP (any size)</p>
            </div>
          </div>

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm">
              <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent mx-auto mb-2" />
                <p className="text-xs text-white">{uploadProgress}</p>
              </div>
            </div>
          )}
        </div>

        {/* Image Preview */}
        {watch("image") && (
          <div className="relative rounded-lg overflow-hidden bg-white/5 border border-white/10 h-48">
            <img
              src={watch("image") || ""}
              alt="preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "";
              }}
            />
            <button
              type="button"
              onClick={() => setValue("image", "")}
              className="absolute top-2 right-2 rounded-full bg-red-500/80 hover:bg-red-600 p-1 transition-all"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        )}

        {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>}
      </div>

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

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg px-6 py-2 text-sm font-medium text-neutral-400 transition-all hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--color-accent)] px-8 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update Member" : "Create Member"}
        </button>
      </div>
    </form>
  );
}
