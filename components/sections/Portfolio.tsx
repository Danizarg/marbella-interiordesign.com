"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { Lightbox } from "@/components/gallery/Lightbox";
import { portfolio } from "@/lib/data/portfolio";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

function Plate({
  index,
  onOpen,
  aspect,
  sizes,
  className,
}: {
  index: number;
  onOpen: () => void;
  aspect: string;
  sizes: string;
  className?: string;
}) {
  const item = portfolio[index];
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1.1, ease: easePremium }}
      className={cn("group block w-full text-left", className)}
    >
      <div
        className="relative w-full overflow-hidden bg-stone/40"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={item.image.src}
          alt={item.label}
          fill
          sizes={sizes}
          quality={86}
          className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]"
          style={{ objectPosition: item.image.focal }}
        />
      </div>
      {/* Caption below the image, editorial style — not an overlay on hover. */}
      <div className="mt-4 flex items-baseline justify-between gap-6 border-t border-ink/12 pt-3">
        <span className="font-display text-[17px] tracking-title md:text-lg">
          {item.label}
        </span>
        <span className="shrink-0 text-[10px] uppercase tracking-eyebrow text-muted">
          {item.meta}
        </span>
      </div>
    </motion.button>
  );
}

export function Portfolio() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="portfolio" className="bg-canvas section-y">
      <div className="container-page">
        <header className="rule-top mb-20 grid gap-8 md:mb-28 md:grid-cols-12">
          <div className="md:col-span-7">
            <RevealText
              as="h2"
              className="display-xl max-w-[16ch]"
              lines={["A visual record", "of decisions made."]}
            />
          </div>
          <p className="max-w-sm self-end text-[15px] leading-[1.6] text-muted md:col-span-4 md:col-start-9">
            Interiors resolved in full before construction. Select any frame to
            view the complete composition.
          </p>
        </header>

        <div className="space-y-20 md:space-y-32">
          {/* Opening statement — large, left-weighted, generous air to its right */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-10">
              <Plate
                index={0}
                onOpen={() => setOpen(0)}
                aspect="16 / 9"
                sizes="(min-width:768px) 83vw, 100vw"
              />
            </div>
          </div>

          {/* Offset portrait — pushed right, deliberately small against whitespace */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-4 md:col-start-8">
              <Plate
                index={1}
                onOpen={() => setOpen(1)}
                aspect="4 / 5"
                sizes="(min-width:768px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed break — escapes the page container entirely */}
      <div className="my-20 md:my-32">
        <Plate
          index={2}
          onOpen={() => setOpen(2)}
          aspect="21 / 9"
          sizes="100vw"
          className="[&>div:last-child]:container-page [&>div:last-child]:mt-4"
        />
      </div>

      <div className="container-page">
        <div className="space-y-20 md:space-y-32">
          {/* Asymmetric pair — different sizes and vertical offsets */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Plate
                index={3}
                onOpen={() => setOpen(3)}
                aspect="4 / 5"
                sizes="(min-width:768px) 41vw, 100vw"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-32">
              <Plate
                index={4}
                onOpen={() => setOpen(4)}
                aspect="1 / 1"
                sizes="(min-width:768px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Tall single — centred, narrow, a pause in the rhythm */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 md:col-start-4">
              <Plate
                index={5}
                onOpen={() => setOpen(5)}
                aspect="2 / 3"
                sizes="(min-width:768px) 41vw, 100vw"
              />
            </div>
          </div>

          {/* Closing cinematic */}
          <div>
            <Plate
              index={6}
              onOpen={() => setOpen(6)}
              aspect="2 / 1"
              sizes="(min-width:768px) 92vw, 100vw"
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
