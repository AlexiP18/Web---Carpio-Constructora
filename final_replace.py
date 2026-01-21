
page_path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\conjunto-habitacional.astro'

with open(page_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Lines 308-2524 need to be replaced (1-indexed, so 307-2523 in 0-indexed)
# Keep lines 0-306 (1-307), replace 307-2523 (308-2524), keep 2524+ (2525+)

new_div = '''      <div
        class="absolute inset-0 w-full h-full opacity-30 mix-blend-normal pointer-events-none"
      >
        <CubixBlackBg />
      </div>

'''

new_lines = lines[:307] + [new_div] + lines[2524:]

with open(page_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Done! Old lines: {len(lines)}, New lines: {len(new_lines)}")
print(f"Removed {len(lines) - len(new_lines)} lines of inline SVG")
