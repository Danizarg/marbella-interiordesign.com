"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const beats = [
  { word: "Light.", image: "/renders/render-04.jpg" },
  { word: "Material.", image: "/renders/render-15.jpg" },
  { word: "Proportion.", image: "/renders/render-21.jpg" },
  { word: "Atmosphere.", image: "/renders/render-24.jpg" },
];

function Frame({
  progress,
  image,
  start,
  end,
  eager,
}: {
  progress: MotionValue<number>;
  image: string;
  start: number;
  end: number;
  eager?: boolean;
}) {
  const mid = start + (end - start) / 2;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.02), mid - 0.06, mid + 0.06, Math.min(1, end + 0.02)],
    [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [start, end], [1.06, 1]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image
        src={image}
        alt=""
        fill
        priority={eager}
        sizes="100vw"
        className="object-cover"
      />
    </motion.div>
  );
}

function Word({
  progress,
  word,
  start,
  end,
}: {
  progress: MotionValue<number>;
  word: string;
  start: number;
  end: number;
}) {
  const mid = start + (end - start) / 2;
  const opacity = useTransform(
    progress,
    [start, mid - 0.05, mid + 0.05, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, mid, end], [24, 0, -24]);
  return (
    <motion.span
      style={{ opacity, y }}
      className="absolute left-0 top-0 block font-display font-light leading-[1] tracking-display text-white"
    >
      <span className="text-[clamp(3.5rem,9vw,7.5rem)]">{word}</span>
    </motion.span>
  );
}

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="story"
      ref={ref}
      className="relative bg-night text-white"
      style={{ height: `${beats.length * 90}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Full-viewport image background — always fills sticky */}
        <div className="absolute inset-0">
          {beats.map((b, i) => (
            <Frame
              key={b.image}
              progress={scrollYProgress}
              image={b.image}
              start={i / beats.length}
              end={(i + 1) / beats.length}
              eager={i === 0}
            />
          ))}
        </div>

        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/30 to-night/80" />

        {/* Text overlay */}
        <div className="container-page relative z-10 flex h-full flex-col justify-between pt-[calc(var(--header-height)+3rem)] pb-16 md:pb-24">
          <div className="max-w-2xl">
            <SectionEyebrow invert>Why 3D visualization</SectionEyebrow>
            <RevealText
              as="h2"
              className="display-xl mt-6 max-w-[15ch] text-white"
              lines={["Every detail.", "Decided before", "construction begins."]}
            />
          </div>

          <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
            <div className="relative h-[6rem] w-full md:h-[8rem] md:w-auto">
              {beats.map((b, i) => (
                <Word
                  key={b.word}
                  progress={scrollYProgress}
                  word={b.word}
                  start={i / beats.length}
                  end={(i + 1) / beats.length}
                />
              ))}
            </div>

            <p className="max-w-xs text-sm leading-[1.55] text-white/70 md:text-right md:text-[15px]">
              See every decision before it becomes permanent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
