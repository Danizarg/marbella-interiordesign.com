"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ImmersiveReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!sectionRef.current || !frameRef.current || !imageRef.current) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=180%",
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
            },
          })
          .fromTo(
            frameRef.current,
            { width: "78%", borderRadius: 12 },
            { width: "100%", borderRadius: 0, ease: "power2.inOut" },
            0,
          )
          .fromTo(
            imageRef.current,
            { scale: 1.1 },
            { scale: 1, ease: "power2.out" },
            0,
          )
          .to(
            textRef.current,
            { opacity: 0, y: -40, ease: "power2.in" },
            0.15,
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
      <div className="absolute inset-x-0 top-0 z-10 pt-[calc(var(--header-height)+2rem)]">
        <div className="container-page" ref={textRef}>
          <SectionEyebrow invert>Not a drawing</SectionEyebrow>
          <RevealText
            as="h2"
            className="display-xl mt-6 max-w-[14ch] text-white"
            lines={["Not a drawing.", "A preview of reality."]}
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={frameRef}
          className="relative aspect-[16/9] w-[78%] overflow-hidden bg-black/30"
          style={{ borderRadius: 12 }}
        >
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src="/renders/render-11.jpg"
              alt="Full-bleed architectural render"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
