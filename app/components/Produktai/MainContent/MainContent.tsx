"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Filter } from "lucide-react";
import ProductCardMobile from "../MobileProductCard/MobileProductCard";
import ProductCardDesktop from "../DesktopProductCard/DesktopProductCard";
import ProductCardTablet from "../TabletProductCard/TabletProductCard";
import FilterPanel from "../FilterPanel/FilterPanel";
import ProductNavBar from "../ProductNavBar/ProductNavBar";
import corniceDataRaw from "@/app/data/cornice/cornice.json";
import { useCart } from "@/app/contexts/CartContext";
import {
  getAllImagePathsFromCorniceName,
} from "@/app/components/Produktai/ImagePath/getImagePath";

interface CorniceProductRaw {
  name: string;
  url: string;
  code: string | null;
  category: string;
  details: Record<string, string>;
  flexible_analog_exists: boolean;
  images: {
    filename: string;
    local_path: string;
    url: string;
  }[];
  mounting_instructions: string;
}

interface Product {
  id: string;
  title: string;
  images: string[];
  sudetis?: string;
  papildoma_informacija?: string;
}

const filtersState = {
  priceRange: "all",
  material: "all",
  style: "all",
};

const filterConfig = {
  priceRange: [{ value: "all", label: "Visos kainos" }],
  material: [{ value: "all", label: "Visos medžiagos" }],
  style: [{ value: "all", label: "Visi stiliai" }],
};

export default function MainContent() {
  const { addToCart } = useCart();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [screenSize, setScreenSize] =
    useState<"mobile" | "tablet" | "desktop">("desktop");

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

  const allProducts: Product[] = useMemo(() => {
    return (corniceDataRaw.products as unknown as CorniceProductRaw[]).map(
      (product) => ({
        id: product.name,
        title: product.name,
        images: getAllImagePathsFromCorniceName(product.name),
        sudetis: product.category,
        papildoma_informacija: Object.entries(product.details)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", "),
      })
    );
  }, []);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product);
    },
    [addToCart]
  );

  if (!mounted) return null;

  return (
    <>
      <ProductNavBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Karnizai
        </h1>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg"
          >
            <Filter className="w-5 h-5" />
            Filtrai
          </button>

          <div className="text-sm text-gray-600">
            Rodoma: <strong>{allProducts.length}</strong>
          </div>
        </div>

        {screenSize === "mobile" ? (
          <div className="space-y-6">
            {allProducts.map((product) => (
              <ProductCardMobile
                key={product.id}
                product={product}
                categoryTitle="Karnizai"
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        ) : screenSize === "tablet" ? (
          <div className="grid grid-cols-2 gap-4">
            {allProducts.map((product) => (
              <ProductCardTablet
                key={product.id}
                product={product}
                categoryTitle="Karnizai"
                onAddToCart={() => handleAddToCart(product)}
                isExpanded={expandedProduct === product.id}
                onToggleExpand={() =>
                  setExpandedProduct(
                    expandedProduct === product.id ? null : product.id
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {allProducts.map((product) => (
              <ProductCardDesktop
                key={product.id}
                product={product}
                categoryTitle="Karnizai"
                onAddToCart={() => handleAddToCart(product)}
                isExpanded={expandedProduct === product.id}
                onToggleExpand={() =>
                  setExpandedProduct(
                    expandedProduct === product.id ? null : product.id
                  )
                }
              />
            ))}
          </div>
        )}

        <FilterPanel
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filtersState}
          onFilterChange={() => {}}
          filterConfig={filterConfig}
        />
      </div>
    </>
  );
}
