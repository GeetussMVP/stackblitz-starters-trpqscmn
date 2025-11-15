'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SpecialOffersCarousel = () => {
  const offers = [
    { 
      title: 'Cornice 1', 
      image: '/images/placeholder.jpg',
      href: '/special-offers/cornice-1',
      oldPrice: '€10',
      newPrice: '€9'
    },
    { 
      title: 'Cornice 2', 
      image: '/images/placeholder.jpg',
      href: '/special-offers/cornice-2',
      oldPrice: '€10',
      newPrice: '€9'
    },
    { 
      title: 'Cornice 3', 
      image: '/images/placeholder.jpg',
      href: '/special-offers/cornice-3',
      oldPrice: '€10',
      newPrice: '€9'
    },
    { 
      title: 'Cornice 4', 
      image: '/images/placeholder.jpg',
      href: '/special-offers/cornice-4',
      oldPrice: '€10',
      newPrice: '€9'
    },
    { 
      title: 'Cornice 5', 
      image: '/images/placeholder.jpg',
      href: '/special-offers/cornice-5',
      oldPrice: '€10',
      newPrice: '€9'
    },
    { 
      title: 'Cornice 6', 
      image: '/images/placeholder.jpg',
      href: '/special-offers/cornice-6',
      oldPrice: '€10',
      newPrice: '€9'
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [numVisible, setNumVisible] = useState(3);
  
  // Create a circular array by repeating the offers
  const displayOffers = [];
  for (let i = 0; i < offers.length * 3; i++) {
    displayOffers.push({ ...offers[i % offers.length], id: i });
  }

  useEffect(() => {
    const updateNumVisible = () => {
      if (window.innerWidth < 640) {
        setNumVisible(2);
      } else if (window.innerWidth < 1024) {
        setNumVisible(4);
      } else {
        setNumVisible(5);
      }
    };

    updateNumVisible();
    window.addEventListener('resize', updateNumVisible);

    return () => window.removeEventListener('resize', updateNumVisible);
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
    
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
        setCurrentSlide(prev => prev - 1);
      }, 50);
    } else {
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isTransitioning]);

  const getItemWidth = () => {
    switch(numVisible) {
      case 2: return 'w-1/2';
      case 4: return 'w-1/4';
      case 5: return 'w-1/5';
      default: return 'w-1/5';
    }
  };

  return (
    <section className="py-2 w-full" aria-labelledby="special-offers-heading">
      <div className="w-full px-3">
        <h2 id="special-offers-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 text-white">
          Specialūs <span className="text-emerald-400">Pasiūlymai</span>
        </h2>
        <div className="relative w-full" role="region" aria-label="Special offers carousel" aria-live="polite">
          <button 
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full shadow-lg hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Previous offers"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full shadow-lg hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Next offers"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
          </button>

          <div className="overflow-hidden mx-8">
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentSlide * (100 / numVisible)}%)` 
              }}
              role="group"
              aria-label={`Special offers ${currentSlide + 1} to ${Math.min(currentSlide + numVisible, offers.length)} of ${offers.length}`}
            >
              {displayOffers.map((offer, index) => (
                <article 
                  key={`offer-${offer.id}-${index}`}
                  className={`${getItemWidth()} flex-shrink-0 flex items-center justify-center`}
                >
                  <a 
                    href={offer.href}
                    className="rounded-md shadow-md overflow-hidden h-full flex flex-col bg-white/80 backdrop-blur-sm w-[88%] hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform transition-transform"
                  >
                    <div className="relative overflow-hidden" style={{ 
                      paddingTop: '100%'
                    }}>
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2 sm:p-3 text-center flex flex-col items-center justify-center min-h-[80px]">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        {offer.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 line-through text-sm sm:text-base">
                          {offer.oldPrice}
                        </span>
                        <span className="text-black font-bold text-lg sm:text-xl">
                          {offer.newPrice}
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
          
          {/* Screen reader announcement for slide changes */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Showing offers {currentSlide + 1} to {Math.min(currentSlide + numVisible, offers.length)} of {offers.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersCarousel;