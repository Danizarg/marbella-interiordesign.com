"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { img } from "@/lib/data/imagery";

const marks = ["Light", "Material", "Proportion", "Detail"];

/**
 * The signature sequence. Pinned for 260vh: the frame opens from a contained
 * plate to full bleed while the camera pushes into the corridor, four
 * architectural concepts register one at a time, and the section resolves on a
 * single closing line.
 */
export function ImmersiveReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const marksRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const frame = frameRef.current;
        const image = imageRef.current;
        const intro = introRef.current;
        const outro = outroRef.current;
        const markEls = marksRef.current?.querySelectorAll("[data-mark]");
        if (!frame || !image || !markEls) return;

        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reduced) {
          gsap.set(frame, { width: "100%", borderRadius: 0 });
          gsap.set(markEls, { opacity: 1, y: 0 });
          gsap.set(outro, { opacity: 1 });
          gsap.set(intro, { opacity: 0 });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=260%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          frame,
          { width: "72%" },
          { width: "100%", ease: "power2.inOut", duration: 1 },
          0,
        )
          .fromTo(
            image,
            { scale: 1.25 },
            { scale: 1, ease: "none", duration: 2.6 },
            0,
          )
          .to(intro, { opacity: 0, y: -30, ease: "power2.in", duration: 0.4 }, 0.15)
          .fromTo(
            markEls,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.35,
              stagger: 0.42,
            },
            0.55,
          )
          .to(
            markEls,
            { opacity: 0.25, ease: "power1.inOut", duration: 0.3, stagger: 0.42 },
            0.95,
          )
          .fromTo(
            outro,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
            2.25,
          );
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-night text-white"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={frameRef}
          className="relative h-full w-[72%] overflow-hidden bg-black/40"
        >
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={img.travertineCorridor.src}
              alt="Travertine corridor lit by concealed light"
              fill
              quality={90}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: img.travertineCorridor.focal }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/15 to-night/50" />
        </div>
      </div>

      <div className="container-page pointer-events-none relative z-10 flex h-full flex-col justify-between pt-[calc(var(--header-height)+3rem)] pb-[10vh]">
        <div ref={introRef} className="max-w-xl">
          <div className="rule-top-invert">
            <h2 className="display-lg max-w-[13ch] text-white">
              Not a drawing. A preview of reality.
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div
            ref={marksRef}
            className="flex flex-wrap items-baseline gap-x-8 gap-y-3 md:gap-x-14"
          >
            {marks.map((m) => (
              <span
                key={m}
                data-mark
                className="font-display text-[clamp(1.5rem,3.4vw,2.75rem)] font-light leading-none tracking-display text-white"
              >
                {m}
              </span>
            ))}
          </div>

          <div ref={outroRef} className="border-t border-white/25 pt-6">
            <p className="max-w-lg font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-light leading-[1.25] tracking-title text-white">
              Every decision, visible before construction begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
