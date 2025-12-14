"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import productsData from "@/app/data/produktai.json"; // Update this path to your JSON file location

interface Product {
  id: string | number;
  title: string;
  img: string;
  ilgis?: number;
  aukstis?: number | number[];
  stilius?: string;
  sudetis?: string;
  gylis?: number;
  pristatymo_terminas?: string;
  papildoma_informacija?: string;
  description?: string;
  old_price?: number;
  price?: number;
}

interface Category {
  id: number;
  title: string;
  slug: string;
  products: Product[];
}

interface Offer {
  id: string;
  title: string;
  image: string;
  href: string;
  oldPrice: string;
  newPrice: string;
  category: string;
}

const SpecialOffersCarousel = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const discountedProducts: Offer[] = [];
    
    // Loop through all categories
    (productsData as Category[]).forEach(category => {
      // Loop through products in each category
      category.products.forEach(product => {
        // Check if product has both old_price and price fields
        if (product.old_price !== undefined && product.price !== undefined) {
          discountedProducts.push({
            id: String(product.id),
            title: product.title,
            image: product.img,
            href: `/products/${category.slug}/${product.id}`,
            oldPrice: `€${product.old_price.toFixed(2)}`,
            newPrice: `€${product.price.toFixed(2)}`,
            category: category.title
          });
        }
      });
    });
    
    setOffers(discountedProducts);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [numVisible, setNumVisible] = useState(3);

  // Triple data for infinite loop
  const displayOffers: Offer[] = [];
  for (let i = 0; i < offers.length * 3; i++) {
    if (offers[i % offers.length]) {
      displayOffers.push({ 
        ...offers[i % offers.length], 
        id: `${offers[i % offers.length].id}-${i}` 
      });
    }
  }

  // -------------------------------
  // RESPONSIVE CARD COUNT
  // Mobile  → 2
  // Tablet  → 2
  // Desktop → 3
  // -------------------------------
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setNumVisible(2); // MOBILE + TABLET
      } else {
        setNumVisible(3); // DESKTOP
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

  if (offers.length === 0) {
    return null; // Don't render if no offers
  }

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
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl p-3 rounded-full shadow-lg hover:bg-white/20 transition-all border border-white/20"
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

                      <div className="aspect-square relative overflow-hidden">
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
                            {offer.oldPrice}
                          </span>
                          <span className="text-white font-semibold text-2xl">
                            {offer.newPrice}
                          </span>
                        </div>
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