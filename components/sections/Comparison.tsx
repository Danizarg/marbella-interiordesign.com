"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/motion/RevealText";
import { easePremium } from "@/lib/motion";
import { img } from "@/lib/data/imagery";

export function Comparison() {
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    if (!drag) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (e instanceof TouchEvent) update(e.touches[0].clientX);
      else update(e.clientX);
    };
    const onUp = () => setDrag(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [drag, update]);

  return (
    <section className="bg-canvas section-y-tight">
      <div className="container-page">
        <div className="rule-top mb-14 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <RevealText
              as="h2"
              className="display-xl max-w-[14ch]"
              lines={["Move between", "study and render."]}
            />
          </div>
          <p className="max-w-sm self-end text-[15px] leading-[1.6] text-muted md:col-span-4 md:col-start-9">
            The same room as an early tonal study and as a resolved
            visualization. Drag the divider.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: easePremium }}
          ref={wrapRef}
          className="relative aspect-[4/5] w-full select-none overflow-hidden bg-stone/40 sm:aspect-[16/10]"
          onMouseDown={(e) => {
            setDrag(true);
            update(e.clientX);
          }}
          onTouchStart={(e) => {
            setDrag(true);
            update(e.touches[0].clientX);
          }}
        >
          {/* Resolved render */}
          <Image
            src={img.poolTerrace.src}
            alt="Resolved photorealistic visualization"
            fill
            quality={88}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: img.poolTerrace.focal }}
          />

          {/*
            The left side is the same frame under a tonal-study treatment — a
            genuine desaturation pass, not a second image passed off as an
            earlier deliverable.
          */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - pos}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
            }}
          >
            <Image
              src={img.poolTerrace.src}
              alt="Early tonal study of the same composition"
              fill
              quality={88}
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: img.poolTerrace.focal,
                filter: "grayscale(1) contrast(0.82) brightness(1.06)",
              }}
            />
          </div>

          <div className="absolute left-5 top-5 bg-ink/75 px-3 py-2 text-[10px] uppercase tracking-eyebrow text-canvas backdrop-blur-sm">
            Study
          </div>
          <div className="absolute right-5 top-5 bg-canvas/90 px-3 py-2 text-[10px] uppercase tracking-eyebrow text-ink backdrop-blur-sm">
            Render
          </div>

          {/* Handle */}
          <div
            className="pointer-events-none absolute inset-y-0"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-full w-px bg-canvas/80" />
            <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
              <div className="flex gap-[3px]">
                <span className="h-3 w-[2px] bg-ink/60" />
                <span className="h-3 w-[2px] bg-ink/60" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
