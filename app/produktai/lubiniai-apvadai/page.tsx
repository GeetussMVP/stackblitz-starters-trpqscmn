"use client";

import React, { useState } from "react";
import produktaiDataRaw from "../../data/produktai.json";
import FilterPanel, { FiltersType } from "../../components/Produktai/FilterPanel/FilterPanel";
import MobileProductCard from "../../components/Produktai/MobileProductCard";
import TabletProductCard from "../../components/Produktai/TabletProductCard";
import DesktopProductCard from "../../components/Produktai/DesktopProductCard";
import { Category, Product } from "../../produktai/types";

const produktaiData: Category[] = produktaiDataRaw as Category[];

// Get Lubiniai Apvadai category
const category: Category | undefined = produktaiData.find(
  (cat) => cat.slug === "lubiniai-apvadai"
);

export default function LubiniaiApvadaiPage() {
  const [filters, setFilters] = useState<FiltersType>({
    ilgis: [],
    aukstis: [],
    stilius: [],
    kaina: [0, 1500],
  });

  const handleFiltersChange = (f: FiltersType) => setFilters(f);

  const filteredProducts: Product[] = category
    ? category.products.filter((p) => {
        if (filters.ilgis.length && !filters.ilgis.includes(p.ilgis)) return false;
        if (filters.aukstis.length) {
          const heights = Array.isArray(p.aukstis) ? p.aukstis : [p.aukstis];
          if (!heights.some((h) => filters.aukstis.includes(h))) return false;
        }
        if (filters.stilius.length && (!p.stilius || !filters.stilius.includes(p.stilius))) return false;
        return true;
      })
    : [];

  if (!category) return <p className="text-center mt-10">Lubiniai apvadai category not found.</p>;

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 flex gap-6">
        <div className="hidden lg:block">
          <FilterPanel initial={filters} onChange={handleFiltersChange} />
        </div>
        <main className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">{category.title}</h1>
          <div className="flex flex-col gap-4">
            {filteredProducts.map((product) => (
              <React.Fragment key={product.id}>
                <MobileProductCard product={product} />
                <TabletProductCard product={product} />
                <DesktopProductCard product={product} />
              </React.Fragment>
            ))}
          </div>
        </main>
      </div>
      <div className="lg:hidden">
        <FilterPanel initial={filters} onChange={handleFiltersChange} />
      </div>
    </div>
  );
}