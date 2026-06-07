import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/actions/services";
import type { IService } from "@/models/Service";
import { ServiceDetailClient } from "./ServiceDetailClient";
import { ServiceSkeleton } from "./ServiceSkeleton";

export const dynamic = "force-dynamic";

interface ServicePageProps {
  params: { slug: string };
}

/**
 * Service detail page rendered at `/services/[slug]`.
 * It fetches the service from the database using the slug parameter.
 * If the service is not found, Next.js' `notFound` is called to render the 404 page.
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service: IService | null = await getServiceBySlug(slug);

  if (!service) {
    notFound();
    return null;
  }

  return (
    <Suspense fallback={<ServiceSkeleton />}>
      <ServiceDetailClient service={service} />
    </Suspense>
  );
}
