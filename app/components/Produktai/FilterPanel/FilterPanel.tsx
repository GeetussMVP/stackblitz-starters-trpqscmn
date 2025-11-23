"use client";

import React, { useState, useEffect } from "react";
import { X, Minus, Plus, SlidersHorizontal } from "lucide-react";
import { RangeSlider } from "@mantine/core";

export type FiltersType = {
  ilgis: number[]; // selected lengths (cm)
  aukstis: number[]; // selected heights (mm)
  stilius: string[]; // "modernus" | "tradiciskas"
  kaina: [number, number];
};

export type FilterPanelProps = {
  initial?: Partial<FiltersType>;
  onChange?: (filters: FiltersType) => void;
  // optional dimension options to render checkboxes
  lengthOptions?: number[];
  heightOptions?: number[];
  maxPrice?: number;
};

export default function FilterPanel({
  initial,
  onChange,
  lengthOptions = [50, 100, 150, 200, 250, 300, 400],
  heightOptions = [20, 50, 80, 100, 120, 150],
  maxPrice = 1500,
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showMobile, setShowMobile] = useState(false);

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  // Explicit typed filters state so TS is happy
  const [filters, setFilters] = useState<FiltersType>({
    ilgis: initial?.ilgis ?? [],
    aukstis: initial?.aukstis ?? [],
    stilius: initial?.stilius ?? [],
    kaina: initial?.kaina ?? [0, maxPrice],
  });

  // Keep parent in sync
  useEffect(() => {
    onChange?.(filters);
  }, [filters, onChange]);

  const toggleDimension = (type: "ilgis" | "aukstis", value: number) => {
    setFilters((prev) => {
      const arr = prev[type];
      const exists = arr.includes(value);
      const updated = {
        ...prev,
        [type]: exists ? arr.filter((x) => x !== value) : [...arr, value],
      } as FiltersType;
      return updated;
    });
  };

  const toggleStilius = (value: string) => {
    setFilters((prev) => {
      const exists = prev.stilius.includes(value);
      const updated = {
        ...prev,
        stilius: exists
          ? prev.stilius.filter((s) => s !== value)
          : [...prev.stilius, value],
      } as FiltersType;
      return updated;
    });
  };

  const handlePrice = (value: number[]) => {
    // mantine RangeSlider returns number[]
    if (value.length !== 2) return;
    const updated = { ...filters, kaina: [value[0], value[1]] as [number, number] };
    setFilters(updated);
  };

  const reset = () => {
    const updated: FiltersType = {
      ilgis: [],
      aukstis: [],
      stilius: [],
      kaina: [0, maxPrice],
    };
    setFilters(updated);
  };

  const filterCount =
    filters.ilgis.length +
    filters.aukstis.length +
    filters.stilius.length +
    ((filters.kaina[0] !== 0 || filters.kaina[1] !== maxPrice) ? 1 : 0);

  // Small section wrapper
  const Section: React.FC<{ title: string; id: string; children?: React.ReactNode }> = ({
    title,
    id,
    children,
  }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => toggle(id)}
        className="w-full py-3 flex items-center justify-between hover:text-[#8c0014] transition-colors"
      >
        <span className="font-semibold text-sm md:text-base">{title}</span>
        {expanded === id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </button>

      {expanded === id && <div className="py-3">{children}</div>}
    </div>
  );

  // The main content used in both desktop and mobile panels
  const FilterContent: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => (
    <div className={`${mobile ? "" : "p-2"} space-y-4`}>
      <Section id="kaina" title="Kaina">
        <div className="px-2">
          <RangeSlider
            min={0}
            max={maxPrice}
            value={filters.kaina}
            onChange={handlePrice}
            mt={8}
          />
          <div className="flex justify-between text-sm mt-2 text-gray-600">
            <span>{filters.kaina[0]} €</span>
            <span>{filters.kaina[1]} €</span>
          </div>
        </div>
      </Section>

      <Section id="ilgis" title="Ilgis">
        <div className="px-2 grid grid-cols-2 gap-2">
          {lengthOptions.map((v) => (
            <label
              key={v}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={filters.ilgis.includes(v)}
                onChange={() => toggleDimension("ilgis", v)}
                className="rounded border-gray-300 text-[#8c0014] focus:ring-[#8c0014]"
              />
              <span className="text-sm">{v} cm</span>
            </label>
          ))}
        </div>
      </Section>

      <Section id="aukstis" title="Aukštis">
        <div className="px-2 grid grid-cols-2 gap-2">
          {heightOptions.map((v) => (
            <label
              key={v}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={filters.aukstis.includes(v)}
                onChange={() => toggleDimension("aukstis", v)}
                className="rounded border-gray-300 text-[#8c0014] focus:ring-[#8c0014]"
              />
              <span className="text-sm">{v} mm</span>
            </label>
          ))}
        </div>
      </Section>

      <Section id="stilius" title="Stilius">
        <div className="px-2 space-y-2">
          {["modernus", "tradiciskas"].map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={filters.stilius.includes(s)}
                onChange={() => toggleStilius(s)}
                className="rounded border-gray-300 text-[#8c0014] focus:ring-[#8c0014]"
              />
              <span className="capitalize text-sm">{s}</span>
            </label>
          ))}
        </div>
      </Section>

      <div className="px-2">
        <button
          onClick={reset}
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Išvalyti filtrus
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop panel */}
      <aside className="hidden lg:block w-72 bg-white/80 backdrop-blur rounded-xl shadow border border-white/30 p-4 h-[calc(100vh-2rem)] overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#8c0014]">Filtrai</h3>
            {filterCount > 0 && (
              <button
                onClick={reset}
                className="text-sm text-white bg-[#8c0014] px-3 py-1 rounded-md"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            <FilterContent />
          </div>
        </div>
      </aside>

      {/* Mobile filter floating button */}
      <button
        onClick={() => setShowMobile(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtrai
        {filterCount > 0 && (
          <span className="bg-white text-[#8c0014] text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {filterCount}
          </span>
        )}
      </button>

      {/* Mobile slide-over */}
      {showMobile && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white w-80 h-full p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#8c0014]">Filtrai</h3>
              <div className="flex items-center gap-2">
                {filterCount > 0 && (
                  <button
                    onClick={reset}
                    className="text-sm px-3 py-1 rounded-md bg-gray-100"
                  >
                    Reset
                  </button>
                )}
                <button onClick={() => setShowMobile(false)} aria-label="Close">
                  <X />
                </button>
              </div>
            </div>

            <FilterContent mobile />
          </div>

          <div
            className="flex-1 bg-black/30"
            onClick={() => setShowMobile(false)}
            aria-hidden
          />
        </div>
      )}
    </>
  );
}