from pathlib import Path

# Full original ornament list
ALL_CODES = [
    "1.60.003", "1.60.004", "1.60.005", "1.60.006", "1.60.007",
    "1.60.008", "1.60.009", "1.60.010", "1.60.011", "1.60.015",
    "1.60.017", "1.60.019", "1.60.020", "1.60.021", "1.60.022",
    "1.60.023", "1.60.024", "1.60.025", "1.60.027", "1.60.028",
    "1.60.030", "1.60.031", "1.60.032", "1.60.034", "1.60.035",
    "1.60.036", "1.60.037", "1.60.038", "1.60.108", "1.60.109",
    "1.60.110", "1.60.111", "1.60.120", "1.60.123", "1.60.135",
    "1.60.501", "1.60.503", "4.99.001"
]

# Start from code: 1.60.032 → index 22
START_CODE_INDEX = 22
ORNAMENT_CODES = ALL_CODES[START_CODE_INDEX:]

# Start renaming from 23rd PNG → index 22
START_FILE_INDEX = 22

SUFFIX_TO_ADD = ".100"

def main():
    folder = Path('.')
    png_files = sorted([p for p in folder.iterdir() if p.suffix.lower() == ".png"])

    print(f"Found {len(png_files)} PNG files.\n")

    code_pos = 0

    for idx, file in enumerate(png_files):
        if idx < START_FILE_INDEX:
            continue
        
        if code_pos >= len(ORNAMENT_CODES):
            print("No more ornament codes — stopping.")
            break

        new_name = f"{ORNAMENT_CODES[code_pos]}{SUFFIX_TO_ADD}.PNG"
        code_pos += 1

        new_file = file.with_name(new_name)
        file.rename(new_file)

        print(f"RENAMED: {file.name} → {new_name}")

    print("\n✔ Completed!")

if __name__ == "__main__":
    main()