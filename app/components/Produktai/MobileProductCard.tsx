import React from "react";
import { Product } from "../../produktai/types";

interface Props {
  product: Product;
}

export default function MobileProductCard({ product }: Props) {
  return (
    <div className="p-3 bg-white rounded-2xl shadow-sm flex gap-3 items-center md:hidden">
      <img src={product.img} alt={product.title} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">{product.title}</h3>
        <p className="text-xs text-gray-500 truncate">{product.ilgis} cm • {product.aukstis} mm • {product.stilius}</p>
      </div>
    </div>
  );
}