"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useBusinessAuth } from "./BusinessAuthContext";

interface Product {
  id: string | number;
  title: string;
  images: string[];
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
  originalPrice?: number;
  businessDiscount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isBusinessMode, discountRate } = useBusinessAuth();

  // Load cart when component mounts or mode changes
  useEffect(() => {
    const cartKey = isBusinessMode ? "businessCart" : "standardCart";
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [isBusinessMode]);

  // Save cart whenever it changes
  useEffect(() => {
    const cartKey = isBusinessMode ? "businessCart" : "standardCart";
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, isBusinessMode]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      let finalPrice = product.price || 0;
      if (isBusinessMode && product.price) {
        finalPrice = product.price * (1 - discountRate / 100);
      }

      const productWithPrice: Product = {
        ...product,
        price: finalPrice,
        originalPrice: product.price,
        businessDiscount: isBusinessMode ? discountRate : undefined,
      };

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...productWithPrice, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    const cartKey = isBusinessMode ? "businessCart" : "standardCart";
    localStorage.removeItem(cartKey);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}