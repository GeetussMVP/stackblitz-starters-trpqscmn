// Location: @/components/products/MobileProductCard.tsx

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

interface MobileProductCardProps {
  product: Product;
  categoryTitle: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddToCart: () => void;
}

const MobileProductCard: React.FC<MobileProductCardProps> = ({
  product,
  categoryTitle,
  isExpanded,
  onToggleExpand,
  onAddToCart
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-gray-800 text-lg font-bold">
            {product.title}
          </h2>
          <button onClick={onToggleExpand} className="text-gray-500">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{categoryTitle}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {product.old_price && (
            <span className="text-red-400 line-through text-sm">
              €{product.old_price.toFixed(2)}
            </span>
          )}
          {product.price && (
            <span className="text-teal-400 font-semibold text-xl">
              €{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Product Image */}
      <div className="px-4 pb-4">
        <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Expandable Details */}
      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-[1000px]' : 'max-h-0'
      }`}>
        <div className="p-4 space-y-4 border-t border-gray-100">
          {/* Specifications */}
          <div className="space-y-2 text-sm">
            {product.ilgis && (
              <div className="flex justify-between">
                <span className="text-gray-600">Ilgis:</span>
                <span className="font-medium">{product.ilgis} mm</span>
              </div>
            )}
            {product.aukstis && (
              <div className="flex justify-between">
                <span className="text-gray-600">Aukštis:</span>
                <span className="font-medium">
                  {Array.isArray(product.aukstis) 
                    ? product.aukstis.join(', ') 
                    : product.aukstis} mm
                </span>
              </div>
            )}
            {product.gylis && (
              <div className="flex justify-between">
                <span className="text-gray-600">Gylis:</span>
                <span className="font-medium">{product.gylis} mm</span>
              </div>
            )}
            {product.sudetis && (
              <div className="flex justify-between">
                <span className="text-gray-600">Sudėtis:</span>
                <span className="font-medium">{product.sudetis}</span>
              </div>
            )}
            {product.stilius && (
              <div className="flex justify-between">
                <span className="text-gray-600">Stilius:</span>
                <span className="font-medium">{product.stilius}</span>
              </div>
            )}
          </div>

          {/* Additional Info */}
          {product.papildoma_informacija && (
            <div className="text-sm">
              <p className="text-gray-600 font-medium mb-1">Papildoma informacija:</p>
              <p className="text-gray-700">{product.papildoma_informacija}</p>
            </div>
          )}

          {/* Delivery Info */}
          <div className="space-y-2 text-xs">
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
      <div className="p-4 flex gap-3 border-t border-gray-100">
        <button
          onClick={onAddToCart}
          className="flex-1 bg-teal-400 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-500 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-sm font-medium">Į krepšelį</span>
        </button>
        <button
          onClick={onToggleExpand}
          className={`flex-1 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors text-sm ${
            isExpanded ? 'bg-slate-700' : ''
          }`}
        >
          <span>{isExpanded ? 'Mažiau' : 'Daugiau'}</span>
        </button>
      </div>
    </div>
  );
};

export default MobileProductCard;