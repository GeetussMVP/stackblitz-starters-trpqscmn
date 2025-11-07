'use client';

import Hero from './Hero';
import CategoryCarousel from './CategoryCarousel';

export default function LandingClient() {
  return (
    <div className="w-full">
      <Hero />
      <CategoryCarousel />
    </div>
  );
}