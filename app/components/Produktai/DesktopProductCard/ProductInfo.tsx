"use client";

import React from "react";
import styles from "./DesktopProductCard.module.css";

/* 🔑 €/m products */
const PRICE_PER_METRE_CATEGORIES = new Set([
  "lubu-apvadai",
  "moulding",
  "grindjuostes",
  "grindu-apvadai",
]);

interface Product {
  id: string;
  title: string;
  sudetis: string;
  category: string;
  price?: number | null;
  details: {
    Ilgis?: string;
    Plotis?: string;
    Aukštis?: string;
    Aukstis?: string; // Alternative spelling
    Skersmuo?: string;
    Storis?: string;
    Spindulys?: string;
    "Arkos Lenkimo Spindulys"?: string;
  };
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const isPricePerMetre =
    PRICE_PER_METRE_CATEGORIES.has(product.category);

  // Normalize Aukštis vs Aukstis
  const aukstis = product.details.Aukštis || product.details.Aukstis;

  /* ================= PRICE ================= */

  let priceContent: React.ReactNode;

  if (product.price == null) {
    priceContent = (
      <span className={styles.contactPrice}>
        Kreipkitės dėl kainos
      </span>
    );
  } else if (isPricePerMetre && product.details.Ilgis) {
    const lengthMm = parseFloat(
      product.details.Ilgis.replace(/[^\d.,]/g, "").replace(",", ".")
    );

    if (Number.isFinite(lengthMm) && lengthMm > 0) {
      const lengthM = lengthMm / 1000;
      priceContent = <>€{(product.price / lengthM).toFixed(2)} / m</>;
    } else {
      priceContent = (
        <span className={styles.contactPrice}>
          Kreipkitės dėl kainos
        </span>
      );
    }
  } else {
    priceContent = <>€{product.price.toFixed(2)}</>;
  }

  /* ================= RENDER ================= */

  return (
    <div className={styles.infoBlock}>
      <p className={styles.article}>
        [ARTIKALIS: {product.id}]
      </p>

      <h1 className={styles.title}>{product.title}</h1>

      <p className={styles.price}>{priceContent}</p>

      <p className={styles.material}>
        Medžiaga: <strong>{product.sudetis}</strong>
      </p>

      {/* Auto-detect and display all available dimensions */}
      {product.details.Skersmuo && (
        <p className={styles.dimensions}>
          Skersmuo: <strong>{product.details.Skersmuo}</strong>
        </p>
      )}
      
      {product.details.Spindulys && (
        <p className={styles.dimensions}>
          Spindulys: <strong>{product.details.Spindulys}</strong>
        </p>
      )}
      
      {product.details["Arkos Lenkimo Spindulys"] && (
        <p className={styles.dimensions}>
          Arkos Lenkimo Spindulys: <strong>{product.details["Arkos Lenkimo Spindulys"]}</strong>
        </p>
      )}
      
      {product.details.Ilgis && (
        <p className={styles.dimensions}>
          Ilgis: <strong>{product.details.Ilgis}</strong>
        </p>
      )}
      
      {product.details.Plotis && (
        <p className={styles.dimensions}>
          Plotis: <strong>{product.details.Plotis}</strong>
        </p>
      )}
      
      {aukstis && (
        <p className={styles.dimensions}>
          Aukštis: <strong>{aukstis}</strong>
        </p>
      )}
      
      {product.details.Storis && (
        <p className={styles.dimensions}>
          Storis: <strong>{product.details.Storis}</strong>
        </p>
      )}
    </div>
  );
};

export default ProductInfo;