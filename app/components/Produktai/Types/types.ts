// -------------------------------------------
// Types/types.ts
// -------------------------------------------

export interface ImageType {
  filename: string;
  local_path: string;
  url: string;
}

export interface ProductModel {
  filename: string;
  url: string;
  local_path: string;
}

export interface KarnizasProductRaw {
  name: string;
  url: string;
  code: string | null;
  category: string;
  details: {
    "Ilgis"?: string;
    "Plotis"?: string;
    "Aukštis"?: string;
    "Išgaubto lenkimo spindulys"?: string;
    "Įgaubto lenkimo spindulys"?: string;
    Width?: string;
    Height?: string;
    Depth?: string;
  };
  flexible_analog_exists: boolean;
  images: string[];
  model?: ProductModel;
  mounting_instructions: string;
}

export interface Product {
  id: string;
  name: string;
  title: string; // Added for ProductInfo compatibility - you may want title = name
  url: string;
  code: string | null;
  category: string;
  images: string[];
  details?: Record<string, string>;
  flexible_analog_exists?: boolean;
  model?: ProductModel;
  mounting_instructions?: string;
  
  // Optional legacy / CMS fields
  sudetis?: string;
  papildoma_informacija?: string;
}

export interface PageData {
  title: string;
  dataFile: string;
  baseUrl: string;
  R2FolderName: string;
  FilterPanelCategories: string[];
  imageSuffixes?: string[];
  maxImages?: number;
  customFilterConfig?: Partial<FilterConfig>;
}

export interface FiltersType {
  priceRange: string;
  material: string;
  style: string;
}

export interface FilterConfig {
  priceRange: Array<{ value: string; label: string }>;
  material: Array<{ value: string; label: string }>;
  style: Array<{ value: string; label: string }>;
}

export interface DesktopCardProps {
  product: Product;
  categoryTitle: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddToCart: () => void;
}