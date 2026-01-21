
import re

source_file = "src/pages/proyectos/diseno-residencial.astro"
target_component = "src/components/ui/AnimatedPrimaryBg.astro"

with open(source_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Regex to find the CTA section SVG (dark blue animated one)
# It starts with <svg ... class="w-full h-full" ... <g class="g1">
# We need to capture the full <svg>...</svg> block.
# Since it's nested or large, simple regex might struggle, but let's try finding the start and matching end tag.
# The SVG in CTA section starts around line 297/300 in recent views.
# It contains 'class="g1"' inside styles.

start_marker = '<svg\n          class="w-full h-full"' # Based on formatting in file view
# Or simpler search
start_idx = content.find('<svg\n          class="w-full h-full"')
if start_idx == -1:
    start_idx = content.find('<svg class="w-full h-full"') # Fallback

if start_idx == -1:
    print("Could not find SVG start")
    exit(1)

# Find the end of this SVG. It ends with </svg>
# There are multiple SVGs. This one is inside the CTA section.
# Let's assume it's the one containing "g1" class styles.
end_idx = content.find('</svg>', start_idx) + 6

svg_content = content[start_idx:end_idx]

# Check if we got the right one
if '.g1' not in svg_content:
    print("Extracted SVG does not seem to vary animated one")
    # Try next occurrence?
    # Actually checking the file view, strictly the CTA one has class="w-full h-full" on the SVG tag directly.
    pass

astro_header = """---
/**
 * AnimatedPrimaryBg - Fondo animado geométrico con tonos azules oscuros
 * Extraído de la sección CTA para reutilización
 */
---

"""

full_component = astro_header + svg_content

with open(target_component, 'w', encoding='utf-8') as f:
    f.write(full_component)

print(f"Created {target_component}")
