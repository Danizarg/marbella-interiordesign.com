"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, studio } from "@/lib/constants";
import { easePremium } from "@/lib/motion";

type Props = {
  proposalMode?: boolean;
};

export function Header({ proposalMode }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 48);
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: easePremium, delay: 0.6 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
          scrolled
            ? "border-b border-ink/[0.06] bg-[rgba(246,244,239,0.78)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between transition-all duration-500 ease-premium",
            scrolled ? "h-14" : "h-[72px]",
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-3 text-ink"
            aria-label={studio.name}
          >
            <span className="font-display text-[15px] tracking-title">
              {studio.short}
            </span>
            {proposalMode && (
              <span className="hidden rounded-full border border-ink/15 px-2.5 py-0.5 text-[10px] uppercase tracking-eyebrow text-muted md:inline-block">
                Redesign Concept
              </span>
            )}
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] text-ink/70 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-canvas transition-all duration-300 ease-premium hover:-translate-y-0.5 md:inline-flex"
            >
              Start a Project
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink md:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easePremium }}
            className="fixed inset-0 z-[60] flex flex-col bg-canvas md:hidden"
          >
            <div className="container-page flex h-[72px] items-center justify-between">
              <span className="font-display text-[15px]">{studio.short}</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="container-page flex flex-1 flex-col justify-between pb-16 pt-6">
              <nav className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: easePremium,
                      delay: 0.1 + i * 0.06,
                    }}
                    className="border-b border-ink/10 py-6 font-display text-4xl leading-none tracking-title"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-10 space-y-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Start a Project
                </a>
                <p className="text-xs text-muted">{studio.phone}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
