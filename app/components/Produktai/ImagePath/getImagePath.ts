function normalizeCorniceFolder(name: string): string {
  return name
    .trim()
    .replace(/\./g, "_")
    .replace(/\s+/g, "_");
}

function extractCodeFromName(name: string): string {
  const match = name.match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : "";
}

export function getAllImagePathsFromCorniceName(
  productName: string
): string[] {
  console.log("[getAllImagePathsFromCorniceName] raw productName:", productName);

  const folderName = normalizeCorniceFolder(productName);
  console.log("[getAllImagePathsFromCorniceName] folderName:", folderName);

  const code = extractCodeFromName(productName);
  console.log("[getAllImagePathsFromCorniceName] extracted code:", code);

  if (!code) {
    console.warn(
      "[getAllImagePathsFromCorniceName] could not extract code from name"
    );
    return [];
  }

  const basePath = `/data/cornice/${folderName}/images`;
  console.log("[getAllImagePathsFromCorniceName] basePath:", basePath);

  const imageSuffixes = ["100", "20", "30", "40", "600"];

  const imagePaths = imageSuffixes.map((suffix) => {
    const fileName = `${code}.${suffix}.png`;
    const fullPath = `${basePath}/${fileName}`;
    console.log("[getAllImagePathsFromCorniceName] trying image:", fullPath);
    return fullPath;
  });

  console.log(
    "[getAllImagePathsFromCorniceName] final imagePaths:",
    imagePaths
  );

  return imagePaths;
}
