"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import styles from "./DesktopProductCard.module.css";

interface Product {
  id: string | number;
  title: string;
  images: string[];
  sudetis?: string;
  papildoma_informacija?: string;
  ilgis?: number;
  plotis?: number;
  aukstis?: number | number[];
}

interface DesktopProductCardProps {
  product: Product;
  categoryTitle: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddToCart: () => void;
  onView3D?: () => void;
}

const DesktopProductCard: React.FC<DesktopProductCardProps> = ({
  product,
  isExpanded,
  onToggleExpand,
  onAddToCart,
  onView3D,
}) => {
  useEffect(() => {
    console.log("[DesktopProductCard] product.title:", product.title);
    console.log("[DesktopProductCard] images array:", product.images);
  }, [product]);

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);

  const images = product.images;
  const firstLoad = useRef(true);

  if (!images || images.length === 0) {
    console.warn("[DesktopProductCard] NO IMAGES FOUND for:", product.title);
    return null;
  }

  const displayAukstis = () => {
    if (!product.aukstis) return "—";
    if (Array.isArray(product.aukstis)) return `${product.aukstis.join(", ")} cm`;
    return `${product.aukstis} cm`;
  };

  const slideTo = (newIndex: number, dir: "left" | "right") => {
    if (animating) return;

    firstLoad.current = false;
    setAnimating(true);
    setPrev(current);
    setDirection(dir);
    setCurrent(newIndex);

    setTimeout(() => setAnimating(false), 450);
  };

  const handlePrevImage = () => {
    slideTo(current === 0 ? images.length - 1 : current - 1, "left");
  };

  const handleNextImage = () => {
    slideTo(current === images.length - 1 ? 0 : current + 1, "right");
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.sliderTrack}>
          {!firstLoad.current && (
            <div
              className={`${styles.slideImage} ${
                animating
                  ? direction === "right"
                    ? styles.exitLeft
                    : styles.exitRight
                  : ""
              }`}
            >
              <Image src={images[prev]} alt="" fill className={styles.image} />
            </div>
          )}

          <div
            className={`${styles.slideImage} ${
              firstLoad.current
                ? ""
                : animating
                ? direction === "right"
                  ? styles.enterRight
                  : styles.enterLeft
                : ""
            }`}
          >
            <Image src={images[current]} alt="" fill className={styles.image} />
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button className={styles.arrowLeft} onClick={handlePrevImage}>
              ‹
            </button>
            <button className={styles.arrowRight} onClick={handleNextImage}>
              ›
            </button>
          </>
        )}

        <button className={styles.view3DButton} onClick={onView3D}>
          Žiūrėti 3D
        </button>
      </div>

      <div className={styles.infoBlock}>
        <p className={styles.article}>[ARTIKALIS: {product.id}]</p>
        <h1 className={styles.title}>{product.title}</h1>

        {isExpanded && (
          <p className={styles.expandArea}>
            {product.papildoma_informacija}
          </p>
        )}
      </div>

      <div className={styles.buttonRow}>
        <button onClick={onToggleExpand} className={styles.detailsBtn}>
          Daugiau informacijos
        </button>
        <button className={styles.cartBtn} onClick={onAddToCart}>
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default DesktopProductCard;
