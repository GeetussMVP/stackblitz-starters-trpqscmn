from pathlib import Path

# Base paths
SCRIPT_DIR = Path(__file__).parent.resolve()
PRODUKTAI_DIR = SCRIPT_DIR  # Script is in /produktai folder

def find_all_product_folders(produktai_dir: Path):
    """Recursively find all product folders (folders containing page.tsx or meta.ts)"""
    product_folders = []
    
    for category_folder in produktai_dir.iterdir():
        if not category_folder.is_dir():
            continue
        
        # Skip template folders and the script itself
        if 'Template' in category_folder.name or category_folder.name.endswith('.py'):
            continue
        
        # Look for product code folders inside category folders
        for item in category_folder.iterdir():
            if item.is_dir():
                # Check if it has page.tsx or meta.ts (indicates it's a product folder)
                if (item / 'page.tsx').exists() or (item / 'meta.ts').exists():
                    product_folders.append(item)
    
    return product_folders

def rename_folder_dots_to_dashes(product_path: Path, dry_run: bool = True):
    """Rename folders with dots to use dashes instead"""
    folder_name = product_path.name
    
    # Check if folder name contains dots
    if '.' in folder_name:
        new_folder_name = folder_name.replace('.', '-')
        new_path = product_path.parent / new_folder_name
        
        # Check if target folder already exists
        if new_path.exists():
            print(f"  ⚠️  Target already exists: {new_folder_name} (skipping)")
            return product_path, False
        
        if dry_run:
            print(f"  🔄 Would rename: {folder_name} → {new_folder_name}")
            return new_path, True
        else:
            try:
                # Rename the folder
                product_path.rename(new_path)
                print(f"  ✅ Renamed: {folder_name} → {new_folder_name}")
                return new_path, True
            except Exception as e:
                print(f"  ❌ Error renaming {folder_name}: {e}")
                return product_path, False
    else:
        # No dots in name, skip
        return product_path, False

def main():
    """Main function to rename all product folders"""
    print("🔄 Folder Rename Script: Dots (.) → Dashes (-)\n")
    
    # Ask user for confirmation
    print("Choose an option:")
    print("  1. DRY RUN (preview what will be renamed)")
    print("  2. RENAME FOR REAL")
    print("  3. Cancel")
    
    choice = input("\nEnter your choice (1/2/3): ").strip()
    
    if choice == '3':
        print("❌ Cancelled. No changes made.")
        return
    
    dry_run = choice == '1'
    
    if dry_run:
        print("\n🔍 DRY RUN MODE - No folders will be renamed\n")
    else:
        confirm = input("\n⚠️  This will rename folders. Continue? (yes/no): ")
        if confirm.lower() != 'yes':
            print("❌ Cancelled. No changes made.")
            return
        print("\n🚀 RENAME MODE - Renaming folders...\n")
    
    # Find all product folders
    print("🔍 Scanning for product folders...\n")
    product_folders = find_all_product_folders(PRODUKTAI_DIR)
    
    if not product_folders:
        print("⚠️  No product folders found!")
        return
    
    print(f"Found {len(product_folders)} product folders\n")
    
    # Group by category for better output
    categories = {}
    for folder in product_folders:
        category = folder.parent.name
        if category not in categories:
            categories[category] = []
        categories[category].append(folder)
    
    renamed_count = 0
    skipped_count = 0
    
    # Rename folders
    for category, folders in sorted(categories.items()):
        print(f"📂 Category: {category}")
        
        category_renamed = 0
        for product_path in folders:
            new_path, was_renamed = rename_folder_dots_to_dashes(product_path, dry_run)
            if was_renamed:
                category_renamed += 1
                renamed_count += 1
            else:
                if '.' not in product_path.name:
                    skipped_count += 1
        
        if category_renamed == 0:
            print(f"  ℹ️  No folders to rename in this category")
        
        print()
    
    # Summary
    print("=" * 60)
    if dry_run:
        print("🔍 Dry run complete!")
        print("📊 Summary (no folders were actually renamed):")
    else:
        print("✨ Done!")
        print("📊 Summary:")
    
    print(f"   🔄 {'Would rename' if dry_run else 'Renamed'}: {renamed_count} folders")
    print(f"   ⏭️  Skipped (no dots): {skipped_count} folders")

if __name__ == "__main__":
    main()