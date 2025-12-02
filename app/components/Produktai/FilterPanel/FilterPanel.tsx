"use client";

import React from "react";
import { X } from "lucide-react";

export type FiltersType = {
  priceRange: string;
  material: string;
  style: string;
};

export type FilterPanelProps = {
  open: boolean;
  onClose: () => void;
  filters: FiltersType;
  onFilterChange: (key: keyof FiltersType, value: string) => void;
  filterConfig: {
    priceRange: { value: string; label: string }[];
    material: { value: string; label: string }[];
    style: { value: string; label: string }[];
  };
};

export default function FilterPanel({
  open,
  onClose,
  filters,
  onFilterChange,
  filterConfig,
}: FilterPanelProps) {
  if (!open) return null;

  const resetFilters = () => {
    onFilterChange("priceRange", "all");
    onFilterChange("material", "all");
    onFilterChange("style", "all");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex justify-end">
      <div className="bg-white w-80 h-full p-6 overflow-y-auto shadow-xl animate-slide-left">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Filtrai</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Kaina</label>
          <select
            value={filters.priceRange}
            onChange={(e) => onFilterChange("priceRange", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            {filterConfig.priceRange.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Medžiaga</label>
          <select
            value={filters.material}
            onChange={(e) => onFilterChange("material", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            {filterConfig.material.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Style */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Stilius</label>
          <select
            value={filters.style}
            onChange={(e) => onFilterChange("style", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            {filterConfig.style.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="w-full text-center bg-red-500 text-white py-3 rounded-lg mt-4 hover:bg-red-600 transition"
        >
          Išvalyti filtrus
        </button>
      </div>
    </div>
  );
}
