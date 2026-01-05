"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";

// ========================================
// EDITABLE OFFERS CONFIGURATION
// ========================================
const SPECIAL_OFFERS = [
  {
    id: "1",
    title: "Lubu Apvadas 1.50.169",
    image: "https://pub-262c7ff9747743f0853580fc0debb426.r2.dev/lubu-apvadai/1.50.169.100.png",
    href: "/produktai/lubu-apvadai",
    oldPrice: 75.00,
    newPrice: 56.45,
  },
  {
    id: "2",
    title: "Lubu Apvadas 1.50.125",
    image: "https://pub-262c7ff9747743f0853580fc0debb426.r2.dev/lubu-apvadai/1.50.125.100.png",
    href: "/produktai/lubu-apvadai/1.50.125",
    oldPrice: 60.00,
    newPrice: 41.36,
  },
  {
    id: "3",
    title: "Lubu Apvadas 1.50.112",
    image: "https://pub-262c7ff9747743f0853580fc0debb426.r2.dev/lubu-apvadai/1.50.112.100.png",
    href: "/produktai/lubu-apvadai/1.50.112",
    oldPrice: 40.00,
    newPrice: 27.96,
  },
];

const SpecialOffersCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [numVisible, setNumVisible] = useState(3);

  // Triple data for infinite loop
  const displayOffers = [];
  for (let i = 0; i < SPECIAL_OFFERS.length * 3; i++) {
    displayOffers.push({ 
      ...SPECIAL_OFFERS[i % SPECIAL_OFFERS.length], 
      id: `${SPECIAL_OFFERS[i % SPECIAL_OFFERS.length].id}-${i}` 
    });
  }

  // Responsive card count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setNumVisible(2); // Mobile + Tablet
      } else {
        setNumVisible(3); // Desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemWidth = 100 / numVisible;

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);

    if (currentSlide >= displayOffers.length - numVisible - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 0);
    }
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(displayOffers.length - numVisible - 1);

      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev - 1);
      }, 50);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isTransitioning]);

  return (
    <section className="py-16 w-full px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-4">
          Specialūs <span className="text-teal-300">Pasiūlymai</span>
        </h2>

        <div className="flex items-center justify-center gap-2 mb-12">
          <Tag className="w-5 h-5 text-teal-300" />
          <p className="text-lg text-white/60">Ribotas laikas</p>
        </div>

        <div className="relative">
          {/* LEFT BUTTON */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl p-3 rounded-full shadow-lg hover:bg-white/20 transition-all border border-white/20"
            aria-label="Previous offer"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl p-3 rounded-full shadow-lg hover:bg-white/20 transition-all border border-white/20"
            aria-label="Next offer"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* CAROUSEL */}
          <div className="overflow-hidden mx-16">
            <div
              className={`flex gap-6 ${
                isTransitioning ? "transition-transform duration-500 ease-out" : ""
              }`}
              style={{
                transform: `translateX(-${currentSlide * (itemWidth + 2)}%)`,
              }}
            >
              {displayOffers.map((offer) => (
                <article
                  key={offer.id}
                  className="flex-shrink-0"
                  style={{ width: `${itemWidth}%` }}
                >
                  <a href={offer.href} className="block group">
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                      <div className="absolute top-4 right-4 z-10 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-sm font-medium">Akcija</span>
                      </div>

                      <div className="aspect-square relative overflow-hidden bg-white/5">
                        <img 
                          src={offer.image} 
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6 text-center">
                        <h3 className="text-lg font-medium text-white mb-3 group-hover:text-teal-300 transition-colors">
                          {offer.title}
                        </h3>

                        <div className="flex items-center justify-center gap-3">
                          <span className="text-red-400 line-through text-lg">
                            €{offer.oldPrice.toFixed(2)}
                          </span>
                          <span className="text-white font-semibold text-2xl">
                            €{offer.newPrice.toFixed(2)}
                          </span>
                        </div>
                        
                        <p className="text-white/40 text-sm mt-2">*3-10 d.d.</p>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersCarousel;