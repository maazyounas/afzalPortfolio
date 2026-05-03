import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  href?: string;
};

export function Card({ title, description, href }: CardProps) {
  const content = (
    <article className="h-full rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,33,31,0.1)]">
      <h3 className="text-xl font-semibold text-[var(--color-ink)]">{title}</h3>
      <p className="mt-3 text-[var(--color-muted)]">{description}</p>
    </article>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
