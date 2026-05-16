import Link from "next/link";
import { Box } from "lucide-react";

type CardProps = {
  title: string;
  description: string;
  href?: string;
};

export function Card({ title, description, href }: CardProps) {
  const content = (
    <article className="h-full rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50 text-slate-700">
          <Box className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
          <p className="mt-2 text-[var(--color-muted)]">{description}</p>
        </div>
      </div>
    </article>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
