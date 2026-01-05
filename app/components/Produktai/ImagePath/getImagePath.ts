// app/components/Produktai/ImagePath/getImagePath.ts

const R2_BASE_URL = "https://pub-262c7ff9747743f0853580fc0debb426.r2.dev";

/* =========================================================
   SHARED HELPERS
   ========================================================= */

/**
 * Extracts the FIRST simple product code like: 1.61.101
 * @param name - Product name (can be undefined)
 * @returns Extracted code or empty string
 */
function extractSimpleCode(name?: string): string {
  if (!name) {
    console.warn("extractSimpleCode: name is undefined or null");
    return "";
  }
  const match = name.match(/\d+\.\d+\.\d+/);
  return match ? match[0] : "";
}

/**
 * Extracts FULL niche-style range code like: 0-1.61.101-1.61.110
 * @param name - Product name (can be undefined)
 * @returns Extracted range code or empty string
 */
function extractRangeCode(name?: string): string {
  if (!name) {
    console.warn("extractRangeCode: name is undefined or null");
    return "";
  }
  const match = name.match(/0-\d+\.\d+\.\d+-\d+\.\d+\.\d+/);
  return match ? match[0] : "";
}

/**
 * Checks if a string contains a niche-style range
 * @param name - Product name (can be undefined)
 * @returns True if range code exists
 */
function hasRangeCode(name?: string): boolean {
  if (!name) return false;
  return /0-\d+\.\d+\.\d+-\d+\.\d+\.\d+/.test(name);
}

/* =========================================================
   CATEGORY → FOLDER RESOLUTION
   ========================================================= */

/**
 * Maps product category to R2 folder name
 * Extend freely as new categories appear
 */
function resolveFolderFromCategory(category?: string): string {
  if (!category) return "";
  
  switch (category) {
    case "nisos":
    case "niche":
      return "nisos";

    case "lubu-apvadai":
    case "Karnizas":
      return "lubu-apvadai";

    default:
      // Safe fallback: category itself
      return category;
  }
}

/**
 * Returns common image suffix patterns based on category
 * Different categories may use different naming conventions
 */
function getSuffixesForCategory(category?: string): string[] {
  if (!category) return ["100", "20", "30", "40", "10", "41", "600"];
  
  // Ceiling panels use simpler suffixes
  if (category === "lubu-paneles") {
    return ["10", "41", "100", "20", "30", "40", "600"];
  }
  
  // Default pattern for most products
  return ["100", "20", "30", "40", "10", "41", "600"];
}

/* =========================================================
   PATH GENERATORS
   ========================================================= */

/**
 * SIMPLE PRODUCTS (Karnizas, etc.)
 * Generates: /folder/1.61.101.100.png
 */
export function getAllImagePathsFromSimpleCode(
  productName?: string,
  folderName?: string,
  imageSuffixes: string[] = ["100", "20", "30", "40", "10", "41", "600"]
): string[] {
  if (!productName || !folderName) {
    console.warn("getAllImagePathsFromSimpleCode: missing productName or folderName", {
      productName,
      folderName,
    });
    return [];
  }

  const code = extractSimpleCode(productName);

  if (!code) {
    console.warn(`No simple code found in product name: "${productName}"`);
    return [];
  }

  return imageSuffixes.map(
    (suffix) => `${R2_BASE_URL}/${folderName}/${code}.${suffix}.png`
  );
}

/**
 * NICHES (range-based filenames)
 * Generates: /nisos/0-1.61.101-1.61.110.10.png
 */
export function getNicheImagePaths(
  productName?: string,
  folderName?: string
): string[] {
  if (!productName || !folderName) {
    console.warn("getNicheImagePaths: missing productName or folderName", {
      productName,
      folderName,
    });
    return [];
  }

  const code = extractRangeCode(productName);

  if (!code) {
    console.warn(`No range code found in product name: "${productName}"`);
    return [];
  }

  return [`${R2_BASE_URL}/${folderName}/${code}.10.png`];
}

/* =========================================================
   IMAGE EXISTENCE CHECK
   ========================================================= */

async function checkImageExists(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      method: "HEAD",
      cache: "no-cache",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

/* =========================================================
   SMART IMAGE RESOLVER (MAIN ENTRY POINT)
   ========================================================= */

/**
 * Universal image resolver.
 *
 * ✔ Uses product.category to determine folder
 * ✔ Supports niche ranges
 * ✔ Supports simple codes
 * ✔ Auto-detects suffix patterns per category
 * ✔ Keeps previous fallback logic
 */
export async function getExistingImagePaths(
  productName?: string,
  category?: string,
  imageSuffixes?: string[],
  maxImages: number = 2,
  verifyExists: boolean = false
): Promise<string[]> {
  if (!productName) {
    console.warn("getExistingImagePaths: productName is undefined");
    return [];
  }

  const folderName = resolveFolderFromCategory(category);
  
  if (!folderName) {
    console.warn(`No folder resolved for category: "${category}"`);
    return [];
  }

  // ✅ Auto-detect suffixes based on category if not provided
  const suffixes = imageSuffixes || getSuffixesForCategory(category);

  let generatedPaths: string[] = [];

  // 1️⃣ Niche-style filenames (range-based)
  if (hasRangeCode(productName)) {
    generatedPaths = getNicheImagePaths(productName, folderName);
  }

  // 2️⃣ Fallback to simple code logic
  if (generatedPaths.length === 0) {
    generatedPaths = getAllImagePathsFromSimpleCode(
      productName,
      folderName,
      suffixes
    );
  }

  if (generatedPaths.length === 0) {
    console.warn(
      `No image paths generated for product: ${productName} (category: ${category})`
    );
    return [];
  }

  // 🚀 FAST MODE (no HEAD checks)
  if (!verifyExists) {
    return generatedPaths.slice(0, maxImages);
  }

  // 🔍 VERIFIED MODE
  const existingPaths: string[] = [];

  for (const path of generatedPaths) {
    if (existingPaths.length >= maxImages) break;

    const exists = await checkImageExists(path);
    if (exists) {
      existingPaths.push(path);
    }
  }

  return existingPaths;
}

export default {
  extractSimpleCode,
  extractRangeCode,
  hasRangeCode,
  getAllImagePathsFromSimpleCode,
  getNicheImagePaths,
  getExistingImagePaths,
};