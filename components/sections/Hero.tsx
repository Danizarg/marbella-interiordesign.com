"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easePremium } from "@/lib/motion";
import { RevealText } from "@/components/motion/RevealText";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.35, 0.6]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-night text-white"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: easePremium }}
        style={{ y, scale }}
      >
        <Image
          src="/renders/render-01.jpg"
          alt="Photorealistic architectural render of a residential interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10,10,12,1)", opacity: overlay }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/70 via-night/20 to-transparent" />

      <div className="container-page relative z-10 flex h-full flex-col justify-end pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easePremium, delay: 0.9 }}
          className="mb-6 flex items-center gap-3 text-white/60"
        >
          <span className="block h-px w-8 bg-white/30" />
          <span className="text-[11px] uppercase tracking-eyebrow">
            Marbella Interior Design Studio
          </span>
        </motion.div>

        <RevealText
          as="h1"
          className="display-hero max-w-[16ch] text-white"
          lines={["Before it's built,", "make it real."]}
          delay={1.1}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easePremium, delay: 1.9 }}
          className="mt-8 max-w-xl text-base leading-[1.55] text-white/70 md:text-lg"
        >
          Photorealistic architectural visualization for exceptional interiors
          and residences in Marbella.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easePremium, delay: 2.1 }}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#story"
            className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <span>Explore our renders</span>
            <ArrowDown
              size={16}
              className="transition-transform duration-500 ease-premium group-hover:translate-y-1"
            />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: easePremium, delay: 2.4 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-white/30"
        />
      </motion.div>
    </section>
  );
}
