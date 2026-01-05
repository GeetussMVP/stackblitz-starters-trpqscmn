"use client";

import React from "react";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";
import type { PageData } from "@/app/components/Produktai/Types/types";

const PageData: PageData = {
  title: "Langų šoniniai apvadai",
  dataFile: "lango-soniniai-apvadai/lango-soniniai-apvadai.json",
  baseUrl: "/produktai/lango-soniniai-apvadai",
  R2FolderName: "lango-soniniai-apvadai",
  FilterPanelCategories: ["Kaina", "Medžiaga", "Stilius"],
  imageSuffixes: ["100", "20", "30", "40", "600"],
  maxImages: 2,
};

export default function ProductCategoryPage() {
  return (
    <div className="w-full min-h-screen">
      <MainContent PageData={PageData} />
    </div>
  );
}
