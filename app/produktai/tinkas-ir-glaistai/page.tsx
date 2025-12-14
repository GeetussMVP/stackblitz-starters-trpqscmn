"use client";

// app/produktai/tinkas-ir-glaistas/page.tsx

import React, { useState } from "react";
import produktaiDataRaw from "../../data/produktai.json";
import FilterPanel, { FiltersType } from "../../components/Produktai/FilterPanel/FilterPanel";
import MobileProductCard from "../../components/Produktai/MobileProductCard";
import TabletProductCard from "../../components/Produktai/TabletProductCard";
import DesktopProductCard from "../../components/Produktai/DesktopProductCard";
import { Category } from "../../produktai/types";

const produktaiData: Category[] = produktaiDataRaw as Category[];

export default function TinkasIrGlaistasPage() {
  const category: Category = produktaiData[1]; // Tinkas ir Glaistas
  const [filters, setFilters] = useState<FiltersType>({ ilgis: [], aukstis: [], stilius: [], kaina: [0, 1500] });

  const handleFiltersChange = (f: FiltersType) => setFilters(f);

  const filteredProducts = category.products.filter((p) => {
    if (filters.ilgis.length && !filters.ilgis.includes(p.ilgis)) return false;
    if (filters.aukstis.length && !filters.aukstis.includes(p.aukstis)) return false;
    if (filters.stilius.length && !filters.stilius.includes(p.stilius)) return false;
    return true;
  });

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