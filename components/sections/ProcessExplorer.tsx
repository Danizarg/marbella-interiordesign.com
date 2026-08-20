"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { process } from "@/lib/data/process";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ProcessExplorer() {
  const [active, setActive] = useState(process[0].key);
  const item = process.find((s) => s.key === active)!;

  return (
    <section id="process" className="bg-night text-white section-y">
      <div className="container-page">
        <div className="mb-16 flex flex-col gap-6 md:mb-20">
          <SectionEyebrow invert>Studio process</SectionEyebrow>
          <RevealText
            as="h2"
            className="display-xl max-w-[14ch] text-white"
            lines={["From idea", "to image."]}
          />
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5 sm:aspect-[16/11]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.9, ease: easePremium }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image.src}
                    alt={item.title}
                    fill
                    quality={86}
                    sizes="(min-width:768px) 60vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: item.image.focal }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col justify-between md:col-span-5">
            <div className="min-h-[9rem] md:min-h-[11rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: easePremium }}
                >
                  <div className="eyebrow mb-4 text-white/50">
                    Stage {item.n}
                  </div>
                  <h3 className="display-lg text-white">{item.title}</h3>
                  <p className="mt-5 max-w-md text-sm leading-[1.65] text-white/70 md:text-base">
                    {item.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop stage bar */}
            <div className="mt-14 hidden md:block">
              <div className="relative">
                <div className="absolute inset-x-0 top-5 h-px bg-white/15" />
                <div className="grid grid-cols-6 gap-2">
                  {process.map((s) => {
                    const isActive = s.key === active;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setActive(s.key)}
                        className="group relative pt-11 text-left"
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-3 h-[6px] w-[6px] rounded-full transition-all duration-500 ease-premium",
                            isActive
                              ? "scale-[1.6] bg-white"
                              : "bg-white/30 group-hover:bg-white/60",
                          )}
                        />
                        <div
                          className={cn(
                            "text-[11px] uppercase tracking-eyebrow transition-colors",
                            isActive ? "text-white" : "text-white/45",
                          )}
                        >
                          {s.n}
                        </div>
                        <div
                          className={cn(
                            "font-display text-lg leading-tight tracking-title transition-colors",
                            isActive ? "text-white" : "text-white/70",
                          )}
                        >
                          {s.title}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile horizontal pills */}
        <div className="mt-10 md:hidden">
          <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6">
            {process.map((s) => {
              const isActive = s.key === active;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActive(s.key)}
                  className={cn(
                    "snap-start whitespace-nowrap border px-4 py-2 text-[12px] transition-colors",
                    isActive
                      ? "border-white bg-white text-ink"
                      : "border-white/20 text-white/70",
                  )}
                >
                  {s.n} · {s.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
