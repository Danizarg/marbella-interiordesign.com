"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easePremium } from "@/lib/motion";
import { RevealText } from "@/components/motion/RevealText";
import { img } from "@/lib/data/imagery";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-night text-white"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: easePremium }}
        style={{ y, scale }}
      >
        <Image
          src={img.villaTerrace.src}
          alt="Contemporary Mediterranean villa interior opening onto a sea terrace"
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover [object-position:var(--focal-m)] md:[object-position:var(--focal)]"
          style={
            {
              "--focal": img.villaTerrace.focal,
              "--focal-m": img.villaTerrace.focalMobile,
            } as React.CSSProperties
          }
        />
      </motion.div>

      {/*
        Directional scrim only. A flat black wash over the whole frame kills the
        depth in the image — the copy sits low-left, so darken from that corner.
      */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />

      <motion.div
        style={{ opacity: copyFade }}
        className="container-page relative z-10 flex h-full flex-col justify-end pb-[12vh] md:pb-[14vh]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: easePremium, delay: 0.8 }}
          className="mb-8 flex items-center gap-4 text-white/70"
        >
          <span className="block h-px w-12 bg-white/40" />
          <span className="text-[11px] uppercase tracking-eyebrow">
            Marbella · Architectural visualization
          </span>
        </motion.div>

        <RevealText
          as="h1"
          className="display-hero max-w-[13ch] text-white [text-shadow:0_2px_40px_rgb(10_10_12_/_0.45)]"
          lines={["Before it's built,", "make it real."]}
          delay={1}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easePremium, delay: 1.9 }}
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-[15px] leading-[1.6] text-white/85 md:text-base">
            Photorealistic visualization for interiors and residences on the
            Costa del Sol — every material, proportion and hour of light
            resolved before construction begins.
          </p>

          <a
            href="#story"
            className="group inline-flex shrink-0 items-center gap-3 border-b border-white/30 pb-2 text-[13px] tracking-wide text-white/90 transition-colors hover:border-white"
          >
            <span>Explore the work</span>
            <span
              aria-hidden
              className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
