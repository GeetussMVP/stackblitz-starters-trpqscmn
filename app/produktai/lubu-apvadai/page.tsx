// Location: @/app/produktai/[categorySlug]/page.tsx

"use client";

import React from "react";
import { useParams } from "next/navigation";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";

interface Product {
  id: string | number;
  title: string;
  img: string;
  ilgis?: number;
  aukstis?: number | number[];
  stilius?: string;
  sudetis?: string;
  gylis?: number;
  pristatymo_terminas?: string;
  papildoma_informacija?: string;
  description?: string;
  old_price?: number;
  price?: number;
}

export default function ProductCategoryPage() {
  const params = useParams();
  const categorySlug = params?.categorySlug as string | undefined;

  // Handle add to cart - you can customize this function
  const handleAddToCart = (product: Product) => {
    // Add your cart logic here
    console.log("Added to cart:", product);
    
    // Example: Save to localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <MainContent 
        categorySlug={categorySlug} 
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}