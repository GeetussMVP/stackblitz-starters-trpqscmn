'use client';

import dynamic from 'next/dynamic';

// ✅ Dynamically import useEffect/useState components
const Hero = dynamic(() => import('./Hero'));
const CategoryCarousel = dynamic(() => import('./CategoryCarousel'));

export default function LandingClient() {
  return (
    <>
      <Hero />
      <CategoryCarousel />
    </>
  );
}