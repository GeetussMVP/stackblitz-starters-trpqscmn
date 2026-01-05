"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "./DesktopProductCard.module.css";

import { getExistingImagePaths } from "@/app/components/Produktai/ImagePath/getImagePath";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageCarouselProps {
  productTitle: string;
  productCategory: string;
  onView3D: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  productTitle,
  productCategory,
  onView3D,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      setLoading(true);

      const paths = await getExistingImagePaths(
        productTitle,
        productCategory,
        undefined, // ✅ Let it auto-detect suffixes based on category
        5,
        true // ✅ ENABLE VERIFICATION - only return images that exist
      );

      if (isMounted) {
        setImages(paths);
        setLoading(false);
        if (paths.length > 0) {
          setImagesLoaded(true);
        }
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [productTitle, productCategory]);

  const handleImageError = (index: number) => {
    console.warn(
      `[ImageCarousel] Image failed to load: ${images[index]}`
    );
    // Remove the failed image from the list
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <div className={styles.imageContainer}>
      {(loading || !imagesLoaded) && (
        <div className={styles.imageLoader}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}

      {images.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation!.prevEl = prevRef.current;
              swiper.params.navigation!.nextEl = nextRef.current;
            }
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={images.length > 1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className={styles.swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image}>
              <div className={styles.slideWrapper}>
                <Image
                  src={image}
                  alt={`${productTitle} – Image ${index + 1}`}
                  fill
                  className={styles.image}
                  priority={index === 0}
                  onLoad={handleImageLoad}
                  onError={() => handleImageError(index)}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {images.length > 1 && (
        <>
          <button
            ref={prevRef}
            className={styles.arrowLeft}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            ref={nextRef}
            className={styles.arrowRight}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      <button className={styles.view3DButton} onClick={onView3D}>
        Žiūrėti 3D
      </button>
    </div>
  );
};

export default ImageCarousel;