"use client";

import React from "react";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";
import type { PageData } from "@/app/components/Produktai/Types/types";

const PageData: PageData = {
  title: "Riejamieji elementai",
  dataFile: "riejamieji-elementai/riejamieji-elementai.json",
  baseUrl: "/produktai/riejamieji-elementai",
  R2FolderName: "riejamieji-elementai",
  FilterPanelCategories: ["Kaina", "Medžiaga", "Stilius"],
  imageSuffixes: ["100", "20", "30", "40", "600"],
  maxImages: 2,
};

export default function RiejamiejiElementaiPage() {
  return (
    <div className="w-full min-h-screen">
      <MainContent PageData={PageData} />
    </div>
  );
}
