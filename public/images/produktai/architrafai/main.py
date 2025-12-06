import os

# Folder where your images are located (use "." for current folder)
folder = "."
os.chdir(folder)

# New filenames list (12 items)
new_names = [
    "4.04.101.100.PNG",
    "4.04.102.100.PNG",
    "4.04.201.100.PNG",
    "4.04.202.100.PNG",
    "4.04.301.100.PNG",
    "4.04.302.100.PNG",
    "4.34.101.100.PNG",
    "4.34.102.100.PNG",
    "4.34.201.100.PNG",
    "4.34.202.100.PNG",
    "4.34.301.100.PNG",
    "4.34.302.100.PNG"
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
    