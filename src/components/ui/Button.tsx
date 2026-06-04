import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

const baseStyles =
  "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition will-change-transform";

const variants = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]",
  secondary:
    "border border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-panel)]",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
}
