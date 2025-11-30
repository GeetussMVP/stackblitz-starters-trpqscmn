'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import productsData from '@/app/data/produktai.json';

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

interface Subcategory {
  name: string;
  slug: string;
  image: string;
  count: number;
}

// Function to count products per category
function getProductCounts() {
  const typedProductsData = productsData as Category[];
  const categoryCounts: { [key: string]: number } = {};
  
  typedProductsData.forEach(category => {
    categoryCounts[category.slug] = category.products?.length || 0;
  });
  
  return { categoryCounts };
}

// Get product counts
const { categoryCounts } = getProductCounts();

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-300"></div>
  </div>
);

// Image component with loading state
const SubcategoryImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    const img = new Image();
    let isMounted = true;
    
    img.onload = () => {
      if (isMounted) {
        setIsLoading(false);
      }
    };
    
    img.onerror = () => {
      if (isMounted) {
        setIsLoading(false);
      }
    };
    
    img.src = src;
    
    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <LoadingSpinner />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

// Main ProductNavBar component
const ProductNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isInitialMount = useRef(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const typedProductsData = productsData as Category[];
  
  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Determine current category based on pathname
  const currentPathCategory = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const produktaiIndex = pathSegments.indexOf('produktai');
    
    if (produktaiIndex !== -1 && produktaiIndex + 1 < pathSegments.length) {
      const categorySlug = pathSegments[produktaiIndex + 1];
      return typedProductsData.find(cat => cat.slug === categorySlug)?.slug || null;
    }
    
    return null;
  }, [pathname]);

  // Determine if we're on a product page
  const isProductPage = pathname.includes('/produktai/');

  // Set initial active category based on the current URL path
  useEffect(() => {
    if (currentPathCategory && isInitialMount.current) {
      setActiveCategory(currentPathCategory);
      isInitialMount.current = false;
    }
  }, [currentPathCategory]);

  // Handle loading spinner for subcategory selection
  useEffect(() => {
    if (!activeCategory) return;
    
    setIsLoadingSubcategories(true);
    
    const timer = setTimeout(() => {
      setIsLoadingSubcategories(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Get current subcategories based on active category (in this case, just the category itself as a subcategory)
  const currentSubcategories = useMemo((): Subcategory[] => {
    if (!activeCategory) return [];
    
    const category = typedProductsData.find(cat => cat.slug === activeCategory);
    if (!category) return [];
    
    // For gypsum products, we'll show the category itself as a subcategory
    // You can expand this later if you want actual subcategories
    return [{
      name: category.title,
      slug: category.slug,
      image: category.products[0]?.img || '/images/placeholder.jpg',
      count: category.products.length
    }];
  }, [activeCategory]);

  // Handle category click
  const handleCategoryClick = useCallback((categorySlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (activeCategory === categorySlug) {
      router.push(`/produktai/${categorySlug}`);
    } else {
      setActiveCategory(categorySlug);
    }
  }, [activeCategory, router]);

  // Handle subcategory click
  const handleSubcategoryClick = useCallback((subcategory: Subcategory, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/produktai/${subcategory.slug}`);
  }, [router]);

  // If not on a product page, don't render the component
  if (!isProductPage) return null;

  // Function to render subcategory item
  const renderSubcategoryItem = (subcategory: Subcategory, index: number) => {
    const isActive = currentPathCategory === subcategory.slug;
    
    return (
      <a 
        key={index}
        href="#"
        onClick={(e) => handleSubcategoryClick(subcategory, e)}
        className={`group flex flex-col items-center justify-between ${
          isMobile 
            ? 'subcategory-item-mobile w-32 h-40 mx-2 p-2 border border-gray-200 rounded-lg' 
            : 'subcategory-item-desktop w-40 h-48'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className={`w-full aspect-square border border-gray-200 rounded-lg overflow-hidden mb-2 group-hover:border-blue-300 transition-colors duration-200 flex items-center justify-center ${
          isActive ? 'subcategory-active' : ''
        }`}>
          <div className="relative w-full h-full">
            <SubcategoryImage 
              src={subcategory.image} 
              alt={subcategory.name} 
            />
          </div>
        </div>
        <div className="text-center w-full h-12 flex items-center justify-center">
          <span className={`text-xs font-medium text-gray-700 group-hover:text-blue-300 transition-colors duration-200 whitespace-pre-line subcategory-name ${
            isActive ? 'subcategory-active' : ''
          }`}>
            {subcategory.name}
            {subcategory.count > 0 && (
              <span className="subcategory-count ml-1">{subcategory.count}</span>
            )}
          </span>
        </div>
      </a>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <style jsx global>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #5eead4;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.15s ease-out;
        }
        
        .nav-link.active::after {
          transform: scaleX(1);
        }
        
        .subcategory-grid {
          transition: all 0.3s ease-out;
        }
        
        .category-count {
          font-size: 0.7rem;
          background-color: #f3f4f6;
          color: #4b5563;
          border-radius: 9999px;
          padding: 0.1rem 0.4rem;
          margin-left: 0.5rem;
          font-weight: 600;
        }
        
        .subcategory-count {
          font-size: 0.65rem;
          background-color: #f3f4f6;
          color: #4b5563;
          border-radius: 9999px;
          padding: 0.1rem 0.35rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .subcategory-active {
          border-color: #5eead4 !important;
          box-shadow: 0 0 0 2px rgba(94, 234, 212, 0.2);
        }
        
        .subcategory-active .subcategory-name {
          color: #5eead4 !important;
          font-weight: 600;
        }
        
        .subcategory-item-mobile {
          height: 160px;
          width: 120px;
        }
        
        .subcategory-item-desktop {
          height: 180px;
          width: 160px;
        }
        
        .category-item:hover .nav-link {
          color: #5eead4;
        }
        
        .subcategory-item:focus-visible {
          outline: 2px solid #5eead4;
          outline-offset: 2px;
        }
        
        .nav-link:focus-visible {
          outline: 2px solid #5eead4;
          outline-offset: 2px;
        }
        
        .mobile-scroll-container {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          display: flex;
          gap: 16px;
          padding: 8px;
        }
        
        .mobile-scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        .scroll-indicator-left,
        .scroll-indicator-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 20px;
          z-index: 10;
          pointer-events: none;
        }
        
        .scroll-indicator-left {
          left: 0;
          background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));
        }
        
        .scroll-indicator-right {
          right: 0;
          background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));
        }
        
        @media (max-width: 767px) {
          .category-nav {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            white-space: nowrap;
            padding: 0 1rem;
          }
          
          .category-nav::-webkit-scrollbar {
            display: none;
          }
          
          .category-item {
            display: inline-block;
            margin-right: 1.5rem;
          }
          
          .category-item:last-child {
            margin-right: 0;
          }
        }
      `}</style>

      {/* Main Category Navigation */}
      <div className="container mx-auto px-0 md:px-4">
        <nav 
          className={`category-nav flex items-center ${isMobile ? 'justify-start overflow-x-auto' : 'justify-center space-x-8'} h-16`}
          role="navigation"
          aria-label="Produktų kategorijos"
        >
          {typedProductsData.map((category) => {
            const isActive = activeCategory === category.slug;
            const isCurrentPath = category.slug === currentPathCategory;
            
            return (
              <div key={category.id} className="relative category-item">
                <a 
                  href={`/produktai/${category.slug}`}
                  onClick={(e) => handleCategoryClick(category.slug, e)}
                  className={`nav-link relative text-black font-medium py-5 text-sm inline-block cursor-pointer ${
                    isActive ? 'active text-blue-300' : isCurrentPath ? 'text-blue-300' : ''
                  }`}
                  aria-current={isCurrentPath ? 'page' : undefined}
                  aria-expanded={isActive}
                >
                  {category.title}
                  {categoryCounts[category.slug] > 0 && (
                    <span className="category-count">{categoryCounts[category.slug]}</span>
                  )}
                </a>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Subcategories Section */}
      <div 
        className="border-t border-gray-200 overflow-hidden transition-all duration-300 subcategory-container" 
        style={{ 
          maxHeight: activeCategory ? '500px' : '0',
          opacity: activeCategory ? '1' : '0',
          transform: activeCategory ? 'translateY(0)' : 'translateY(-10px)'
        }}
        aria-hidden={!activeCategory}
      >
        <div className="container mx-auto px-4 py-8">
          {isLoadingSubcategories ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="relative">
              {isMobile && (
                <>
                  <div className="scroll-indicator-left"></div>
                  <div className="scroll-indicator-right"></div>
                </>
              )}
              
              {isMobile ? (
                <div 
                  ref={scrollContainerRef}
                  className="mobile-scroll-container flex overflow-x-auto py-2 snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {currentSubcategories.map((subcategory, index) => (
                    <div key={index} className="snap-start snap-always">
                      {renderSubcategoryItem(subcategory, index)}
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  className="subcategory-grid flex flex-row flex-wrap gap-8 mx-auto justify-center"
                  role="menu"
                >
                  {currentSubcategories.map((subcategory, index) => 
                    renderSubcategoryItem(subcategory, index)
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductNavBar;