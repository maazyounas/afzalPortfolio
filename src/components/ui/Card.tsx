"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "@/lib/motion";
import { ServiceIcon } from "@/lib/utils/icons";

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export function Card({ title, description, href, icon }: CardProps) {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full overflow-hidden rounded-2xl border border-(--color-line) bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
      >
        {/* Gradient Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-(--color-accent-light)/0 to-(--color-accent)/0 transition-all duration-500 group-hover:from-(--color-accent-light)/10 group-hover:to-(--color-accent)/5" />

        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) transition-transform duration-300 group-hover:scale-110">
          <ServiceIcon name={icon} className="h-5 w-5 text-white" />
        </div>

        {/* Content */}
        <h3 className="mb-2 text-xl font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-accent)">
          {title}
        </h3>
        
        <p className="mb-4 text-sm leading-relaxed text-(--color-muted) line-clamp-3">
          {description}
        </p>

        {/* Link Indicator */}
        <div className="flex items-center gap-2 text-sm font-medium text-(--color-accent)">
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>

      </motion.div>
    </Link>
  );
}