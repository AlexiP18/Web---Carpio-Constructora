
page_path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\conjunto-habitacional.astro'

with open(page_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Locate the "SVG Background para todo el componente" block
start_line = None
end_line = None

for i, line in enumerate(lines):
    if '<!-- SVG Background para todo el componente -->' in line:
        start_line = i + 1 # The <div>
    if start_line and '</svg>' in line:
         # Check closely next lines for closing div
         if i+1 < len(lines) and '</div>' in lines[i+1]:
             end_line = i + 1
             break

print(f"Replacing from line {start_line+1} to {end_line+1}")

if start_line and end_line:
    new_div = '''    <div
      class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <BackgroundWavesConjunto />
    </div>
'''
    new_lines = lines[:start_line] + [new_div] + lines[end_line+1:]
    
    with open(page_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print("Replacement success!")
else:
    print("Could not locate the block properly")
