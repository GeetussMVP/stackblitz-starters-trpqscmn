"use client";

import React from "react";
import { useParams } from "next/navigation";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";

export default function ProductCategoryPage() {
  const params = useParams();
  const categorySlug = params?.categorySlug as string | undefined;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <MainContent categorySlug={categorySlug} />
    </div>
  );
}
