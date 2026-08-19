"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easePremium } from "@/lib/motion";

export function SectionEyebrow({
  children,
  className,
  invert = false,
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-3",
        invert ? "text-white/50" : "text-muted",
        className,
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: easePremium }}
    >
      <span
        className={cn(
          "block h-px w-8",
          invert ? "bg-white/25" : "bg-ink/25",
        )}
      />
      <span className="text-[11px] uppercase tracking-eyebrow">{children}</span>
    </motion.div>
  );
}
