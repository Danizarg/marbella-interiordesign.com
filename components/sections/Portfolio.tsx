"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { Lightbox } from "@/components/gallery/Lightbox";
import { portfolio } from "@/lib/data/portfolio";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

function Tile({
  index,
  onOpen,
  className,
  aspect,
  sizes,
}: {
  index: number;
  onOpen: () => void;
  className?: string;
  aspect: string;
  sizes: string;
}) {
  const item = portfolio[index];
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: easePremium }}
      className={cn(
        "group relative block w-full overflow-hidden rounded-md bg-stone/40 text-left",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={item.image}
        alt={item.label}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent opacity-0 transition-opacity duration-700 ease-premium group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-700 ease-premium group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
        <div className="font-display text-lg text-white md:text-xl">
          {item.label}
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-eyebrow text-white/70">
          {item.meta}
        </div>
      </div>
    </motion.button>
  );
}

export function Portfolio() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="portfolio" className="bg-canvas section-y">
      <div className="container-page">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>Selected work</SectionEyebrow>
            <RevealText
              as="h2"
              className="display-xl mt-6 max-w-[16ch]"
              lines={["A visual record", "of decisions made."]}
            />
          </div>
          <p className="max-w-md text-sm text-muted md:text-base">
            Every render below was produced for a real residential project.
            Click any image for the full composition.
          </p>
        </div>

        {/* Editorial rhythm — deliberately varied */}
        <div className="space-y-8 md:space-y-12">
          {/* Row 1: wide + small right */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <Tile
                index={0}
                onOpen={() => setOpen(0)}
                aspect="16 / 10"
                sizes="(min-width:768px) 66vw, 100vw"
              />
            </div>
            <div className="md:col-span-4 md:pt-16">
              <Tile
                index={1}
                onOpen={() => setOpen(1)}
                aspect="4 / 5"
                sizes="(min-width:768px) 33vw, 100vw"
              />
            </div>
          </div>

          {/* Row 2: full bleed */}
          <div>
            <Tile
              index={2}
              onOpen={() => setOpen(2)}
              aspect="21 / 9"
              sizes="100vw"
            />
          </div>

          {/* Row 3: split pair */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Tile
              index={3}
              onOpen={() => setOpen(3)}
              aspect="4 / 3"
              sizes="(min-width:768px) 50vw, 100vw"
            />
            <div className="md:pt-24">
              <Tile
                index={4}
                onOpen={() => setOpen(4)}
                aspect="4 / 3"
                sizes="(min-width:768px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Row 4: portrait duo + wide */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <Tile
                index={6}
                onOpen={() => setOpen(6)}
                aspect="3 / 4"
                sizes="(min-width:768px) 25vw, 100vw"
              />
            </div>
            <div className="md:col-span-3">
              <Tile
                index={7}
                onOpen={() => setOpen(7)}
                aspect="3 / 4"
                sizes="(min-width:768px) 25vw, 100vw"
              />
            </div>
            <div className="md:col-span-6">
              <Tile
                index={5}
                onOpen={() => setOpen(5)}
                aspect="16 / 11"
                sizes="(min-width:768px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Row 5: cinematic finale */}
          <div>
            <Tile
              index={8}
              onOpen={() => setOpen(8)}
              aspect="21 / 9"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      <Lightbox
        items={portfolio}
        index={open}
        onClose={() => setOpen(null)}
        onChange={setOpen}
      />
    </section>
  );
}
