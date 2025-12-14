"use client";

import Hero from "./Hero/Hero";
import CategoryCarousel from "./CategoryCarousel/CategoryCarousel";
import VersloKlijentai from "./VersloKlijentai/VersloKlijentai";
import ProfessionalInstallation from "./ProfesonalusInstaliavimas/profesonalus-instaliavimas";
import SpecialOffersCarousel from "./SpecialusPasiulymai/SpecialusPasiulymai";
import FAQSection from "./DUK/DUK";
import Suintimas from "./Suintimas/Suintimas";
import Quote from "./Quote/Quote";

// Sections
const sections = [
  { id: "hero", component: <Hero /> },
  { id: "quote", component: <Quote /> },
  { id: "category", component: <CategoryCarousel /> },
  { id: "verslo", component: <VersloKlijentai /> },
  { id: "installation", component: <ProfessionalInstallation /> },
  { id: "offers", component: <SpecialOffersCarousel /> },
  { id: "faq", component: <FAQSection /> },
  { id: "suintimas", component: <Suintimas /> },
];

export default function LandingClient() {
  return (
    <div className="w-full">
      {sections.map((section) => (
        <div
          key={section.id}
          className="min-h-screen flex justify-center items-center"
        >
          {section.component}
        </div>
      ))}
    </div>
  );
}