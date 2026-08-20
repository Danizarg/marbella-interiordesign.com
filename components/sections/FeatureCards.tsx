"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealText } from "@/components/motion/RevealText";
import { easePremium } from "@/lib/motion";
import { img } from "@/lib/data/imagery";

const principles = [
  {
    n: "01",
    title: "Photorealism",
    body: "Light, texture and material behave as they would on site — not as an illustration of the space, but as a photograph of one that does not exist yet.",
  },
  {
    n: "02",
    title: "Material accuracy",
    body: "Stone veining, timber grain and textile weave rendered at their real scale. A finish that reads correctly at arm's length reads correctly on site.",
  },
  {
    n: "03",
    title: "Spatial confidence",
    body: "Volume, proportion and circulation resolved as architecture — before construction commits to them, and before they become expensive to change.",
  },
];

export function FeatureCards() {
  return (
    <section className="bg-canvas section-y">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          {/* Supporting image is a companion, not a card thumbnail per item. */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone/40 md:sticky md:top-32">
              <Image
                src={img.warmLounge.src}
                alt="Warm minimal interior with travertine and timber"
                fill
                quality={86}
                sizes="(min-width:768px) 41vw, 100vw"
                className="object-cover"
                style={{ objectPosition: img.warmLounge.focal }}
              />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="rule-top">
              <RevealText
                as="h2"
                className="display-xl max-w-[14ch]"
                lines={["Three things", "we insist on."]}
              />
            </div>

            <dl className="mt-14 md:mt-20">
              {principles.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                    margin: "0px 0px -80px 0px",
                  }}
                  transition={{
                    duration: 1,
                    ease: easePremium,
                    delay: i * 0.08,
                  }}
                  className="border-t border-ink/12 py-8 first:border-t-0 first:pt-0 md:py-10"
                >
                  <dt className="flex items-baseline gap-5">
                    <span className="font-sans text-[10px] tabular-nums tracking-eyebrow text-muted">
                      {p.n}
                    </span>
                    <span className="font-display text-[1.6rem] leading-tight tracking-title md:text-[2rem]">
                      {p.title}
                    </span>
                  </dt>
                  <dd className="mt-4 max-w-md pl-[calc(10px+1.25rem)] text-[15px] leading-[1.65] text-muted">
                    {p.body}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
