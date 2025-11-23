'use client';
import { useState, useEffect } from 'react';
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

  const displayCategories = [];
  for (let i = 0; i < categories.length * 3; i++) {
    displayCategories.push({ ...categories[i % categories.length], id: i });
  }

  useEffect(() => {
    const updateNumVisible = () => {
      if (window.innerWidth < 640) {
        setNumVisible(1);
      } else if (window.innerWidth < 1024) {
        setNumVisible(2);
      } else {
        setNumVisible(3);
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
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isTransitioning]);

  const getItemWidth = () => {
    switch(numVisible) {
      case 1: return 'w-full';
      case 2: return 'w-1/2';
      case 3: return 'w-1/3';
      default: return 'w-1/3';
    }
  };

  return (
    <section className="py-16 w-full px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-12">
          Kategorijos
        </h2>

        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl p-3 rounded-full shadow-lg hover:bg-white/20 transition-all border border-white/20"
            aria-label="Previous categories"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl p-3 rounded-full shadow-lg hover:bg-white/20 transition-all border border-white/20"
            aria-label="Next categories"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="overflow-hidden mx-16">
            <div
              className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
              style={{
                transform: `translateX(-${currentSlide * (100 / numVisible + 2)}%)`
              }}
            >
              {displayCategories.map((category, index) => (
                <article
                  key={`category-${category.id}-${index}`}
                  className={`${getItemWidth()} flex-shrink-0`}
                >
                  <a
                    href={category.href}
                    className="block group"
                  >
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                      <div className="aspect-square relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                          <div className="text-white/40 text-sm">{category.title}</div>
                        </div>
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-lg font-medium text-white group-hover:text-teal-300 transition-colors">
                          {category.title}
                        </h3>
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

export default CategoryCarousel;
