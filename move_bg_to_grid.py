
page_path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\conjunto-habitacional.astro'

with open(page_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Remove the global background block
global_start = None
global_end = None

for i, line in enumerate(lines):
    if '<!-- SVG Background para todo el componente -->' in line:
        global_start = i
    if global_start and '</div' in line:
        # Check if it contains the component we added
        has_component = False
        for j in range(global_start, i+1):
            if 'BackgroundWavesConjunto' in lines[j]:
                has_component = True
                break
        if has_component:
            global_end = i
            break

# 2. Add background to Projects Grid section
grid_section_line = None
for i, line in enumerate(lines):
    if '<!-- Projects Grid -->' in line:
        # The section tag is usually the next line or close
        for j in range(i, min(i+5, len(lines))):
            if '<section' in lines[j]:
                grid_section_line = j
                break
        break

if global_start is not None and global_end is not None and grid_section_line is not None:
    print(f"Removing global bg from {global_start+1} to {global_end+1}")
    print(f"Injecting bg into section at line {grid_section_line+1}")
    
    # Construct new lines
    # Remove global block
    # Need to be careful with indices if we modify the list.
    # Strategy: Build a new list.
    
    new_lines = []
    
    # Before global block
    new_lines.extend(lines[:global_start])
    
    # Skip global block (lines[global_start:global_end+1])
    
    # Between global block and Grid Section
    # Note: global_end+1 is the line AFTER the block
    # grid_section_line index is based on ORIGINAL file. 
    # Since grid section is AFTER global block, its index in the file remains valid 
    # relative to the original Lines list.
    
    middle_chunk = lines[global_end+1:grid_section_line+1] 
    # line[grid_section_line] is the <section> tag. We want to Append it, then inject.
    
    new_lines.extend(middle_chunk)
    
    # Inject background div inside the section
    # The current section tag might be <section class="...">
    # We want:
    # <section class="...">
    #   <div class="absolute inset-0 -z-10"> <BackgroundWavesConjunto /> </div>
    #   ... content ...
    
    bg_injection = '''    <div class="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-50">
      <BackgroundWavesConjunto />
    </div>
'''
    new_lines.append(bg_injection)
    
    # Rest of the file
    new_lines.extend(lines[grid_section_line+1:])
    
    with open(page_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    print("Successfully moved background!")

else:
    print("Could not find start/end lines properly")
    print(f"Global Start: {global_start}, Global End: {global_end}, Grid: {grid_section_line}")
