// Location: @/components/products/TabletProductCard.tsx

'use client';

import React from 'react';
import { ShoppingCart, ChevronUp, ChevronDown, Truck, Check } from 'lucide-react';

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

interface TabletProductCardProps {
  product: Product;
  categoryTitle: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddToCart: () => void;
}

const TabletProductCard: React.FC<TabletProductCardProps> = ({
  product,
  categoryTitle,
  isExpanded,
  onToggleExpand,
  onAddToCart
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-200">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-teal-600 text-sm font-medium mb-1">{categoryTitle}</p>
            <h2 className="text-gray-800 text-xl font-bold">
              {product.title}
            </h2>
          </div>
          <button onClick={onToggleExpand} className="text-gray-500 ml-3">
            {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          {product.old_price && (
            <span className="text-red-400 line-through text-base">
              €{product.old_price.toFixed(2)}
            </span>
          )}
          {product.price && (
            <span className="text-teal-400 font-bold text-2xl">
              €{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Product Image */}
      <div className="px-5 pb-5">
        <div className="relative h-56 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Specifications */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {product.ilgis && (
            <div className="flex justify-between bg-gray-50 p-2 rounded">
              <span className="text-gray-600">Ilgis:</span>
              <span className="font-medium">{product.ilgis} mm</span>
            </div>
          )}
          {product.aukstis && (
            <div className="flex justify-between bg-gray-50 p-2 rounded">
              <span className="text-gray-600">Aukštis:</span>
              <span className="font-medium">
                {Array.isArray(product.aukstis) 
                  ? product.aukstis.join(', ') 
                  : product.aukstis} mm
              </span>
            </div>
          )}
          {product.gylis && (
            <div className="flex justify-between bg-gray-50 p-2 rounded">
              <span className="text-gray-600">Gylis:</span>
              <span className="font-medium">{product.gylis} mm</span>
            </div>
          )}
          {product.sudetis && (
            <div className="flex justify-between bg-gray-50 p-2 rounded">
              <span className="text-gray-600">Sudėtis:</span>
              <span className="font-medium">{product.sudetis}</span>
            </div>
          )}
          {product.stilius && (
            <div className="flex justify-between bg-gray-50 p-2 rounded col-span-2">
              <span className="text-gray-600">Stilius:</span>
              <span className="font-medium">{product.stilius}</span>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Details */}
      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-[600px]' : 'max-h-0'
      }`}>
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          {/* Additional Info */}
          {product.papildoma_informacija && (
            <div className="text-sm">
              <p className="text-gray-600 font-medium mb-2">Papildoma informacija:</p>
              <p className="text-gray-700 leading-relaxed">{product.papildoma_informacija}</p>
            </div>
          )}

          {/* Delivery Info */}
          <div className="space-y-2 text-sm">
            {product.pristatymo_terminas && (
              <div className="flex items-center gap-2">
                <Truck className="text-teal-400 w-4 h-4 flex-shrink-0" />
                <span className="text-gray-600">Pristatymas: {product.pristatymo_terminas}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Check className="text-teal-400 w-4 h-4 flex-shrink-0" />
              <span className="text-gray-600">Profesionalus montavimas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-teal-400 w-4 h-4 flex-shrink-0" />
              <span className="text-gray-600">Garantija</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 flex gap-3 border-t border-gray-100">
        <button
          onClick={onAddToCart}
          className="flex-1 bg-teal-400 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-500 transition-colors font-medium"
        >
          <ShoppingCart className="w-5 h-5" />
          Į krepšelį
        </button>
        <button
          onClick={onToggleExpand}
          className={`px-6 bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors ${
            isExpanded ? 'bg-slate-700' : ''
          }`}
        >
          {isExpanded ? 'Mažiau' : 'Daugiau'}
        </button>
      </div>
    </div>
  );
};

export default TabletProductCard;