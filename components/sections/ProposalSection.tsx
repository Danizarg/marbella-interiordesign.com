"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { easePremium } from "@/lib/motion";

const included = [
  "Premium responsive redesign",
  "Advanced motion & interactions",
  "Editorial portfolio presentation",
  "Mobile optimisation",
  "Contact integration",
];

export function ProposalSection() {
  return (
    <section className="relative bg-night text-white section-y">
      <div className="container-page">
        <div className="mb-16 max-w-3xl md:mb-24">
          <SectionEyebrow invert>Redesign proposal</SectionEyebrow>
          <RevealText
            as="h2"
            className="display-xl mt-6 max-w-[18ch] text-white"
            lines={["A new digital presence", "for Marbella Interior Design."]}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: easePremium, delay: 0.2 }}
            className="mt-8 max-w-xl text-sm leading-[1.6] text-white/60 md:text-base"
          >
            The site you are looking at right now — built as a working
            prototype for the studio. Fully responsive, cinematically animated,
            and ready to present the studio's renders at the level they
            deserve.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12 border border-white/12 bg-white/[0.02] p-8 md:grid-cols-12 md:gap-10 md:p-14">
          {/* Left: pricing */}
          <div className="md:col-span-6">
            <div className="eyebrow mb-6 text-white/50">Investment</div>

            <div className="flex items-baseline gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-eyebrow text-white/40">
                  Typical bespoke redesign
                </div>
                <div className="mt-1 font-display text-2xl text-white/40 line-through">
                  €1,500+
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: easePremium, delay: 0.15 }}
              className="mt-10"
            >
              <div className="text-[11px] uppercase tracking-eyebrow text-white/70">
                Your redesign
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-[clamp(4rem,10vw,7rem)] leading-none">
                  €300
                </span>
                <span className="text-sm text-white/60">
                  one-time redesign fee
                </span>
              </div>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="btn-invert group"
              >
                <span>Upgrade the website — €300</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="text-sm text-white/60 underline-offset-4 transition hover:text-white hover:underline"
              >
                Or talk it through with the studio
              </a>
            </div>
          </div>

          {/* Right: what's included */}
          <div className="md:col-span-6 md:border-l md:border-white/10 md:pl-14">
            <div className="eyebrow mb-6 text-white/50">Included</div>
            <ul className="space-y-4">
              {included.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    ease: easePremium,
                    delay: 0.1 + i * 0.06,
                  }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center border border-white/25 text-white/70">
                    <Check size={12} />
                  </span>
                  <span className="text-[15px] text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 space-y-4 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/40">
              <p>
                <span className="text-white/70">On the imagery:</span> the
                photographs in this prototype are licensed placeholders, chosen
                to show the layout at its intended quality. On the live site
                they are replaced by the studio's own renders — supplied at the
                highest resolution available, which is where this design will
                look its best.
              </p>
              <p>
                Typical bespoke redesign pricing reflects what web studios and
                freelancers commonly charge in this segment. It is not a prior
                quotation from any specific supplier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
