// Location: @/components/MainContent/MainContent.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Filter, ShoppingBag, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCardMobile from "../MobileProductCard/MobileProductCard";
import ProductCardDesktop from "../DesktopProductCard/DesktopProductCard";
import ProductCardTablet from "../TabletProductCard/TabletProductCard";
import FilterPanel from "../FilterPanel/FilterPanel";
import ProductNavBar from "../ProductNavBar/ProductNavBar";
import produktaiDataRaw from "@/app/data/produktai.json";
import { useCart } from "@/app/contexts/CartContext";

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

interface MainContentProps {
  categorySlug?: string;
}

const produktaiData: Category[] = produktaiDataRaw as Category[];

const MainContent: React.FC<MainContentProps> = ({
  categorySlug,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "all",
    material: "all",
    style: "all",
  });
  const [expandedProduct, setExpandedProduct] = useState<string | number | null>(null);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [mounted, setMounted] = useState(false);

  // Check screen size
  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Get current category
  const currentCategory = categorySlug
    ? produktaiData.find((cat) => cat.slug === categorySlug)
    : null;

  // Get all products or category-specific products
  const allProducts = currentCategory
    ? currentCategory.products
    : produktaiData.flatMap((cat) => cat.products);

  // Filter configuration
  const filterConfig = {
    priceRange: [
      { value: "all", label: "Visos kainos" },
      { value: "0-30", label: "€0 - €30" },
      { value: "30-50", label: "€30 - €50" },
      { value: "50-100", label: "€50 - €100" },
      { value: "100+", label: "€100+" },
    ],
    material: [
      { value: "all", label: "Visos medžiagos" },
      { value: "Gipsas", label: "Gipsas" },
      { value: "Poliuretanas", label: "Poliuretanas" },
    ],
    style: [
      { value: "all", label: "Visi stiliai" },
      { value: "Art Deco", label: "Art Deco" },
      { value: "Modern", label: "Modern" },
      { value: "Classic", label: "Classic" },
    ],
  };

  // Apply filters
  const filteredProducts = allProducts.filter((product) => {
    // Price filter
    if (filters.priceRange !== "all" && product.price) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (max && (product.price < min || product.price > max)) return false;
      if (!max && product.price < min) return false;
    }

    // Material filter
    if (filters.material !== "all" && product.sudetis) {
      if (product.sudetis !== filters.material) return false;
    }

    // Style filter
    if (filters.style !== "all" && product.stilius) {
      if (product.stilius !== filters.style) return false;
    }

    return true;
  });

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedProduct(product);
    document.body.style.overflow = "hidden";
  };

  // Close modal
  const closeModal = () => {
    setAddedProduct(null);
    document.body.style.overflow = "unset";
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Product Navigation Bar */}
      <ProductNavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          {currentCategory ? currentCategory.title : "Visi produktai"}
        </h1>

        {/* Filter Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-5 h-5 text-gray-700" />
            <span className="font-medium text-gray-700">Filtrai</span>
          </button>

          <div className="text-sm text-gray-600">
            Rodoma produktų: <span className="font-semibold">{filteredProducts.length}</span>
          </div>
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Produktų nerasta</h2>
            <p className="text-gray-500 mb-4">Pabandykite pakeisti filtrus</p>
            <button
              onClick={() => setFilters({ priceRange: "all", material: "all", style: "all" })}
              className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2 rounded-lg font-medium"
            >
              Išvalyti filtrus
            </button>
          </div>
        )}

        {/* Products Grid - Mobile */}
        {screenSize === "mobile" && (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <ProductCardMobile
                key={product.id}
                product={product}
                categoryTitle={currentCategory?.title || ""}
                isExpanded={expandedProduct === product.id}
                onToggleExpand={() =>
                  setExpandedProduct(expandedProduct === product.id ? null : product.id)
                }
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}

        {/* Products Grid - Tablet */}
        {screenSize === "tablet" && (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCardTablet
                key={product.id}
                product={product}
                categoryTitle={currentCategory?.title || ""}
                isExpanded={expandedProduct === product.id}
                onToggleExpand={() =>
                  setExpandedProduct(expandedProduct === product.id ? null : product.id)
                }
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}

        {/* Products Grid - Desktop */}
        {screenSize === "desktop" && (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <ProductCardDesktop
                key={product.id}
                product={product}
                categoryTitle={currentCategory?.title || ""}
                isExpanded={expandedProduct === product.id}
                onToggleExpand={() =>
                  setExpandedProduct(expandedProduct === product.id ? null : product.id)
                }
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}

        {/* Filter Panel */}
        <FilterPanel
          {...({
            open: isFilterOpen,
            onClose: () => setIsFilterOpen(false),
            filters,
            onFilterChange: (key: any, value: any) =>
              setFilters((prev) => ({ ...prev, [key]: value })),
            filterConfig,
          } as any)}
        />

        {/* Cart Confirmation Modal */}
        {addedProduct && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md mx-auto space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 rounded-full p-2">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Pridėta į krepšelį</h3>
                </div>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-4 items-center">
                <img
                  src={addedProduct.img}
                  alt={addedProduct.title}
                  className="w-24 h-24 object-contain border rounded p-2"
                />
                <div>
                  <h4 className="font-semibold">{addedProduct.title}</h4>
                  {addedProduct.price && (
                    <p className="text-teal-400 font-bold">€{addedProduct.price.toFixed(2)}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={closeModal}
                  className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Tęsti apsipirkimą
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    router.push("/krepselis");
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Eiti į krepšelį</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainContent;