'use client';

import Hero from './Hero/Hero';
import CategoryCarousel from './CategoryCarousel/CategoryCarousel';
import VersloKlijentai from './VersloKlijentai/VersloKlijentai';
import ProfessionalInstallation from './ProfesonalusInstaliavimas/profesonalus-instaliavimas';
import SpecialOffersCarousel from './SpecialusPasiulymai/SpecialusPasiulymai';


export default function LandingClient() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Hero />
      <CategoryCarousel />
      <VersloKlijentai />
      <ProfessionalInstallation />
      <SpecialOffersCarousel />
    </div>
  );
}