"use client";

import { useRef, useEffect, useState } from "react";
import { animate } from "framer-motion";
import Hero from "./Hero/Hero";
import CategoryCarousel from "./CategoryCarousel/CategoryCarousel";
import VersloKlijentai from "./VersloKlijentai/VersloKlijentai";
import ProfessionalInstallation from "./ProfesonalusInstaliavimas/profesonalus-instaliavimas";
import SpecialOffersCarousel from "./SpecialusPasiulymai/SpecialusPasiulymai";
import FAQSection from "./DUK/DUK";

// Sections
const sections = [
  { id: "hero", component: <Hero /> },
  { id: "category", component: <CategoryCarousel /> },
  { id: "verslo", component: <VersloKlijentai /> },
  { id: "installation", component: <ProfessionalInstallation /> },
  { id: "offers", component: <SpecialOffersCarousel /> },
  { id: "faq", component: <FAQSection /> },
];

export default function LandingClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect mobile/tablet vs desktop
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Scroll to section (desktop only)
  const scrollToSection = (index: number) => {
    if (!isDesktop) return; // Disable on mobile & tablet
    if (!containerRef.current || !sectionRefs.current[index]) return;

    const container = containerRef.current;
    const section = sectionRefs.current[index];
    const targetTop =
      section.offsetTop - container.clientHeight / 2 + section.clientHeight / 2;

    setScrolling(true);
    setActiveIndex(index);

    animate(container.scrollTop, targetTop, {
      duration: 0.8,
      ease: "easeInOut",
      onUpdate: (value: number) => {
        container.scrollTop = value;
      },
      onComplete: () => {
        setTimeout(() => setScrolling(false), 800);
      },
    });
  };

  // Desktop wheel behavior
  const handleWheel = (event: WheelEvent) => {
    if (!isDesktop) return;
    if (scrolling) return;

    if (event.deltaY > 0 && activeIndex < sections.length - 1) {
      scrollToSection(activeIndex + 1);
    } else if (event.deltaY < 0 && activeIndex > 0) {
      scrollToSection(activeIndex - 1);
    }
  };

  // Init scroll to hero on desktop
  useEffect(() => {
    if (isDesktop) scrollToSection(0);
  }, [isDesktop]);

  // Wheel event listener (desktop only)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isDesktop) {
      container.addEventListener("wheel", handleWheel, { passive: true });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [activeIndex, scrolling, isDesktop]);

  return (
    <div className="relative flex w-full">
      {/* Scrollbar – show only on desktop */}
      {isDesktop && (
        <div className="fixed right-4 top-0 h-screen flex flex-col justify-center items-center space-y-2 z-50">
          {sections.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "bg-emerald-400 scale-150" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll container */}
      <div
        ref={containerRef}
        className={
          isDesktop
            ? "h-screen overflow-y-hidden w-full"
            : "w-full overflow-y-auto scroll-smooth"
        }
      >
        {sections.map((section, idx) => (
          <div
            key={section.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className={
              isDesktop
                ? "min-h-screen flex justify-center items-center py-40"
                : "min-h-[80vh] flex justify-center items-center py-20"
            }
          >
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
}