"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { img, type ConceptImage } from "@/lib/data/imagery";

const beats: { word: string; note: string; image: ConceptImage }[] = [
  {
    word: "Light",
    note: "How the room reads at eight in the morning, and again at dusk.",
    image: img.lightStudy,
  },
  {
    word: "Material",
    note: "Stone, plaster and timber judged at their true scale.",
    image: img.materialStudy,
  },
  {
    word: "Proportion",
    note: "Volume and sightline resolved as architecture.",
    image: img.stoneLiving,
  },
  {
    word: "Atmosphere",
    note: "The feeling of the space, before it exists.",
    image: img.villaEvening,
  },
];

function Frame({
  progress,
  image,
  start,
  end,
  eager,
}: {
  progress: MotionValue<number>;
  image: ConceptImage;
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
  const scale = useTransform(progress, [start, end], [1.08, 1]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image
        src={image.src}
        alt=""
        fill
        priority={eager}
        quality={86}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.focal }}
      />
    </motion.div>
  );
}

function Beat({
  progress,
  word,
  note,
  index,
  start,
  end,
}: {
  progress: MotionValue<number>;
  word: string;
  note: string;
  index: number;
  start: number;
  end: number;
}) {
  const mid = start + (end - start) / 2;
  const opacity = useTransform(
    progress,
    [start, mid - 0.06, mid + 0.06, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, mid, end], [40, 0, -40]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-0 flex flex-col gap-4"
    >
      <span className="font-sans text-[10px] tabular-nums tracking-eyebrow text-white/60">
        0{index + 1} — 04
      </span>
      <span className="block font-display font-light leading-[0.95] tracking-display text-white text-[clamp(3rem,8vw,6.5rem)]">
        {word}
      </span>
      <span className="max-w-sm text-[15px] leading-[1.55] text-white/80">
        {note}
      </span>
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
      className="relative bg-night text-white"
      style={{ height: `${beats.length * 95}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {beats.map((b, i) => (
            <Frame
              key={b.word}
              progress={scrollYProgress}
              image={b.image}
              start={i / beats.length}
              end={(i + 1) / beats.length}
              eager={i === 0}
            />
          ))}
        </div>

        {/*
          Directional scrim: strong at the bottom where the beat copy sits,
          light at the top. The previous three-stop wash flattened every image
          into mud.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/35 to-night/45" />

        <div className="container-page relative z-10 flex h-full flex-col justify-between pt-[calc(var(--header-height)+3.5rem)] pb-[10vh]">
          <div className="max-w-xl">
            <div className="rule-top-invert">
              <h2 className="display-lg max-w-[15ch] text-white">
                Every decision made before anything is built.
              </h2>
            </div>
          </div>

          <div className="relative h-[16rem] md:h-[18rem]">
            {beats.map((b, i) => (
              <Beat
                key={b.word}
                progress={scrollYProgress}
                word={b.word}
                note={b.note}
                index={i}
                start={i / beats.length}
                end={(i + 1) / beats.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
