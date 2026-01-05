"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Filter } from "lucide-react";
import ProductCardMobile from "../MobileProductCard/MobileProductCard";
import ProductCardDesktop from "../DesktopProductCard/DesktopProductCard";
import ProductCardTablet from "../TabletProductCard/TabletProductCard";
import FilterPanel from "../FilterPanel/FilterPanel";
import ProductNavBar from "../ProductNavBar/ProductNavBar";
import { useCart } from "@/app/contexts/CartContext";
import { getExistingImagePaths } from "@/app/components/Produktai/ImagePath/getImagePath";

import type {
  KarnizasProductRaw,
  PageData,
  FiltersType,
  FilterConfig,
  Product,
} from "../Types/types";

const ITEMS_PER_BATCH = 10;

interface MainContentProps {
  PageData: PageData;
}

export default function MainContent({ PageData }: MainContentProps) {
  const { addToCart } = useCart();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [screenSize, setScreenSize] =
    useState<"mobile" | "tablet" | "desktop">("desktop");

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [filters, setFilters] = useState<FiltersType>({
    priceRange: "all",
    material: "all",
    style: "all",
  });

  const [filterConfig] = useState<FilterConfig>({
    priceRange: [{ value: "all", label: "Visos kainos" }],
    material: [{ value: "all", label: "Visos medžiagos" }],
    style: [{ value: "all", label: "Visi stiliai" }],
    ...PageData.customFilterConfig,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /* ================= SCREEN SIZE ================= */
  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 480) setScreenSize("mobile");
      else if (w <= 768) setScreenSize("tablet");
      else setScreenSize("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);

      try {
        const cleanPath = PageData.dataFile.replace(".json", "");
        const dataModule = await import(`@/app/data/${cleanPath}`);
        const productData = dataModule.default;

        const rawProducts =
          productData.products as unknown as KarnizasProductRaw[];

        console.group(
          "%c[ImageDebug] Product loading",
          "color:#16a34a;font-weight:bold"
        );

        const products: Product[] = await Promise.all(
          rawProducts.map(async (product, index) => {
            console.groupCollapsed(
              `%c[ImageDebug] ${index + 1}. ${product.name}`,
              "color:#2563eb;font-weight:bold"
            );


            let images: string[] = [];

            try {
              images = await getExistingImagePaths(
                product.name,
                product.category,
                PageData.imageSuffixes,
                PageData.maxImages
              );


              if (images.length === 0) {
                console.warn("⚠️ No images resolved");
              }
            } catch (err) {
              console.error("❌ Image resolution failed", err);
            }

            console.groupEnd();

            // Generate code from product name
            // "Karnizas 1.50.100" → "1.50.100"
            let code = "";
            if (product.name) {
              const match = product.name.match(/(\d+\.\d+\.\d+)/);
              if (match) {
                code = match[1]; // Keep the dots
              }
            }

            // If no code generated, try to use the code field from JSON
            if (!code) {
              code = (product as any).code ?? (product as any).id ?? "";
            }

            const detailUrl = code ? `${PageData.baseUrl}/${code}` : "";


            return {
              id: product.name,
              name: product.name,
              title: product.name,
              url: detailUrl,
              code: code,
              images,
              category: product.category,
              sudetis: product.category,
              papildoma_informacija: product.mounting_instructions ?? "",
              details: product.details,
            };
          })
        );

        console.group(
          "%c[ImageDebug] Load summary",
          "color:#16a34a;font-weight:bold"
        );


        setAllProducts(products);
        setFilteredProducts(products);
        setDisplayedProducts(products.slice(0, ITEMS_PER_BATCH));
      } catch (err) {
        console.error("[MainContent] Load failed:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [
    PageData.dataFile,
    PageData.imageSuffixes,
    PageData.maxImages,
    PageData.baseUrl,
  ]);

  /* ================= FILTERING ================= */
  useEffect(() => {
    let filtered = [...allProducts];

    if (filters.material !== "all") {
      filtered = filtered.filter((p) =>
        p.sudetis?.toLowerCase().includes(filters.material)
      );
    }

    if (filters.style !== "all") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(filters.style)
      );
    }

    setFilteredProducts(filtered);
    setDisplayedProducts(filtered.slice(0, ITEMS_PER_BATCH));
  }, [filters, allProducts]);

  /* ================= INFINITE SCROLL ================= */
  useEffect(() => {
    if (!mounted || isLoading) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isLoadingMore &&
          displayedProducts.length < filteredProducts.length
        ) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [
    mounted,
    isLoading,
    isLoadingMore,
    displayedProducts.length,
    filteredProducts.length,
  ]);

  const loadMoreProducts = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedProducts((prev) => [
        ...prev,
        ...filteredProducts.slice(
          prev.length,
          prev.length + ITEMS_PER_BATCH
        ),
      ]);
      setIsLoadingMore(false);
    }, 300);
  };

  const handleAddToCart = useCallback(
    (product: Product) => addToCart(product),
    [addToCart]
  );

  const handleFilterChange = (key: keyof FiltersType, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /* ================= RENDER ================= */
  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4" />
        <p>Kraunami produktai ir paveikslėliai iš R2…</p>
      </div>
    );
  }

  return (
    <>
      <ProductNavBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {PageData.title}
        </h1>

        {screenSize === "desktop" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayedProducts.map((product) => (
              <ProductCardDesktop
                key={product.id}
                product={product}
                categoryTitle={PageData.title}
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

        <div ref={loadMoreRef} />

        <FilterPanel
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          filterConfig={filterConfig}
        />
      </div>
    </>
  );
}