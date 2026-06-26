"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ServiceSchema, type ServiceInput } from "@/validators/service";
import { createService, updateService } from "@/actions/services";
import { IService } from "@/models/Service";
import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

type ServiceFormValues = z.input<typeof ServiceSchema>;
type ServiceInitialData = Partial<ServiceFormValues> & {
  _id?: string | { toString(): string };
};

interface ServiceFormProps {
  initialData?: IService | ServiceInitialData;
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormValues, unknown, ServiceInput>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      content: "",
      icon: "",
      isActive: true,
      order: 0,
      ...initialData,
    },
  });

  async function onSubmit(data: ServiceInput) {
    setLoading(true);
    let result;

    if (isEdit) {
      result = await updateService(String(initialData?._id), data);
    } else {
      result = await createService(data);
    }

    if (result.success) {
      router.push("/admin/services");
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
            <label className="admin-label">Service Name</label>
            <input
              {...register("name")}
              className={`admin-input${errors.name ? " error" : ""}`}
              placeholder="e.g. Tax Advisory"
            />
            {errors.name && <p className="admin-field-error">{errors.name.message}</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Slug</label>
            <input
              {...register("slug")}
              className={`admin-input${errors.slug ? " error" : ""}`}
              placeholder="tax-advisory"
            />
            {errors.slug && <p className="admin-field-error">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Icon</label>
          <input
            {...register("icon")}
            list="service-icon-list"
            className={`admin-input${errors.icon ? " error" : ""}`}
            placeholder="e.g. Calculator, ShieldCheck, Briefcase, or 💻"
          />
          <datalist id="service-icon-list">
            <option value="Briefcase" />
            <option value="ShieldCheck" />
            <option value="Calculator" />
            <option value="TrendingUp" />
            <option value="Sparkles" />
            <option value="PieChart" />
            <option value="BarChart3" />
            <option value="Clock" />
            <option value="CheckCircle" />
            <option value="FileText" />
            <option value="💻" />
          </datalist>
          <p className="admin-field-hint">Use a Lucide icon name or a single emoji like 💻. Unknown values fall back to default.</p>
          {errors.icon && <p className="admin-field-error">{errors.icon.message}</p>}
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Description (Short Intro)</label>
          <textarea
            {...register("description")}
            className={`admin-textarea${errors.description ? " error" : ""}`}
            placeholder="Brief summary of the service..."
            style={{ minHeight: 80 }}
          />
          {errors.description && <p className="admin-field-error">{errors.description.message}</p>}
        </div>

        <div className="admin-form-group">
          <RichTextEditor
            label="Detailed Content"
            helperText="Bold and italic formatting are available here too."
            value={watch("content") || ""}
            onChange={(html) =>
              setValue("content", html, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            placeholder="Write the full details here..."
          />
          {errors.content && <p className="admin-field-error">{errors.content.message}</p>}
        </div>

        <div className="admin-form-section" style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div className="admin-checkbox-group">
            <input type="checkbox" id="isActive" {...register("isActive")} />
            <label htmlFor="isActive">Active</label>
          </div>
          
          <div className="admin-form-group" style={{ width: 120 }}>
            <label className="admin-label">Order</label>
            <input
              type="number"
              {...register("order", { valueAsNumber: true })}
              className="admin-input"
            />
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
            {loading ? "Saving..." : isEdit ? "Update Service" : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
}
