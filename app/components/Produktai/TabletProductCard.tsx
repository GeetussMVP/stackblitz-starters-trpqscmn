import React from "react";
import { Product } from "../../produktai/types";

interface Props {
  product: Product;
}

export default function TabletProductCard({ product }: Props) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md flex gap-4 items-center hidden md:flex lg:hidden">
      <img src={product.img} alt={product.title} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="font-semibold text-base truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 truncate">{product.ilgis} cm • {product.aukstis} mm • {product.stilius}</p>
      </div>
    </div>
  );
}