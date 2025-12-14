"use client";

import React, { useState } from "react";
import produktaiDataRaw from "../../data/produktai.json";
import FilterPanel, { FiltersType } from "./FilterPanel/FilterPanel";
import MobileProductCard from "./MobileProductCard";
import TabletProductCard from "./TabletProductCard";
import DesktopProductCard from "./DesktopProductCard";
import { Category } from "../../produktai/types";

const produktaiData: Category[] = produktaiDataRaw as Category[];

interface Props {
  categoryIndex: number; // 0-7
}

export default function CategoryPage({ categoryIndex }: Props) {
  const category: Category = produktaiData[categoryIndex];
  const [filters, setFilters] = useState<FiltersType>({
    ilgis: [],
    aukstis: [],
    stilius: [],
    kaina: [0, 1500],
  });

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
        {/* Desktop Filter */}
        <div className="hidden lg:block">
          <FilterPanel initial={filters} onChange={handleFiltersChange} />
        </div>

        {/* Main content */}
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

      {/* Mobile Filter Panel */}
      <div className="lg:hidden">
        <FilterPanel initial={filters} onChange={handleFiltersChange} />
      </div>
    </div>
  );
}