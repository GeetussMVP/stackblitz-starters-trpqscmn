'use client';
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useBusinessAuth } from '../contexts/BusinessAuthContext';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, TrendingDown, Building2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function KrepselisPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { isBusinessUser, businessAccount, discountRate } = useBusinessAuth();

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-light text-gray-900 mb-4">Jūsų krepšelis tuščias</h2>
            <p className="text-gray-600 mb-8">Pradėkite apsipirkimą ir pridėkite produktų į krepšelį</p>
            <Link
              href="/produktai"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              Žiūrėti produktus
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">Krepšelis</h1>
          <p className="text-gray-600">
            {cartCount} {cartCount === 1 ? 'prekė' : cartCount < 10 ? 'prekės' : 'prekių'}
          </p>
        </div>

        {/* Business Account Banner */}
        {isBusinessUser && businessAccount && (
          <div className="mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 text-white rounded-3xl p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Verslo paskyra</h3>
                <p className="text-white/60">{businessAccount.companyName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-teal-400/20 backdrop-blur-xl rounded-xl px-4 py-3 border border-teal-400/30">
              <TrendingDown className="w-5 h-5 text-teal-300" />
              <span className="text-sm">
                Pritaikyta <span className="font-semibold">{discountRate}% verslo nuolaida</span> visiems produktams
              </span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Pašalinti iš krepšelio"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {item.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          aria-label="Sumažinti kiekį"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          aria-label="Padidinti kiekį"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        {isBusinessUser && item.originalPrice && item.originalPrice !== item.price && (
                          <div className="text-sm text-gray-400 line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </div>
                        )}
                        <div className="text-xl font-semibold text-gray-900">
                          {formatPrice((item.price || 0) * item.quantity)}
                        </div>
                        {isBusinessUser && item.businessDiscount && (
                          <div className="text-xs text-teal-600 font-medium">
                            -{item.businessDiscount}% nuolaida
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
            >
              Išvalyti krepšelį
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-medium text-gray-900 mb-6">Užsakymo santrauka</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tarpinė suma</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {isBusinessUser && (
                  <div className="flex justify-between text-teal-600 font-medium">
                    <span>Verslo nuolaida ({discountRate}%)</span>
                    <span>Pritaikyta</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Pristatymas</span>
                  <span className="text-sm">Skaičiuojamas vėliau</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-gray-900">Viso</span>
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-4 rounded-xl hover:bg-slate-800 transition-colors font-medium mb-3">
                Pereiti prie apmokėjimo
              </button>

              <Link
                href="/produktai"
                className="block w-full text-center py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tęsti apsipirkimą
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}