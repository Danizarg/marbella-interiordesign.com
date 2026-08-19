"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "invert";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  withArrow = true,
}: Props) {
  const base =
    variant === "primary"
      ? "btn-primary"
      : variant === "invert"
        ? "btn-invert"
        : "btn-ghost";

  const inner = (
    <span className="group inline-flex items-center gap-2">
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
        />
      )}
    </span>
  );

  if (href && href.startsWith("#")) {
    return (
      <a href={href} className={cn(base, className)} onClick={onClick}>
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cn(base, className)} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cn(base, className)} onClick={onClick} type="button">
      {inner}
    </button>
  );
}
