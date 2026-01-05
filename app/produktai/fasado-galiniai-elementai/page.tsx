"use client";

import React from "react";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";
import type { PageData } from "@/app/components/Produktai/Types/types";

const PageData: PageData = {
  title: "Fasado galiniai elementai",
  dataFile: "fasado-galiniai-elementai/fasado-galiniai-elementai.json",
  baseUrl: "/produktai/fasado-galiniai-elementai",
  R2FolderName: "fasado-galiniai-elementai",
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
