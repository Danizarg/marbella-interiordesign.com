"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PillSelector } from "@/components/motion/PillSelector";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { features } from "@/lib/data/features";
import { easePremium } from "@/lib/motion";

export function FeatureExplorer() {
  const [active, setActive] = useState(features[0].id);
  const item = features.find((f) => f.id === active)!;

  return (
    <section className="relative bg-canvas section-y">
      <div className="container-page">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>Every element</SectionEyebrow>
            <RevealText
              as="h2"
              className="display-xl mt-6 max-w-[16ch]"
              lines={["Designed down to", "the last detail."]}
            />
          </div>
          <PillSelector
            items={features.map((f) => ({ id: f.id, label: f.label }))}
            active={active}
            onChange={setActive}
          />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-stone/50 md:aspect-[16/11]">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.9, ease: easePremium }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width:768px) 60vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-ink/5" />
            </div>
          </div>

          <div className="flex flex-col justify-center md:col-span-5">
            <div className="min-h-[10rem] md:min-h-[13rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: easePremium }}
                >
                  <div className="eyebrow mb-4">{item.label}</div>
                  <h3 className="display-lg max-w-[14ch]">{item.title}</h3>
                  <p className="mt-6 max-w-md text-sm leading-[1.65] text-muted md:text-base">
                    {item.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-2">
              {features.map((f) => (
                <button
                  key={f.id}
                  aria-label={f.label}
                  onClick={() => setActive(f.id)}
                  className={`h-[2px] rounded-full transition-all duration-500 ease-premium ${
                    f.id === active ? "w-10 bg-ink" : "w-5 bg-ink/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
