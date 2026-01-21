
import re

# 1. Update the component to add class and remove watermark
comp_path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\components\ui\CubixBlackBg.astro'

with open(comp_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add class="w-full h-full" to svg
content = content.replace(
    'xmlns="http://www.w3.org/2000/svg"',
    'class="w-full h-full" xmlns="http://www.w3.org/2000/svg"'
)

# Remove watermark text element
content = re.sub(r'<text data-watermark="true"[^>]*>[^<]*</text>', '', content)

with open(comp_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Component updated!")

# 2. Update conjunto-habitacional.astro
page_path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\conjunto-habitacional.astro'

with open(page_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Add import after MosaicHeroBg import
new_lines = []
for line in lines:
    new_lines.append(line)
    if 'import MosaicHeroBg' in line:
        new_lines.append('import CubixBlackBg from "../../components/ui/CubixBlackBg.astro";\n')

with open(page_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Import added!")

# 3. Now find and replace the inline SVG with component
with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the CTA section and replace inline SVG with component
# The pattern: from <svg after "SVG Background" comment to </svg>
pattern = r'(<div\s+class="absolute inset-0 w-full h-full opacity-30 mix-blend-normal pointer-events-none"\s*>\s*)<svg[^>]*class="w-full h-full"[^>]*>.*?</svg>'

replacement = r'\1<CubixBlackBg />'

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SVG replaced with component!")
