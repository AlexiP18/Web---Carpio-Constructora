
page_path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\conjunto-habitacional.astro'

with open(page_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the CTA section and the SVG within it
in_cta = False
svg_start = None
svg_end = None

for i, line in enumerate(lines):
    if '<!-- CTA Section -->' in line:
        in_cta = True
    if in_cta and '<svg' in line and 'class="w-full h-full"' in line:
        svg_start = i
    if svg_start and '</svg' in line:
        svg_end = i
        break

print(f"SVG found from line {svg_start+1} to {svg_end+1}")

# Replace the SVG with the component
if svg_start and svg_end:
    new_lines = lines[:svg_start] + ['        <CubixBlackBg />\n'] + lines[svg_end+1:]
    
    with open(page_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"Replaced {svg_end - svg_start + 1} lines with component. New file has {len(new_lines)} lines")
else:
    print("SVG not found!")
