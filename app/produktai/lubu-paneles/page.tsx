"use client";

import React from "react";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";
import type { PageData } from "@/app/components/Produktai/Types/types";

const PageData: PageData = {
  title: "Lubų panelės",
  dataFile: "lubu-paneles/lubu-paneles.json",
  baseUrl: "/produktai/lubu-paneles",
  R2FolderName: "lubu-paneles",
  FilterPanelCategories: ["Kaina", "Medžiaga", "Stilius"],
  imageSuffixes: ["100", "20", "30", "40", "600"],
  maxImages: 2,
};

export default function LubuPanelesPage() {
  return (
    <div className="w-full min-h-screen">
      <MainContent PageData={PageData} />
    </div>
  );
}