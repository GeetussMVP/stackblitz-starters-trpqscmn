// DesktopProductCard.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import styles from "./DesktopProductCard.module.css";
import ImageCarousel from "./ImageCarousel";
import ProductInfo from "./ProductInfo";
import ThreeDViewer from "./ThreeDViewer";
import NoImagePlaceholder from "./NoImagePlaceholder";
import type { Product, DesktopCardProps } from "../Types/types";

const DesktopCard: React.FC<DesktopCardProps> = ({
  product,
  categoryTitle,
  isExpanded,
  onToggleExpand,
  onAddToCart,
}) => {
  const router = useRouter();
  const [show3DViewer, setShow3DViewer] = useState(false);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [];

  const handle3DView = () => setShow3DViewer(true);
  const close3DViewer = () => setShow3DViewer(false);

  const handleMoreInfo = () => {
    
    if (product.url && product.code) {
      router.push(product.url);
    } else {
      console.warn("Product missing URL or code - using expand fallback");
      onToggleExpand();
    }
  };

  /* ===== No images ===== */
  if (images.length === 0) {
    return (
      <div className={styles.card}>
        <NoImagePlaceholder product={product} />
        <ProductInfo product={product} />

        <div className={styles.buttonRow}>
          <button
            onClick={handleMoreInfo}
            className={styles.detailsBtn}
          >
            Daugiau informacijos
          </button>
          <button
            className={styles.cartBtn}
            onClick={onAddToCart}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {/* 🔑 ONE shared image container */}
      <div className={styles.imageContainer}>
        {!show3DViewer ? (
          <ImageCarousel
            productTitle={product.name}
            productCategory={product.category}
            onView3D={handle3DView}
          />
        ) : (
          <ThreeDViewer
            product={product}
            onClose={close3DViewer}
            isInline
          />
        )}
      </div>

      <ProductInfo product={product} />

      <div className={styles.buttonRow}>
        <button
          onClick={handleMoreInfo}
          className={styles.detailsBtn}
        >
          Daugiau informacijos
        </button>
        <button
          className={styles.cartBtn}
          onClick={onAddToCart}
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default DesktopCard;