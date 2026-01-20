"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Types
type Category = {
  id: number;
  title: string;
  img: string;
  hoverImg: string;
  href?: string;
};

// Data
const interieras: Category[] = [
  { id: 1, title: "Lubų apvadai", img: "/images/landing/lubu-apvadai.webp", hoverImg: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/lubu-apvadai" },
  { id: 2, title: "Sienų apvadai", img: "/images/landing/sienu-apvadai.webp", hoverImg: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/sienu-apvadai" },
  { id: 3, title: "Grindų apvadai", img: "/images/landing/grindu-apvadai.webp", hoverImg: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/grindu-apvadai" },
  { id: 4, title: "Rozetės", img: "/images/landing/rozetes.webp", hoverImg: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/rozetes" },
  { id: 5, title: "Sienų plokštės", img: "/images/landing/sienu-paneles.webp", hoverImg: "https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/sienu-paneles" },
  { id: 6, title: "Lubų panelės", img: "/images/landing/lubu-paneles.webp", hoverImg: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/lubu-paneles" },
  { id: 7, title: "Piliastrai", img: "/images/landing/piliastrai.webp", hoverImg: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/piliastrai" },
  { id: 8, title: "Kolonos", img: "/images/landing/kolonos.webp", hoverImg: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/kolonos" },
  { id: 9, title: "Puskolonos", img: "/images/landing/puskolonos.webp", hoverImg: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/puskolonos" },
  { id: 10, title: "Arkiniai apvadai", img: "/images/landing/arkiniai-apvadai.webp", hoverImg: "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/arkiniai-apvadai" },
  { id: 12, title: "Gembės", img: "/images/landing/gembes.webp", hoverImg: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/gembes" },
  { id: 13, title: "Židinio dekoracija", img: "/images/landing/zidinio-dekoracija.webp", hoverImg: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/zidinio-dekoracija" },
  { id: 14, title: "Nišos", img: "/images/landing/nisos.webp", hoverImg: "https://images.pexels.com/photos/2988865/pexels-photo-2988865.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/nisos" },
  { id: 16, title: "Apvadų kampai", img: "/images/landing/apvadu-kampai.webp", hoverImg: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/apvadu-kampai" },
  { id: 18, title: "Ornamentai", img: "/images/landing/ornamentai.webp", hoverImg: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/ornamentai" },
  { id: 19, title: "Žiedai", img: "/images/landing/ziedai.webp", hoverImg: "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/ziedai" },
  { id: 21, title: "Arkiniai elementai", img: "/images/landing/arkiniai-elementai.webp", hoverImg: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/arkiniai-elementai" },
  { id: 22, title: "Papildomi elementai", img: "/images/landing/papildomi-elementai.webp", hoverImg: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/papildomi-elementai" },
];

const fasadas: Category[] = [
  { id: 24, title: "Frizai", img: "/images/landing/frizai.webp", hoverImg: "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/frizai" },
  { id: 25, title: "Architravai", img: "/images/landing/architravai.webp", hoverImg: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/architravai" },
  { id: 26, title: "Piliastrai", img: "/images/landing/piliastrai.webp", hoverImg: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/piliastrai" },
  { id: 27, title: "Kolonos", img: "/images/landing/kolonos.webp", hoverImg: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/kolonos" },
  { id: 28, title: "Puskolonos", img: "/images/landing/puskolonos.webp", hoverImg: "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/puskolonos" },
  { id: 29, title: "Balustrai", img: "/images/landing/balustrai.webp", hoverImg: "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/balustrai" },
  { id: 31, title: "Stulpo kepurė", img: "/images/landing/stulpo-kepure.webp", hoverImg: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/stulpo-kepure" },
  { id: 32, title: "Balustrados pagrindai", img: "/images/landing/balustrados-pagrindai.webp", hoverImg: "https://images.pexels.com/photos/2988865/pexels-photo-2988865.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/balustrados-pagrindai" },
  { id: 33, title: "Balustrados porankiai", img: "/images/landing/balustrados-porankiai.webp", hoverImg: "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/balustrados-porankiai" },
  { id: 34, title: "Langų juostos", img: "/images/landing/lauko-palanges.webp", hoverImg: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/lauko-palanges" },
  { id: 35, title: "Langų arkiniai rėmai", img: "/images/landing/lango-arkiniai-remai.webp", hoverImg: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/lango-arkiniai-remai" },
  { id: 36, title: "Riežamieji elementai", img: "/images/landing/riejamieji-elementai.webp", hoverImg: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/riejamieji-elementai" },
  { id: 37, title: "Lauko Palangės", img: "/images/landing/palanges.webp", hoverImg: "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/lauko-palanges" },
  { id: 38, title: "Pjedestalinės gembės", img: "/images/landing/pjedestalines-gembes.webp", hoverImg: "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/pjedestalines-gembes" },
  { id: 39, title: "Langų Angokras", img: "/images/landing/lango-soniniai-apvadai.webp", hoverImg: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/lango-soniniai-apvadai" },
  { id: 42, title: "Fasado ornamentai", img: "/images/landing/fasado-ornamentai.webp", hoverImg: "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/fasado-ornamentai" },
  { id: 43, title: "Rustikai", img: "/images/landing/rustikai.webp", hoverImg: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/rustikai" },
  { id: 45, title: "Fasado galiniai elementai", img: "/images/landing/fasado-galiniai-elementai.webp", hoverImg: "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800", href: "/produktai/fasado-galiniai-elementai" },
];


// Components
interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={category.href ?? "#"}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-[0_20px_60px_rgba(56,189,248,0.4)] transition-all duration-500 hover:scale-[1.08] hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 via-teal-400/0 to-sky-400/0 group-hover:from-cyan-400/20 group-hover:via-teal-400/10 group-hover:to-sky-400/20 transition-all duration-700 blur-xl" />

      <div className="aspect-square overflow-hidden rounded-2xl relative bg-slate-900/50">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

        <img
          src={isHovered ? category.hoverImg : category.img}
          alt={category.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2 brightness-90 group-hover:brightness-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-teal-400/30 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="p-4 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent rounded-b-2xl" />
        <h3 className="text-base font-medium text-white relative z-10 transform transition-all duration-500 group-hover:scale-105 group-hover:text-cyan-300 drop-shadow-[0_2px_8px_rgba(34,211,238,0.5)] line-clamp-2">
          {category.title}
        </h3>
        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-500 mx-auto mt-2" />
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-cyan-400/50 transition-all duration-500" />
    </a>
  );
}

interface TabNavigationProps {
  activeTab: "interjeras" | "fasadas";
  onTabChange: (tab: "interjeras" | "fasadas") => void;
}

function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex justify-center gap-12 mb-16">
      <button
        onClick={() => onTabChange("interjeras")}
        className="relative pb-3 text-2xl font-light text-white/70 hover:text-white transition-colors duration-300"
        style={{ fontFamily: 'Karla, sans-serif' }}
      >
        Interjeras
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 ${
            activeTab === "interjeras" ? "opacity-100" : "opacity-0"
          }`}
        />
      </button>
      <button
        onClick={() => onTabChange("fasadas")}
        className="relative pb-3 text-2xl font-light text-white/70 hover:text-white transition-colors duration-300"
        style={{ fontFamily: 'Karla, sans-serif' }}
      >
        Fasadas
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 ${
            activeTab === "fasadas" ? "opacity-100" : "opacity-0"
          }`}
        />
      </button>
    </div>
  );
}

interface PageIndicatorProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function PageIndicator({ totalPages, currentPage, onPageChange }: PageIndicatorProps) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx)}
          className={`h-2 rounded-full transition-all duration-300 ${
            idx === currentPage
              ? "w-8 bg-cyan-400"
              : "w-2 bg-white/30 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}

interface ProductGridProps {
  categories: Category[];
  currentIndex: number;
  itemsPerPage: number;
}

function ProductGrid({ categories, currentIndex, itemsPerPage }: ProductGridProps) {
  const visibleCategories = categories.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 transition-all duration-500">
      {visibleCategories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <>
      <h1 
        className="text-4xl sm:text-5xl lg:text-6xl font-light text-white text-center mb-6" 
        style={{ fontFamily: 'Karla, sans-serif' }}
      >
        {title}
      </h1>
      <p className="text-lg sm:text-xl text-white/80 text-center max-w-2xl mx-auto mb-12">
        {subtitle}
      </p>
    </>
  );
}

// Main Component
export default function ProduktaiPage() {
  const [activeTab, setActiveTab] = useState<"interjeras" | "fasadas">("interjeras");
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const categories = activeTab === "interjeras" ? interieras : fasadas;
  const itemsPerPage = 6;
  const maxIndex = Math.max(0, Math.ceil(categories.length / itemsPerPage) - 1);

  const animateToPage = (newIndex: number) => {
    if (isAnimating.current || newIndex === currentIndex || newIndex < 0 || newIndex > maxIndex) return;
    isAnimating.current = true;

    if (gridRef.current) {
      gsap.to(gridRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(newIndex);
          gsap.fromTo(
            gridRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                isAnimating.current = false;
              },
            }
          );
        },
      });
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    let scrollTriggerInstance: ScrollTrigger;

    const ctx = gsap.context(() => {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${(maxIndex + 1) * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          if (isAnimating.current) return;
          
          const progress = self.progress;
          const newIndex = Math.floor(progress * (maxIndex + 1));
          const clampedIndex = Math.min(newIndex, maxIndex);
          
          if (clampedIndex !== currentIndex) {
            animateToPage(clampedIndex);
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [maxIndex, currentIndex, activeTab]);

  const handleTabChange = (tab: "interjeras" | "fasadas") => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  return (
    <>

      {/* Pinned Section */}
      <section 
        ref={sectionRef}
        className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.15),transparent_50%)]" />

        <div ref={contentRef} className="h-full flex items-center justify-center py-16 px-6 relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            <PageHeader
              title="Produktų Kategorijos"
              subtitle="Naršykite mūsų aukštos kokybės statybinių ir apdailos medžiagų pasirinkimą"
            />

            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            <PageIndicator
              totalPages={maxIndex + 1}
              currentPage={currentIndex}
              onPageChange={animateToPage}
            />

            <div ref={gridRef}>
              <ProductGrid
                categories={categories}
                currentIndex={currentIndex}
                itemsPerPage={itemsPerPage}
              />
            </div>

            <div className="text-center mt-8 text-white/50 text-sm">
              {currentIndex < maxIndex ? "Žemyn..." : "Scroll down to continue"}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}