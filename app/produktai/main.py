import os
from pathlib import Path

# === CONFIG ===
BASE_DIR = Path("")

CATEGORIES = [
    # ---- INTERJERAS ----
    { "title": "Lubų apvadai", "slug": "lubu-apvadai" },
    { "title": "Sienų apvadai", "slug": "sienu-apvadai" },
    { "title": "Grindų apvadai", "slug": "grindu-apvadai" },
    { "title": "Rozetės", "slug": "rozetes" },
    { "title": "Sienų plokštės", "slug": "sienu-plokstes" },
    { "title": "Lubų panelės", "slug": "lubu-paneles" },
    { "title": "Piliastrai", "slug": "piliastrai" },
    { "title": "Kolonos", "slug": "kolonos" },
    { "title": "Puskolonos", "slug": "puskolonos" },
    { "title": "Arkiniai apvadai", "slug": "arkiniai-apvadai" },
    { "title": "Gembės", "slug": "gembes" },
    { "title": "Židinio dekoracija", "slug": "zidinio-dekoracija" },
    { "title": "Nišos", "slug": "nisos" },
    { "title": "Apvadų kampai", "slug": "apvadu-kampai" },
    { "title": "Ornamentai", "slug": "ornamentai" },
    { "title": "Žiedai", "slug": "ziedai" },
    { "title": "Arkiniai elementai", "slug": "arkiniai-elementai" },
    { "title": "Papildomi elementai", "slug": "papildomi-elementai" },

    # ---- FASADAS ----
    { "title": "Frizai", "slug": "frizai" },
    { "title": "Architravai", "slug": "architravai" },
    { "title": "Balustrai", "slug": "balustrai" },
    { "title": "Stulpo kepurė", "slug": "stulpo-kepure" },
    { "title": "Balustrados pagrindai", "slug": "balustrados-pagrindai" },
    { "title": "Balustrados porankiai", "slug": "balustrados-porankiai" },
    { "title": "Langų juostos", "slug": "langu-juostos" },
    { "title": "Langų arkiniai rėmai", "slug": "lango-arkiniai-remai" },
    { "title": "Riežamieji elementai", "slug": "riejamieji-elementai" },
    { "title": "Palangės", "slug": "palanges" },
    { "title": "Pjedestalinės gembės", "slug": "pjedestalines-gembes" },
    { "title": "Langų šoniniai apvadai", "slug": "lango-soniniai-apvadai" },
    { "title": "Fasado frontonai", "slug": "fasado-frontonai" },
    { "title": "Fasado ornamentai", "slug": "facade-ornaments" },
    { "title": "Rustika", "slug": "rustikai" },
    { "title": "Fasado galiniai elementai", "slug": "fasado-galiniai-elementai" },
]

PAGE_TEMPLATE = """\
"use client";

import React from "react";
import MainContent from "@/app/components/Produktai/MainContent/MainContent";
import type {{ PageData }} from "@/app/components/Produktai/Types/types";

const PageData: PageData = {{
  title: "{title}",
  dataFile: "{slug}/{slug}.json",
  baseUrl: "/produktai/{slug}",
  R2FolderName: "{slug}",
  FilterPanelCategories: ["Kaina", "Medžiaga", "Stilius"],
  imageSuffixes: ["100", "20", "30", "40", "600"],
  maxImages: 2,
}};

export default function ProductCategoryPage() {{
  return (
    <div className="w-full min-h-screen">
      <MainContent PageData={{PageData}} />
    </div>
  );
}}
"""

def main():
    BASE_DIR.mkdir(parents=True, exist_ok=True)

    for cat in CATEGORIES:
        folder = BASE_DIR / cat["slug"]
        page_file = folder / "page.tsx"

        if page_file.exists():
            print(f"✓ Exists: {cat['slug']}")
            continue

        folder.mkdir(parents=True, exist_ok=True)

        page_content = PAGE_TEMPLATE.format(
            title=cat["title"],
            slug=cat["slug"],
        )

        page_file.write_text(page_content, encoding="utf-8")
        print(f"🆕 Created: {cat['slug']}/page.tsx")

if __name__ == "__main__":
    main()
