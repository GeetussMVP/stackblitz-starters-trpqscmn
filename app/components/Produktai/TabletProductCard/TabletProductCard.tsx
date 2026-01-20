"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string | number;
  title: string;
  images: string[];
  ilgis?: number;
  Plotis?: number;
  aukstis?: number | number[];
  stilius?: string;
  sudetis?: string;
  papildoma_informacija?: string;
  price?: number;
}

interface TabletProductCardProps {
  product: Product;
  categoryTitle: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddToCart: () => void;
}

const TabletProductCard: React.FC<TabletProductCardProps> = ({
  product,
  isExpanded,
  onToggleExpand,
  onAddToCart,
}) => {
  const firstImage = product.images[0] ?? "/placeholder-image.png";

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="relative w-full h-52 mb-3">
        <Image
          src={firstImage}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      <h2 className="font-semibold text-lg">{product.title}</h2>

      <p className="text-sm text-gray-600">
        Medžiaga: {product.sudetis || "—"}
      </p>

      {isExpanded && (
        <p className="text-sm text-gray-500 mt-2">
          {product.papildoma_informacija}
        </p>
      )}

      <div className="mt-auto flex gap-2 pt-4">
        <button
          onClick={onToggleExpand}
          className="flex-1 bg-gray-100 py-2 rounded-lg"
        >
          Daugiau
        </button>

        <button
          onClick={onAddToCart}
          className="flex items-center justify-center bg-slate-800 text-white px-4 rounded-lg"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
};

export default TabletProductCard;
