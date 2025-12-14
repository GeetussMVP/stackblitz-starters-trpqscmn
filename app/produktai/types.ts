// File: types.ts
export interface Product {
  id: number;
  title: string;
  img: string;
  ilgis: number;
  aukstis: number;
  stilius: "modernus" | "tradiciskas";
  description?: string;
  href?: string;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  products: Product[];
}