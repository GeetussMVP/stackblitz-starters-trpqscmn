"use client";

import React from "react";
import styles from "./DesktopProductCard.module.css";
import type { Product } from "../Types/types";

interface NoImagePlaceholderProps {
  product: Product;
}

const NoImagePlaceholder: React.FC<NoImagePlaceholderProps> = ({ product }) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.noImagePlaceholder}>
        <p className="text-gray-500 text-lg font-semibold">Paveikslėlis nerastas</p>
        <p className="text-sm text-gray-400 mt-2">{product.id}</p>
      </div>
    </div>
  );
};

export default NoImagePlaceholder;