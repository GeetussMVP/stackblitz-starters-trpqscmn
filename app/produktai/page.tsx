"use client";

import React from "react";

type Category = {
  id: number;
  title: string;
  img: string;
  href?: string;
};

const categories: Category[] = [
  { id: 1, title: "Apvadų kampai", img: "/images/landing/apvadu-kampai.png", href: "/produktai/apvadu-kampai" },
  { id: 2, title: "Grindų apvadai", img: "/images/landing/grindu-apvadai.png", href: "/produktai/grindu-apvadai" },
  { id: 3, title: "Nišos", img: "/images/landing/nisos.png", href: "/produktai/nisos" },
  { id: 4, title: "Rozetės", img: "/images/landing/rozetes.png", href: "/produktai/rozetes" },

  { id: 5, title: "Architrafai", img: "/images/landing/architrafai.png", href: "/produktai/architrafai" },
  { id: 6, title: "Kapiteliai", img: "/images/landing/kapitelis.png", href: "/produktai/kapitelis" },
  { id: 7, title: "Ornamentai", img: "/images/landing/ornamentai.png", href: "/produktai/ornamentai" },
  { id: 8, title: "Sienų apvadai", img: "/images/landing/sienu-apvadai.png", href: "/produktai/sienu-apvadai" },

  { id: 9, title: "Balustrai", img: "/images/landing/balustrai.png", href: "/produktai/balustrai" },
  { id: 10, title: "Kolonos", img: "/images/landing/kolonos.png", href: "/produktai/kolonos" },
  { id: 11, title: "Pagrindai", img: "/images/landing/pagrindas.png", href: "/produktai/pagrindas" },
  { id: 12, title: "Sienų panelės", img: "/images/landing/sienu-paneles.png", href: "/produktai/sienu-paneles" },

  { id: 13, title: "Gembės", img: "/images/landing/gembes.png", href: "/produktai/gembes" },
  { id: 14, title: "Kolonos liemuo", img: "/images/landing/kolonos-liemuo.png", href: "/produktai/kolonos-liemuo" },
  { id: 15, title: "Piliastrai", img: "/images/landing/piliastrai.png", href: "/produktai/piliastrai" },
  { id: 16, title: "Sienų plokštės", img: "/images/landing/sienu-plokstes.png", href: "/produktai/sienu-plokstes" },

  { id: 17, title: "Lubų apvadai", img: "/images/landing/lubu-apvadai.png", href: "/produktai/lubu-apvadai" },
  { id: 18, title: "Puskolonos", img: "/images/landing/puskolonos.png", href: "/produktai/puskolonos" },

  { id: 19, title: "Grindjuostės", img: "/images/landing/grindjuostes.png", href: "/produktai/grindjuostes" },
  { id: 20, title: "Lubų panelės", img: "/images/landing/lubu-paneles.png", href: "/produktai/lubu-paneles" },
  { id: 21, title: "Riejamasis elementas", img: "/images/landing/riejamasis-elementas.png", href: "/produktai/riejamasis-elementas" },
  { id: 22, title: "Židinio dekoracija", img: "/images/landing/zidinio-dekoracija.png", href: "/produktai/zidinio-dekoracija" },
];

export default function ProduktaiPage() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white text-center mb-6">
          Produktų Kategorijos
        </h1>

        <p className="text-lg sm:text-xl text-white/80 text-center max-w-2xl mx-auto mb-16">
          Naršykite mūsų aukštos kokybės statybinių ir apdailos medžiagų pasirinkimą
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-10">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href ?? "#"}
              className="group relative overflow-hidden rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden rounded-[2rem] relative">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // remove card if image does not exist
                    e.currentTarget.closest("a")?.remove();
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-5 text-center">
                <h2 className="text-lg font-medium text-white group-hover:text-teal-300 transition-colors duration-300">
                  {cat.title}
                </h2>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
