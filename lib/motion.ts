import type { Variants } from "framer-motion";

export const easePremium = [0.22, 1, 0.36, 1] as const;
export const easeEditorial = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: easePremium },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.2, ease: easePremium },
  },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.05,
    },
  },
});
