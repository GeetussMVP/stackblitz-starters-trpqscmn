import React from "react";
import { Product } from "../../produktai/types";

interface Props {
  product: Product;
}

export default function DesktopProductCard({ product }: Props) {
  return (
    <div className="p-5 bg-white rounded-3xl shadow-md flex gap-6 items-center hidden lg:flex">
      <img src={product.img} alt={product.title} className="w-24 h-24 rounded-lg object-cover" />
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="font-semibold text-lg truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 truncate">{product.ilgis} cm • {product.aukstis} mm • {product.stilius}</p>
        {product.description && <p className="text-xs text-gray-400 mt-1">{product.description}</p>}
      </div>
    </div>
  );
}