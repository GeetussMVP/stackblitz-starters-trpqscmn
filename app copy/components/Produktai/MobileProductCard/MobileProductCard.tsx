"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string | number;
  title: string;
  images: string[];
  ilgis?: number;
  plotis?: number;
  aukstis?: number | number[];
  stilius?: string;
  sudetis?: string;
  papildoma_informacija?: string;
  price?: number;
}

interface MobileProductCardProps {
  product: Product;
  categoryTitle: string;
  onAddToCart: () => void;
}

const MobileProductCard: React.FC<MobileProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const firstImage = product.images[0] ?? "/placeholder-image.png";

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
      <div className="relative w-full h-48">
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

      {product.price && (
        <p className="text-teal-500 font-bold">€{product.price}</p>
      )}

      <button
        onClick={onAddToCart}
        className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-2 rounded-lg"
      >
        <ShoppingCart size={18} />
        Į krepšelį
      </button>
    </div>
  );
};

export default MobileProductCard;
