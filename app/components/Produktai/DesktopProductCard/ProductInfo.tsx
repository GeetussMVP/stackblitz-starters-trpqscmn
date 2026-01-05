"use client";

import React from "react";
import styles from "./DesktopProductCard.module.css";

interface Product {
  id: string;
  title: string;
  sudetis?: string;
  details?: {
    "Ilgis"?: string;
    "Plotis"?: string;
    "Aukštis"?: string;
  };
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const workPieceLength = product.details?.["Ilgis"] || "—";
  const widthOnCeiling = product.details?.["Plotis"] || "—";
  const heightOnWall = product.details?.["Aukštis"] || "—";

  return (
    <div className={styles.infoBlock}>
      <p className={styles.article}>[ARTIKALIS: {product.id}]</p>
      <h1 className={styles.title}>{product.title}</h1>
      <p className={styles.price}>€X už m</p>

      <p className={styles.material}>
        Medžiaga: <strong>{product.sudetis || "Gipsas"}</strong>
      </p>

      <p className={styles.dimensions}>
        Ilgis (Ilgis): <strong>{workPieceLength}</strong>
      </p>

      <p className={styles.dimensions}>
        Plotis (Width on ceiling): <strong>{widthOnCeiling}</strong>
      </p>

      <p className={styles.dimensions}>
        Aukštis (Height on wall): <strong>{heightOnWall}</strong>
      </p>
    </div>
  );
};

export default ProductInfo;