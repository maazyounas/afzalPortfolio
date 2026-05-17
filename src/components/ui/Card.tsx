import Link from "next/link";
import { Box } from "lucide-react";

type CardProps = {
  title: string;
  description: string;
  href?: string;
};

export function Card({ title, description, href }: CardProps) {
  const content = (
    <article
      className="
        group relative h-full
        overflow-hidden rounded-[2rem]
        border border-[var(--color-line)]
        bg-white/85 p-6
        shadow-sm backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
        hover:border-[var(--color-accent-light)]
      "
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.08),_transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-2xl bg-gradient-to-br from-[var(--color-accent-light)] to-white
            shadow-sm
          "
        >
          <Box className="h-5 w-5 text-[var(--color-accent-strong)]" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent-strong)]">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}