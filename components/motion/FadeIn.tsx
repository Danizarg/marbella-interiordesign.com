"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 1,
  once = true,
  ...rest
}: Props) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: easePremium }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
