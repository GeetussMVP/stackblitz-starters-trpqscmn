'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryCarousel = () => {
  const categories = [
    { 
      title: 'Dekoratyviniai profiliai', 
      image: '/images/landing/dekoratyviniai-profiliai.png',
      href: '/categories/dekoratyviniai-profiliai'
    },
    { 
      title: 'Durų dekora', 
      image: '/images/landing/duru-dekora.jpg',
      href: '/categories/duru-dekora'
    },
    { 
      title: 'Kolonos', 
      image: '/images/landing/kolonos.JPG',
      href: '/categories/kolonos'
    },
    { 
      title: 'Rozetės', 
      image: '/images/landing/rozetes.PNG',
      href: '/categories/rozetes'
    },
    { 
      title: 'Sieninis dekoras', 
      image: '/images/landing/sieninis-dekoras.png',
      href: '/categories/sieninis-dekoras'
    },
    { 
      title: 'Statulėlės', 
      image: '/images/landing/statuleles.JPG',
      href: '/categories/statuleles'
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [numVisible, setNumVisible] = useState(3);
  
  // Create a circular array by repeating the categories
  const displayCategories = [];
  for (let i = 0; i < categories.length * 3; i++) {
    displayCategories.push({ ...categories[i % categories.length], id: i });
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
    
    if (currentSlide >= displayCategories.length - numVisible - 1) {
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
      setCurrentSlide(displayCategories.length - numVisible - 1);
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
    <section className="py-2 w-full" aria-labelledby="category-heading">
      <div className="w-full px-3">
        <div className="relative w-full" role="region" aria-label="Categories carousel" aria-live="polite">
          <button 
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full shadow-lg hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Previous categories"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full shadow-lg hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Next categories"
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
              aria-label={`Categories ${currentSlide + 1} to ${Math.min(currentSlide + numVisible, categories.length)} of ${categories.length}`}
            >
              {displayCategories.map((category, index) => (
                <article 
                  key={`category-${category.id}-${index}`}
                  className={`${getItemWidth()} flex-shrink-0 flex items-center justify-center`}
                >
                  <a 
                    href={category.href}
                    className="rounded-md shadow-md overflow-hidden h-full flex flex-col bg-white/80 backdrop-blur-sm w-[88%] hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform transition-transform"
                  >
                    <div className="relative overflow-hidden" style={{ 
                      paddingTop: '100%'
                    }}>
                      <img
                        src={category.image}
                        alt={category.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2 sm:p-3 text-center flex items-center justify-center min-h-[60px]">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                        {category.title}
                      </h2>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
          
          {/* Screen reader announcement for slide changes */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Showing categories {currentSlide + 1} to {Math.min(currentSlide + numVisible, categories.length)} of {categories.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;