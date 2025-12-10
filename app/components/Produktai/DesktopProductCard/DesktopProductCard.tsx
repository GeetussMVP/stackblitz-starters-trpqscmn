'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import styles from './DesktopProductCard.module.css';

interface Product {
  id: string | number;
  title: string;
  img: string;
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
  categoryTitle,
  isExpanded,
  onToggleExpand,
  onAddToCart,
  onView3D
}) => {

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);

  const images = [
    product.img,
    "/images/placeholder.jpg"
  ];

  const firstLoad = useRef(true);

  if (!product || !product.img || !product.title) {
    console.error("Invalid product data:", product);
    return null;
  }

  const displayAukstis = () => {
    if (!product.aukstis) return "—";
    if (Array.isArray(product.aukstis)) return `${product.aukstis.join(', ')} cm`;
    return `${product.aukstis} cm`;
  };

  const slideTo = (newIndex: number, dir: 'left' | 'right') => {
    if (animating) return;

    firstLoad.current = false;
    setAnimating(true);
    setPrev(current);
    setDirection(dir);
    setCurrent(newIndex);

    setTimeout(() => {
      setAnimating(false);
    }, 450); // matches CSS duration
  };

  const handlePrevImage = () => {
    slideTo(
      current === 0 ? images.length - 1 : current - 1,
      "left"
    );
  };

  const handleNextImage = () => {
    slideTo(
      current === images.length - 1 ? 0 : current + 1,
      "right"
    );
  };

  return (
    <div className={styles.card}>
      
      {/* IMAGE */}
      <div className={styles.imageContainer}>

        {/* TWO IMAGES SLIDING */}
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

        <button className={styles.arrowLeft} onClick={handlePrevImage}>‹</button>
        <button className={styles.arrowRight} onClick={handleNextImage}>›</button>

        <button className={styles.view3DButton} onClick={onView3D}>
          Žiūrėti 3D
        </button>
      </div>

      {/* INFO BLOCK */}
      <div className={styles.infoBlock}>
        <p className={styles.article}>[ARTIKALIS: {product.id}]</p>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>€X už m</p>

        <p className={styles.material}>
          Medžiaga: <strong>{product.sudetis || "—"}</strong>
        </p>

        <p className={styles.dimensions}>
          Ilgis: <strong>{product.ilgis ? `${product.ilgis} cm` : "—"}</strong>
        </p>

        <p className={styles.dimensions}>
          Plotis: <strong>{product.plotis ? `${product.plotis} cm` : "—"}</strong>
        </p>

        <p className={styles.dimensions}>
          Aukštis: <strong>{displayAukstis()}</strong>
        </p>

        {isExpanded && (
          <p className={styles.expandArea}>
            {product.papildoma_informacija}
          </p>
        )}
      </div>

      {/* BUTTONS */}
      <div className={styles.buttonRow}>
        <button onClick={onToggleExpand} className={styles.detailsBtn}>
          Daugiau informacijos
        </button>
        <button className={styles.cartBtn} onClick={onAddToCart}>
          <ShoppingCart size={20}/>
        </button>
      </div>

    </div>
  );
};

export default DesktopProductCard;
