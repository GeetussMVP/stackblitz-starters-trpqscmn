"use client";

import React from "react";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";
import type { PageData } from "@/app/components/Produktai/Types/types";

const PageData: PageData = {
  title: "Pjedestalinės gembės",
  dataFile: "pjedestalines-gembes/pjedestalines-gembes.json",
  baseUrl: "/produktai/pjedestalines-gembes",
  R2FolderName: "pjedestalines-gembes",
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
