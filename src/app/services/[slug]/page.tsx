

import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/actions/services";
import type { Service } from "@/models/Service";

/**
 * Service detail page rendered at `/services/[slug]`.
 * It fetches the service from the database using the slug parameter.
 * If the service is not found, Next.js' `notFound` is called to render the 404 page.
 */
export default async function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service: Service | null = await getServiceBySlug(slug);

  if (!service) {
    // Let Next.js render the default 404 page.
    notFound();
    return null; // This line will never be reached, but satisfies TypeScript.
  }

  return (
    <section className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {service.name}
      </h1>
      {service.featuredImage && (
        <img
          src={service.featuredImage}
          alt={service.name}
          className="w-full h-auto rounded-md object-cover"
        />
      )}
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {service.description}
      </p>
      {/* Additional fields can be displayed here as needed */}
    </section>
  );
}
