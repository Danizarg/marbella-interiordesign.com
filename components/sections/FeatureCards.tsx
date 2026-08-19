"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { easePremium } from "@/lib/motion";

const cards = [
  {
    title: "Photorealism",
    body: "Renders indistinguishable from the finished space — light, texture and material behaving as they would on site.",
    image: "/renders/render-07.jpg",
  },
  {
    title: "Material accuracy",
    body: "Stone veining, timber grain and textile weave rendered at their real scale, not approximated.",
    image: "/renders/render-25.jpg",
  },
  {
    title: "Spatial confidence",
    body: "Volume, proportion and circulation resolved as architecture — before construction commits to them.",
    image: "/renders/render-26.jpg",
  },
];

function Card({
  title,
  body,
  image,
  i,
}: {
  title: string;
  body: string;
  image: string;
  i: number;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: easePremium, delay: i * 0.1 }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx.set(-py * 2.5);
        ry.set(px * 2.5);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ transform }}
      className="group relative overflow-hidden rounded-md bg-surface transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(13,14,16,0.12)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/40">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-7 md:p-8">
        <h3 className="font-display text-2xl leading-tight tracking-title">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-[1.6] text-muted md:text-[15px]">
          {body}
        </p>
      </div>
    </motion.article>
  );
}

export function FeatureCards() {
  return (
    <section className="bg-canvas section-y">
      <div className="container-page">
        <div className="mb-16 max-w-2xl md:mb-20">
          <SectionEyebrow>Why studios choose visualization</SectionEyebrow>
          <RevealText
            as="h2"
            className="display-xl mt-6 max-w-[16ch]"
            lines={["Three things", "we insist on."]}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((c, i) => (
            <Card key={c.title} {...c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
