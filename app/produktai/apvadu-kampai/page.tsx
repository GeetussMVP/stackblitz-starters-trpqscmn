"use client";

import React from "react";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";
import type { PageData } from "@/app/components/Produktai/Types/types";

const PageData: PageData = {
  title: "Apvadų kampai",
  dataFile: "apvadu-kampai/apvadu-kampai.json",
  baseUrl: "/produktai/apvadu-kampai",
  R2FolderName: "apvadu-kampai",
  FilterPanelCategories: ["Kaina", "Medžiaga", "Stilius"],
  imageSuffixes: ["100", "20", "30", "40", "600"],
  maxImages: 2,
};

export default function ApvaduKampaiPage() {
  return (
    <div className="w-full min-h-screen">
      <MainContent PageData={PageData} />
    </div>
  );
}
