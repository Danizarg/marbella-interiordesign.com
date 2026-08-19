"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { easePremium } from "@/lib/motion";

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
    <section className="bg-canvas section-y">
      <div className="container-page">
        <div className="mb-14 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionEyebrow>Concept · Render</SectionEyebrow>
            <RevealText
              as="h2"
              className="display-xl mt-6 max-w-[14ch]"
              lines={["Move between", "concept and reality."]}
            />
          </div>
          <p className="max-w-lg self-end text-sm text-muted md:col-span-5 md:col-start-8 md:text-base">
            Compare the early architectural composition with the finalised
            photorealistic render. Drag the divider or tap either side.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: easePremium }}
          ref={wrapRef}
          className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-md bg-stone/40"
          onMouseDown={(e) => {
            setDrag(true);
            update(e.clientX);
          }}
          onTouchStart={(e) => {
            setDrag(true);
            update(e.touches[0].clientX);
          }}
        >
          {/* Base: render */}
          <Image
            src="/renders/render-06.jpg"
            alt="Photorealistic 3D render"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />

          {/* Overlay: concept */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - pos}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
            }}
          >
            <Image
              src="/renders/render-12.jpg"
              alt="Concept visualization"
              fill
              sizes="100vw"
              className="object-cover"
              style={{
                filter: "grayscale(0.35) contrast(0.95) brightness(0.98)",
              }}
            />
            <div className="absolute inset-0 bg-canvas/10 mix-blend-multiply" />
          </div>

          {/* Labels */}
          <div className="absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-eyebrow text-canvas backdrop-blur-sm">
            Concept
          </div>
          <div className="absolute right-5 top-5 rounded-full bg-canvas/85 px-3 py-1 text-[11px] uppercase tracking-eyebrow text-ink backdrop-blur-sm">
            3D Render
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
