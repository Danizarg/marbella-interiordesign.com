"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easePremium } from "@/lib/motion";

type Item = { id: string; label: string };

type Props = {
  items: Item[];
  active: string;
  onChange: (id: string) => void;
  invert?: boolean;
  className?: string;
};

export function PillSelector({
  items,
  active,
  onChange,
  invert = false,
  className,
}: Props) {
  return (
    <div
      role="tablist"
      className={cn(
        "no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full border p-1",
        invert
          ? "border-white/15 bg-white/[0.04]"
          : "border-ink/10 bg-ink/[0.03]",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm transition-colors duration-300",
              isActive
                ? invert
                  ? "text-ink"
                  : "text-canvas"
                : invert
                  ? "text-white/70 hover:text-white"
                  : "text-muted hover:text-ink",
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`pill-${invert ? "d" : "l"}`}
                className={cn(
                  "absolute inset-0 rounded-full",
                  invert ? "bg-canvas" : "bg-ink",
                )}
                transition={{ duration: 0.55, ease: easePremium }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
