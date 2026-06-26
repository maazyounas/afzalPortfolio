"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm, useWatch } from "react-hook-form";
import { updateSettings } from "@/actions/settings";
import type { ISettings } from "@/models/Settings";
import { CheckCircle, XCircle } from "lucide-react";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {message && (
        <div className={message.type === "success" ? "admin-alert admin-alert-success" : "admin-alert admin-alert-error"}>
          {message.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {message.text}
        </div>
      )}

      {/* General + Contact */}
      <div className="admin-grid-2">
        {/* General Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="admin-form-section-title" style={{ marginBottom: 4 }}>General Info</div>

          <div className="admin-form-group">
            <label className="admin-label">Site Name</label>
            <input
              {...register("siteName", { required: "Site Name is required" })}
              className={`admin-input${errors.siteName ? " error" : ""}`}
              placeholder="e.g. Softech Financials"
            />
            {errors.siteName && <p className="admin-field-error">{errors.siteName.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Site URL</label>
            <input
              {...register("url", { required: "Site URL is required" })}
              className={`admin-input${errors.url ? " error" : ""}`}
              placeholder="https://yourwebsite.com"
            />
            {errors.url && <p className="admin-field-error">{errors.url.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Footer Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className={`admin-textarea${errors.description ? " error" : ""}`}
              placeholder="Short description for the footer..."
              style={{ minHeight: 112 }}
            />
            {errors.description && <p className="admin-field-error">{errors.description.message}</p>}
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="admin-form-section-title" style={{ marginBottom: 4 }}>Contact Info</div>

          <div className="admin-form-group">
            <label className="admin-label">Email Address</label>
            <input
              {...register("contactEmail", { required: "Email is required" })}
              className={`admin-input${errors.contactEmail ? " error" : ""}`}
              placeholder="contact@company.com"
            />
            {errors.contactEmail && <p className="admin-field-error">{errors.contactEmail.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Phone Number</label>
            <input
              {...register("contactPhone", { required: "Phone is required" })}
              className={`admin-input${errors.contactPhone ? " error" : ""}`}
              placeholder="+1 234 567 890"
            />
            {errors.contactPhone && <p className="admin-field-error">{errors.contactPhone.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Physical Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className={`admin-textarea${errors.address ? " error" : ""}`}
              placeholder="123 Financial District..."
              style={{ minHeight: 112 }}
            />
            {errors.address && <p className="admin-field-error">{errors.address.message}</p>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="admin-label">Office Location (Map)</label>
            <p className="admin-field-hint">
              Search an address or click on the map to save coordinates.
            </p>
            <LocationMapPicker
              address={mapLocation}
              latitude={mapLatitude ?? null}
              longitude={mapLongitude ?? null}
              onAddressChange={(value) =>
                setValue("mapLocation", value, { shouldDirty: true, shouldValidate: true })
              }
              onLatitudeChange={(value) =>
                setValue("mapLatitude", value ?? undefined, { shouldDirty: true, shouldValidate: true })
              }
              onLongitudeChange={(value) =>
                setValue("mapLongitude", value ?? undefined, { shouldDirty: true, shouldValidate: true })
              }
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="admin-form-section">
        <div className="admin-form-section-title">Social Links</div>
        <div className="admin-grid-3">
          <div className="admin-form-group">
            <label className="admin-label">LinkedIn URL</label>
            <input
              {...register("socialLinks.linkedin")}
              className="admin-input"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Twitter URL</label>
            <input
              {...register("socialLinks.twitter")}
              className="admin-input"
              placeholder="https://twitter.com/..."
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Facebook URL</label>
            <input
              {...register("socialLinks.facebook")}
              className="admin-input"
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="admin-form-footer">
        <button
          type="submit"
          disabled={isSubmitting}
          className="admin-btn admin-btn-primary"
        >
          {isSubmitting ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
