import os

# Folder where your images are located (use "." for current folder)
folder = "."
os.chdir(folder)

# New filenames list (42 items)
new_names = [
    "1.11.002.100.PNG",
    "1.11.003.100.PNG",
    "1.11.004.100.PNG",
    "1.11.005.100.PNG",
    "1.11.008.100.PNG",
    "1.11.009.100.PNG",
    "1.11.010.100.PNG",
    "1.15.002.100.PNG",
    "1.15.003.100.PNG",
    "1.15.004.100.PNG",
    "1.15.005.100.PNG",
    "1.15.008.100.PNG",
    "1.15.009.100.PNG",
    "1.15.010.100.PNG",
    "1.21.001.100.PNG",
    "1.21.002.100.PNG",
    "1.21.003.100.PNG",
    "1.21.004.100.PNG",
    "1.21.005.100.PNG",
    "1.21.006.100.PNG",
    "1.21.007.100.PNG",
    "1.21.008.100.PNG",
    "4.11.101.100.PNG",
    "4.11.102.100.PNG",
    "4.11.201.100.PNG",
    "4.11.202.100.PNG",
    "4.11.301.100.PNG",
    "4.11.302.100.PNG",
    "4.15.101.100.PNG",
    "4.15.102.100.PNG",
    "4.15.201.100.PNG",
    "4.15.202.100.PNG",
    "4.15.301.100.PNG",
    "4.15.302.100.PNG",
    "4.21.101.100.PNG",
    "4.21.201.100.PNG",
    "4.21.301.100.PNG",
    "4.45.201.100.PNG",
    "4.45.301.100.PNG",
    "4.51.101.100.PNG",
    "4.51.201.100.PNG",
    "4.51.301.100.PNG"
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