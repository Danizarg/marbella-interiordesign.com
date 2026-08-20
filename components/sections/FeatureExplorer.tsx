"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RevealText } from "@/components/motion/RevealText";
import { features } from "@/lib/data/features";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FeatureExplorer() {
  const [active, setActive] = useState(features[0].id);
  const item = features.find((f) => f.id === active)!;

  return (
    <section className="relative bg-canvas section-y">
      <div className="container-page">
        <header className="rule-top mb-16 md:mb-20">
          <RevealText
            as="h2"
            className="display-xl max-w-[16ch]"
            lines={["Designed down to", "the last detail."]}
          />
        </header>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/*
            Tabs run down the left as a typographic index rather than a pill row.
            Each carries its own rule that fills when active.
          */}
          <div className="md:col-span-4 md:pt-2">
            <ul className="flex gap-6 overflow-x-auto no-scrollbar md:block md:gap-0 md:overflow-visible">
              {features.map((f, i) => {
                const isActive = f.id === active;
                return (
                  <li key={f.id} className="shrink-0 md:shrink">
                    <button
                      type="button"
                      onClick={() => setActive(f.id)}
                      aria-pressed={isActive}
                      className="group relative w-full py-3 text-left md:py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "font-sans text-[10px] tabular-nums tracking-eyebrow transition-colors",
                            isActive ? "text-ink" : "text-muted/50",
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "font-display text-2xl tracking-title transition-colors md:text-[2rem]",
                            isActive
                              ? "text-ink"
                              : "text-ink/35 group-hover:text-ink/70",
                          )}
                        >
                          {f.label}
                        </span>
                      </span>
                      <span className="mt-3 hidden h-px w-full bg-ink/12 md:block">
                        <motion.span
                          className="block h-full bg-ink"
                          initial={false}
                          animate={{ scaleX: isActive ? 1 : 0 }}
                          transition={{ duration: 0.7, ease: easePremium }}
                          style={{ transformOrigin: "left" }}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 min-h-[7rem] md:mt-12 md:min-h-[9rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: easePremium }}
                >
                  <h3 className="display-md max-w-[18ch]">{item.title}</h3>
                  <p className="mt-4 max-w-sm text-[15px] leading-[1.65] text-muted">
                    {item.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/*
            The visual carries the consequence: each tab crops its image to a
            different scale, so switching genuinely changes what you look at.
          */}
          <div className="md:col-span-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone/40 sm:aspect-[3/2] md:aspect-[4/3]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: item.zoom * 1.06 }}
                  animate={{ opacity: 1, scale: item.zoom }}
                  exit={{ opacity: 0, scale: item.zoom * 1.02 }}
                  transition={{
                    opacity: { duration: 0.8, ease: easePremium },
                    scale: { duration: 1.4, ease: easePremium },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image.src}
                    alt={item.title}
                    fill
                    quality={88}
                    sizes="(min-width:768px) 66vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: item.image.focal }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 md:p-7">
                <span className="bg-canvas px-3 py-2 text-[10px] uppercase tracking-eyebrow text-ink">
                  {item.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
