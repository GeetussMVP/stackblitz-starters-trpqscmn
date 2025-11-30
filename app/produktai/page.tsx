"use client";

import React from "react";

type Category = {
  id: number;
  title: string;
  img: string;
  href?: string;
};

const categories: Category[] = [
  { id: 1, title: "Gipso kartono plokštės", img: "images/landing/gipso-kartono-plokstes.png.png", href: "/produktai/gipso-kartono-plokstes" },
  { id: 2, title: "Tinkas ir Glaistas", img: "/images/landing/tinkas-ir-glaistas.png", href: "/produktai/tinkas-ir-glaistas" },
  { id: 3, title: "Lubu Apvadai", img: "/images/landing/lubu-apvadai.png", href: "/produktai/lubu-apvadai" },
  { id: 4, title: "Rozetės", img: "/images/landing/rozetes.PNG", href: "/produktai/rozetes" },
  { id: 5, title: "Kolonos", img: "/images/landing/kolonos.JPG", href: "/produktai/kolonos" },
  { id: 6, title: "Gembės", img: "/images/landing/gembes.webp", href: "/produktai/gembes" },
  { id: 7, title: "Sieninis dekoras", img: "/images/landing/sieninis-dekoras.png", href: "/produktai/sieninis-dekoras" },
  { id: 8, title: "Statulėlės", img: "/images/landing/statuleles.JPG", href: "/produktai/statuleles" },
];

export default function ProduktaiPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Produktų kategorijos
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Naršykite mūsų aukštos kokybės statybinių ir apdailos medžiagų kategoriją
          </p>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href ?? "#"}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden bg-gray-100 relative">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Title Below Image */}
              <div className="p-4 sm:p-5 text-center">
                <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 group-hover:text-[#8c0014] transition-colors duration-300">
                  {cat.title}
                </h2>
              </div>
            </a>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Reikalinga pagalba?
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Mūsų komanda pasiruošusi padėti jums rasti tinkamus produktus jūsų projektui
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontaktai"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#8c0014] text-white rounded-xl font-semibold hover:bg-[#6d0010] transition-colors duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Susisiekite su mumis
              </a>
              <a
                href="/apie"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300 text-sm sm:text-base"
              >
                Sužinokite daugiau
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}