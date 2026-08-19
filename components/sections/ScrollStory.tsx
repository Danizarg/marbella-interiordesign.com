"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { easePremium } from "@/lib/motion";
import { RevealText } from "@/components/motion/RevealText";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const beats = [
  { word: "Light.", image: "/renders/render-04.jpg" },
  { word: "Material.", image: "/renders/render-15.jpg" },
  { word: "Proportion.", image: "/renders/render-21.jpg" },
  { word: "Atmosphere.", image: "/renders/render-24.jpg" },
];

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
    [start, mid - 0.03, mid + 0.03, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, mid, end], [30, 0, -30]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute left-0 top-0 font-display font-light leading-[1] tracking-display"
    >
      <span className="text-[clamp(3rem,7vw,6rem)]">{word}</span>
    </motion.div>
  );
}

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
    [start, mid - 0.05, mid + 0.05, end],
    [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [start, end], [1.08, 1]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image
        src={image}
        alt=""
        fill
        priority={eager}
        sizes="(min-width:768px) 55vw, 100vw"
        className="object-cover"
      />
    </motion.div>
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
      className="relative bg-canvas"
      style={{ height: `${beats.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-page grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionEyebrow>Why 3D visualization</SectionEyebrow>
            <RevealText
              as="h2"
              className="display-xl mt-6 max-w-[14ch]"
              lines={["Every detail.", "Decided before", "construction begins."]}
            />

            <div className="relative mt-14 h-[6.5rem] md:h-[7.5rem]">
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

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: easePremium, delay: 0.3 }}
              className="mt-16 max-w-md text-sm leading-[1.6] text-muted md:text-base"
            >
              See every decision before it becomes permanent.
            </motion.p>
          </div>

          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-stone/50 md:aspect-[5/4]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
