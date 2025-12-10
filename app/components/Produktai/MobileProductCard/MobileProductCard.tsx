'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import styles from './MobileProductCard.module.css';

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

interface MobileProductCardProps {
  product: Product;
  categoryTitle: string;
  onAddToCart: () => void;
}

const MobileProductCard: React.FC<MobileProductCardProps> = ({
  product,
  categoryTitle,
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

    <button onClick={onAddToCart} className={styles.cartBtn}>
      <ShoppingCart/> Į krepšelį
    </button>
  </div>
);

export default MobileProductCard;
