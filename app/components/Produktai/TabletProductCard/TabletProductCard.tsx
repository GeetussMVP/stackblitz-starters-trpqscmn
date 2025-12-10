'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, ChevronUp, ChevronDown } from 'lucide-react';
import styles from './TabletProductCard.module.css';

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

interface TabletProductCardProps {
  product: Product;
  categoryTitle: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddToCart: () => void;
}

const TabletProductCard: React.FC<TabletProductCardProps> = ({
  product,
  categoryTitle,
  isExpanded,
  onToggleExpand,
  onAddToCart
}) => (
  <div className={styles.card}>
    <div className={styles.imageWrapper}>
      <Image src={product.img} alt={product.title} fill style={{objectFit:'cover'}} />
    </div>

    <p className={styles.category}>{categoryTitle}</p>
    <h3 className={styles.title}>{product.title}</h3>

    <div className={styles.priceRow}>
      {product.old_price && <span className={styles.oldPrice}>€{product.old_price.toFixed(2)}</span>}
      {product.price && <span className={styles.price}>€{product.price.toFixed(2)}</span>}
    </div>

    <div className={styles.buttons}>
      <button onClick={onToggleExpand} className={styles.moreBtn}>
        {isExpanded ? "Mažiau" : "Daugiau"} {isExpanded ? <ChevronUp/> : <ChevronDown/>}
      </button>

      <button onClick={onAddToCart} className={styles.cartBtn}><ShoppingCart/> Į krepšelį</button>
    </div>
  </div>
);

export default TabletProductCard;
