import os

# Folder where your images are located (use "." for current folder)
folder = "."
os.chdir(folder)

# New filenames list (29 items)
new_names = [
    "6.53.801.100.PNG",
    "6.53.115.100.PNG",
    "6.53.803.100.PNG",
    "6.53.116.100.PNG",
    "1.53.106.100.PNG",
    "6.53.114.100.PNG",
    "6.53.113.100.PNG",
    "6.53.804.100.PNG",
    "1.53.111.100.PNG",
    "6.53.808.100.PNG",
    "1.53.107.100.PNG",
    "6.53.705.100.PNG",
    "6.53.806.100.PNG",
    "6.53.110.100.PNG",
    "6.53.701.100.PNG",
    "6.53.117.100.PNG",
    "1.53.109.100.PNG",
    "1.53.103.100.PNG",
    "6.53.802.100.PNG",
    "1.53.108.100.PNG",
    "6.53.118.100.PNG",
    "1.53.104.100.PNG",
    "6.53.805.100.PNG",
    "1.53.807.100.PNG",
    "1.53.102.100.PNG",
    "1.53.110.100.PNG",
    "1.53.101.100.PNG",
    "1.53.105.100.PNG",
    "1.53.501.100.PNG"
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