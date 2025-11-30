// Location: @/components/products/DesktopProductCard.tsx

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

interface DesktopProductCardProps {
  product: Product;
  categoryTitle: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddToCart: () => void;
}

const DesktopProductCard: React.FC<DesktopProductCardProps> = ({
  product,
  categoryTitle,
  isExpanded,
  onToggleExpand,
  onAddToCart
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-200">
      <div className="flex gap-6 p-6">
        {/* Left: Image Section */}
        <div className="w-80 flex-shrink-0">
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onAddToCart}
              className="flex-1 bg-teal-400 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-500 transition-colors font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              Į krepšelį
            </button>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <p className="text-teal-600 text-sm font-medium mb-1">{categoryTitle}</p>
            <h2 className="text-gray-800 text-2xl font-bold mb-3">
              {product.title}
            </h2>
            <div className="flex items-center gap-3">
              {product.old_price && (
                <span className="text-red-400 line-through text-lg">
                  €{product.old_price.toFixed(2)}
                </span>
              )}
              {product.price && (
                <span className="text-teal-400 font-bold text-3xl">
                  €{product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4 text-sm">
            {product.ilgis && (
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Ilgis:</span>
                <span className="font-medium">{product.ilgis} mm</span>
              </div>
            )}
            {product.aukstis && (
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Aukštis:</span>
                <span className="font-medium">
                  {Array.isArray(product.aukstis) 
                    ? product.aukstis.join(', ') 
                    : product.aukstis} mm
                </span>
              </div>
            )}
            {product.gylis && (
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Gylis:</span>
                <span className="font-medium">{product.gylis} mm</span>
              </div>
            )}
            {product.sudetis && (
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Sudėtis:</span>
                <span className="font-medium">{product.sudetis}</span>
              </div>
            )}
            {product.stilius && (
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Stilius:</span>
                <span className="font-medium">{product.stilius}</span>
              </div>
            )}
          </div>

          {/* Additional Info - Collapsible */}
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96' : 'max-h-0'
          }`}>
            <div className="pt-4 border-t border-gray-200">
              {product.papildoma_informacija && (
                <div className="mb-4">
                  <p className="text-gray-600 font-medium mb-2">Papildoma informacija:</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{product.papildoma_informacija}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex gap-6 text-sm">
                {product.pristatymo_terminas && (
                  <div className="flex items-center gap-2">
                    <Truck className="text-teal-400 w-4 h-4" />
                    <span className="text-gray-600">{product.pristatymo_terminas}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Check className="text-teal-400 w-4 h-4" />
                  <span className="text-gray-600">Profesionalus montavimas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-teal-400 w-4 h-4" />
                  <span className="text-gray-600">Garantija</span>
                </div>
              </div>
              <button
                onClick={onToggleExpand}
                className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1"
              >
                {isExpanded ? (
                  <>Mažiau <ChevronUp size={16} /></>
                ) : (
                  <>Daugiau <ChevronDown size={16} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopProductCard;