import os

# Folder where your images are located (use "." for current folder)
folder = "."
os.chdir(folder)

# New filenames list (34 items)
new_names = [
    "1.52.279.100.PNG",
    "1.52.283.100.PNG",
    "1.52.284.100.PNG",
    "1.52.285.100.PNG",
    "1.52.286.100.PNG",
    "1.52.287.100.PNG",
    "1.52.288.100.PNG",
    "1.52.289.100.PNG",
    "1.52.290.100.PNG",
    "1.52.291.100.PNG",
    "1.52.292.100.PNG",
    "1.52.293.100.PNG",
    "1.52.294.100.PNG",
    "1.52.295.100.PNG",
    "1.52.296.100.PNG",
    "1.52.297.100.PNG",
    "1.52.298.100.PNG",
    "1.52.299.100.PNG",
    "1.52.301.100.PNG",
    "1.52.302.100.PNG",
    "1.52.308.100.PNG",
    "1.52.312.100.PNG",
    "1.52.314.100.PNG",
    "1.52.322.100.PNG",
    "1.52.348.100.PNG",
    "1.52.375.100.PNG",
    "1.52.400.100.PNG",
    "1.52.810.100.PNG",
    "1.52.812.100.PNG",
    "1.52.815.100.PNG",
    "1.52.816.100.PNG",
    "1.52.817.100.PNG",
    "1.52.818.100.PNG",
    "1.52.819.100.PNG"
]

# Get current files sorted alphabetically (assumes PNG)
files = sorted([f for f in os.listdir(folder) if f.lower().endswith(".png")])

if len(files) != len(new_names):
    print("❌ ERROR: Files count does not match new names count!")
    print(f"Files: {len(files)}, New Names: {len(new_names)}")
else:
    for old, new in zip(files, new_names):
        print(f"Renaming: {old} → {new}")
        os.rename(old, new)
    print("✅ Renaming complete!")