"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { easePremium } from "@/lib/motion";
import type { PortfolioItem } from "@/lib/data/portfolio";

type Props = {
  items: PortfolioItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onChange }: Props) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft")
        onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [index, items.length, onClose, onChange]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easePremium }}
          className="fixed inset-0 z-[70] flex flex-col bg-night text-white"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 60) {
              if (dx < 0) onChange((index + 1) % items.length);
              else onChange((index - 1 + items.length) % items.length);
            }
            touchStartX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 md:px-10">
            <div className="text-[11px] uppercase tracking-eyebrow text-white/50">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-6 pb-16 md:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.5, ease: easePremium }}
                className="relative aspect-[16/10] w-full max-w-6xl"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                onChange((index - 1 + items.length) % items.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/[0.04] p-3 text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white md:left-8"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => onChange((index + 1) % items.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/[0.04] p-3 text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white md:right-8"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="border-t border-white/10 px-6 py-5 md:px-10">
            <div className="font-display text-xl tracking-title">
              {item.label}
            </div>
            <div className="mt-1 text-[12px] uppercase tracking-eyebrow text-white/50">
              {item.meta}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
