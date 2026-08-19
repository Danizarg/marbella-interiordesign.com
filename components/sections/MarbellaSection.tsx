"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { easePremium } from "@/lib/motion";
import { studio } from "@/lib/constants";

export function MarbellaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section id="marbella" ref={ref} className="relative bg-canvas section-y">
      <div className="container-page grid grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionEyebrow>Location</SectionEyebrow>
          <RevealText
            as="h2"
            className="display-xl mt-6 max-w-[12ch]"
            lines={["Designed for", "Marbella."]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: easePremium, delay: 0.2 }}
            className="mt-8 max-w-md text-sm leading-[1.65] text-muted md:text-base"
          >
            Working out of San Pedro Alcántara and Puerto Banús, the studio
            visualises residences and interiors for properties across the
            Costa del Sol.
          </motion.p>
          <div className="mt-10 grid grid-cols-2 gap-8 text-[13px] text-ink/70">
            <div>
              <div className="eyebrow mb-3">Studio</div>
              <div>
                {studio.address.line1}
                <br />
                {studio.address.line2}
                <br />
                {studio.address.line3}
              </div>
            </div>
            <div>
              <div className="eyebrow mb-3">Also at</div>
              <div>
                {studio.altAddress.line1}
                <br />
                {studio.altAddress.line2}
                <br />
                {studio.altAddress.line3}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-stone/40 md:aspect-[5/6]">
            <motion.div style={{ y }} className="absolute inset-0 -top-[6%] h-[112%]">
              <Image
                src="/renders/render-03.jpg"
                alt="Marbella architectural interior"
                fill
                sizes="(min-width:768px) 55vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white/80">
              <div className="font-display text-lg tracking-title">
                {studio.region}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
