
page_path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\conjunto-habitacional.astro'

with open(page_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find CTA section background div start and the closing </svg> + </div>
cta_found = False
bg_div_start = None
svg_close_line = None

for i, line in enumerate(lines):
    if '<!-- CTA Section -->' in line:
        cta_found = True
    if cta_found and '<!-- SVG Background -->' in line:
        bg_div_start = i + 1  # The <div> line after comment
    if bg_div_start and '</svg>' in line.strip():
        # Check if next non-empty line is </div>
        for j in range(i+1, min(i+5, len(lines))):
            if '</div>' in lines[j]:
                svg_close_line = j
                break
        if svg_close_line:
            break

print(f"Background div starts at line {bg_div_start+1 if bg_div_start else 'N/A'}")
print(f"SVG closes and div closes at line {svg_close_line+1 if svg_close_line else 'N/A'}")

if bg_div_start and svg_close_line:
    # Keep the comment and replace the div+svg with just div+component
    new_content = '''      <div
        class="absolute inset-0 w-full h-full opacity-30 mix-blend-normal pointer-events-none"
      >
        <CubixBlackBg />
      </div>
'''
    new_lines = lines[:bg_div_start] + [new_content] + lines[svg_close_line+1:]
    
    with open(page_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"Success! Replaced lines {bg_div_start+1} to {svg_close_line+1}. New file has {len(new_lines)} lines.")
else:
    print("Could not find the SVG to replace!")
