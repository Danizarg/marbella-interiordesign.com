"use client";

import { motion, type Variants } from "framer-motion";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  once?: boolean;
};

const container: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({
    transition: {
      staggerChildren: 0.12,
      delayChildren: delay,
    },
  }),
};

const line: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1.1, ease: easePremium },
  },
};

export function RevealText({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = "h2",
  once = true,
}: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
    >
      {lines.map((text, i) => (
        <span key={i} className="reveal-line">
          <motion.span variants={line} className={cn(lineClassName)}>
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
