"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm, useWatch } from "react-hook-form";
import { updateSettings } from "@/actions/settings";
import type { ISettings } from "@/models/Settings";

const LocationMapPicker = dynamic(
  () => import("@/features/admin/components/LocationMapPicker").then((module) => module.LocationMapPicker),
  { ssr: false },
);

type FormData = {
  siteName: string;
  description: string;
  url: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  mapLocation: string;
  mapLatitude?: number;
  mapLongitude?: number;
  socialLinks: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
};

export default function SettingsForm({ initialData }: { initialData: Partial<ISettings> | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      siteName: initialData?.siteName || "",
      description: initialData?.description || "",
      url: initialData?.url || "",
      contactEmail: initialData?.contactEmail || "",
      contactPhone: initialData?.contactPhone || "",
      address: initialData?.address || "",
      mapLocation: initialData?.mapLocation || "",
      mapLatitude: initialData?.mapLatitude,
      mapLongitude: initialData?.mapLongitude,
      socialLinks: {
        linkedin: initialData?.socialLinks?.linkedin || "",
        twitter: initialData?.socialLinks?.twitter || "",
        facebook: initialData?.socialLinks?.facebook || "",
      },
    },
  });

  const mapLocation = useWatch({ control, name: "mapLocation" });
  const mapLatitude = useWatch({ control, name: "mapLatitude" });
  const mapLongitude = useWatch({ control, name: "mapLongitude" });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setMessage(null);

    const result = await updateSettings(data);

    if (result.success) {
      setMessage({ text: "Settings updated successfully!", type: "success" });
    } else {
      setMessage({ text: result.error || "Failed to update settings.", type: "error" });
    }

    setIsSubmitting(false);
  };

  const inputClasses = "mt-2 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]";
  const labelClasses = "block text-sm font-medium text-neutral-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {message && (
        <div className={`rounded-xl p-4 text-sm ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">General Info</h3>
          
          <div>
            <label className={labelClasses}>Site Name</label>
            <input
              {...register("siteName", { required: "Site Name is required" })}
              className={inputClasses}
              placeholder="e.g. Softech Financials"
            />
            {errors.siteName && <p className="mt-1 text-xs text-red-400">{errors.siteName.message}</p>}
          </div>

          <div>
            <label className={labelClasses}>Site URL</label>
            <input
              {...register("url", { required: "Site URL is required" })}
              className={inputClasses}
              placeholder="https://yourwebsite.com"
            />
            {errors.url && <p className="mt-1 text-xs text-red-400">{errors.url.message}</p>}
          </div>

          <div>
            <label className={labelClasses}>Footer Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className={`${inputClasses} h-28 resize-none`}
              placeholder="Short description for the footer..."
            />
            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Contact Info</h3>
          
          <div>
            <label className={labelClasses}>Email Address</label>
            <input
              {...register("contactEmail", { required: "Email is required" })}
              className={inputClasses}
              placeholder="contact@company.com"
            />
            {errors.contactEmail && <p className="mt-1 text-xs text-red-400">{errors.contactEmail.message}</p>}
          </div>

          <div>
            <label className={labelClasses}>Phone Number</label>
            <input
              {...register("contactPhone", { required: "Phone is required" })}
              className={inputClasses}
              placeholder="+1 234 567 890"
            />
            {errors.contactPhone && <p className="mt-1 text-xs text-red-400">{errors.contactPhone.message}</p>}
          </div>

          <div>
            <label className={labelClasses}>Physical Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className={`${inputClasses} h-28 resize-none`}
              placeholder="123 Financial District..."
            />
            {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address.message}</p>}
          </div>

          <div className="space-y-3">
            <div>
              <label className={labelClasses}>Office Location</label>
              <p className="mt-1 text-xs text-neutral-400">
                Search an address or click on the map to save latitude, longitude, and the address.
              </p>
            </div>

            <LocationMapPicker
              address={mapLocation}
              latitude={mapLatitude ?? null}
              longitude={mapLongitude ?? null}
              onAddressChange={(value) =>
                setValue("mapLocation", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              onLatitudeChange={(value) =>
                setValue("mapLatitude", value ?? undefined, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              onLongitudeChange={(value) =>
                setValue("mapLongitude", value ?? undefined, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-white/10 pt-8">
        <h3 className="text-lg font-semibold text-white">Social Links</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className={labelClasses}>LinkedIn URL</label>
            <input
              {...register("socialLinks.linkedin")}
              className={inputClasses}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className={labelClasses}>Twitter URL</label>
            <input
              {...register("socialLinks.twitter")}
              className={inputClasses}
              placeholder="https://twitter.com/..."
            />
          </div>
          <div>
            <label className={labelClasses}>Facebook URL</label>
            <input
              {...register("socialLinks.facebook")}
              className={inputClasses}
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-white/10 pt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f172a] disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
