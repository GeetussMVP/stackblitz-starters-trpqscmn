// Location: @/components/MainContent/MainContent.tsx

"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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

export default function MainContent({ categorySlug }: MainContentProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | number | null>(null);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: "all",
    material: "all",
    style: "all",
  });

  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Determine screen size
  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(
        width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop"
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentCategory = useMemo(
    () => produktaiData.find((cat) => cat.slug === categorySlug) ?? null,
    [categorySlug]
  );

  const allProducts = useMemo(
    () => currentCategory?.products ?? produktaiData.flatMap((cat) => cat.products),
    [currentCategory]
  );

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

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const price = product.price ?? 0;

      if (filters.priceRange !== "all") {
        const [min, maxStr] = filters.priceRange.split("-");
        const minPrice = Number(min);
        const maxPrice = maxStr ? Number(maxStr) : null;
        if (maxPrice && (price < minPrice || price > maxPrice)) return false;
        if (!maxPrice && price < minPrice) return false;
      }

      if (filters.material !== "all" && product.sudetis !== filters.material)
        return false;

      if (filters.style !== "all" && product.stilius !== filters.style)
        return false;

      return true;
    });
  }, [allProducts, filters]);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    setAddedProduct(product);
    document.body.classList.add("overflow-hidden");
  }, [addToCart]);

  const closeModal = () => {
    setAddedProduct(null);
    document.body.classList.remove("overflow-hidden");
  };

  if (!mounted) return null;

  return (
    <>
      <ProductNavBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          {currentCategory?.title ?? "Visi produktai"}
        </h1>

        {/* Filters + Count */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <Filter className="w-5 h-5 text-gray-700" />
            <span className="font-medium text-gray-700">Filtrai</span>
          </button>

          <div className="text-sm text-gray-600">
            Rodoma: <span className="font-semibold">{filteredProducts.length}</span>
          </div>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Produktų nerasta</h2>
            <p className="text-gray-500 mb-4">Pabandykite pakeisti filtrus</p>
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2 rounded-lg font-medium"
              onClick={() => setFilters({ priceRange: "all", material: "all", style: "all" })}
            >
              Išvalyti filtrus
            </button>
          </div>
        ) : screenSize === "mobile" ? (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <ProductCardMobile
                key={product.id}
                product={product}
                categoryTitle={currentCategory?.title ?? ""}
                isExpanded={expandedProduct === product.id}
                onToggleExpand={() =>
                  setExpandedProduct(expandedProduct === product.id ? null : product.id)
                }
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        ) : screenSize === "tablet" ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCardTablet
                key={product.id}
                product={product}
                categoryTitle={currentCategory?.title ?? ""}
                isExpanded={expandedProduct === product.id}
                onToggleExpand={() =>
                  setExpandedProduct(expandedProduct === product.id ? null : product.id)
                }
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <ProductCardDesktop
                key={product.id}
                product={product}
                categoryTitle={currentCategory?.title ?? ""}
                isExpanded={expandedProduct === product.id}
                onToggleExpand={() =>
                  setExpandedProduct(expandedProduct === product.id ? null : product.id)
                }
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}

        <FilterPanel
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={(key, value) =>
            setFilters((prev) => ({ ...prev, [key]: value }))
          }
          filterConfig={filterConfig}
        />

        {/* Modal */}
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
                <button onClick={closeModal}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
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
                    <p className="text-teal-400 font-bold">
                      €{addedProduct.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700"
                  onClick={closeModal}
                >
                  Tęsti apsipirkimą
                </button>
                <button
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200"
                  onClick={() => {
                    closeModal();
                    router.push("/krepselis");
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Eiti į krepšelį
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
