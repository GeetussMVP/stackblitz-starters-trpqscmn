const R2_BASE_URL = "https://pub-262c7ff9747743f0853580fc0debb426.r2.dev";

/**
 * Extracts the product code (e.g., "6.50.651") from a product name/title
 */
function extractCodeFromName(name: string): string {
  const match = name.match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : "";
}

/**
 * Gets all image paths for a product based on its name
 */
export function getAllImagePathsFromKarnizasName(productName: string): string[] {
  const code = extractCodeFromName(productName);

  if (!code) {
    return [];
  }

  const imageSuffixes = ["100", "20", "30", "40", "600"];

  const paths = imageSuffixes.map((suffix) => {
    return `${R2_BASE_URL}/lubu-apvadai/${code}.${suffix}.png`;
  });

  return paths;
}

/**
 * Checks if an image exists at the given URL
 */
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

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn(`[pathToObj] Image check timed out: ${url}`);
    } else {
      console.error(`[pathToObj] Error checking image: ${url}`, error);
    }
    return false;
  }
}

/**
 * Gets existing image paths for a product (returns first 2 images)
 */
export async function getExistingImagePaths(
  productName: string
): Promise<string[]> {
  const allPaths = getAllImagePathsFromKarnizasName(productName);

  if (allPaths.length === 0) {
    return [];
  }

  return allPaths.slice(0, 2);
}

/**
 * Gets the .obj file path for a product based on its name
 * @param productName - The product name/title containing the code
 * @returns The full URL to the .obj file
 */
export function getObjFilePath(productName: string): string {
  const code = extractCodeFromName(productName);
  
  if (!code) {
    console.warn(`[pathToObj] Could not extract code from product name: ${productName}`);
    return "";
  }

  return `${R2_BASE_URL}/lubu-apvadai/${code}.obj`;
}

/**
 * Checks if an .obj file exists for a product
 */
export async function checkObjExists(productName: string): Promise<boolean> {
  const objPath = getObjFilePath(productName);
  
  if (!objPath) {
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(objPath, {
      method: "HEAD",
      cache: "no-cache",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return res.ok;
  } catch (error) {
    console.error(`[pathToObj] Error checking .obj file:`, error);
    return false;
  }
}