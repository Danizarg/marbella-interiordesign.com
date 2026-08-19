"use client";

import { RevealText } from "@/components/motion/RevealText";

export function Statement() {
  return (
    <section className="bg-night py-24 text-white md:py-32">
      <div className="container-page">
        <RevealText
          as="h2"
          className="font-display font-light leading-[0.95] tracking-display text-white"
          lineClassName="text-[clamp(3rem,10vw,9rem)]"
          lines={["See it.", "Refine it.", "Then build it."]}
        />
      </div>
    </section>
  );
}
