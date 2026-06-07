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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Service Name</label>
          <input
            {...register("name")}
            className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="e.g. Tax Advisory"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input
            {...register("slug")}
            className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="tax-advisory"
          />
          {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
        </div>
      </div>


      <div className="space-y-2">
        <label className="text-sm font-medium">Icon</label>
        <input
          {...register("icon")}
          list="service-icon-list"
          className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--color-accent)]"
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
        <p className="text-xs text-(--color-muted)">Use a Lucide icon name or a single emoji like 💻. Unknown values still fall back to the default service icon.</p>
        {errors.icon && (
          <p className="text-xs text-red-400">{errors.icon.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description (Short Intro)</label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--color-accent)]"
          placeholder="Brief summary of the service..."
        />
        {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
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
        {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isActive")} className="rounded border-white/10 bg-white/5" />
          <label className="text-sm">Active</label>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Order</label>
          <input
            type="number"
            {...register("order", { valueAsNumber: true })}
            className="w-20 rounded-lg bg-white/5 px-3 py-1 outline-none ring-1 ring-white/10"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg px-6 py-2 text-sm font-medium transition-all hover:bg-white/5 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--color-accent)] px-8 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Saving..." : isEdit ? "Update Service" : "Create Service"}
        </button>
      </div>
    </form>
  );
}
