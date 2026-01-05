"use client";

import { useEffect, useRef } from "react";

export default function QuoteSection() {
  const underlineRef = useRef<HTMLSpanElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const element = underlineRef.current;
    if (!element || !pathRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          pathRef.current!.classList.add("animate-underline");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-4 px-6 flex flex-col items-center justify-center text-center font-sans">
      <div className="text-[150px] text-white leading-none mb-0 font-serif">
        “
      </div>

      <h2 className="text-white font-bold leading-tight text-[clamp(32px,5vw,60px)] max-w-[900px] mt-[-20px]">
        Gyvenk tame, ką{" "}
        <span ref={underlineRef} className="relative inline-block">
          myli.
          <svg
            className="absolute bottom-0 left-0 w-full h-[20px] overflow-visible"
            viewBox="0 0 200 20"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              className="underline-path stroke-white stroke-[6px] fill-none stroke-linecap-round"
              d="M 5 15 Q 100 5, 195 15"
            />
          </svg>
        </span>
      </h2>
    </section>
  );
}
