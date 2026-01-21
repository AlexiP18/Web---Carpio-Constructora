import re

files_to_process = [
    r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\diseno-residencial.astro',
    r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\diseno-retail.astro'
]

# Imports to add
imports_code = """import CubixBlackBg from "../../components/ui/CubixBlackBg.astro";
import BackgroundWavesConjunto from "../../components/ui/BackgroundWavesConjunto.astro";
"""

for file_path in files_to_process:
    print(f"Processing {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add Imports
    if 'import CubixBlackBg' not in content:
        # Find the last import
        last_import = content.rfind('import ')
        # Find the end of that line
        end_of_line = content.find('\n', last_import) + 1
        content = content[:end_of_line] + imports_code + content[end_of_line:]
    
    # 2. Remove Global Backgrounds
    # Pattern for component-based global bg (Residencial)
    content = re.sub(r'<!-- SVG Background para todo el componente -->\s*<div[^>]*>\s*<BackgroundWaves[^>]*>\s*</div>', '', content, flags=re.DOTALL)
    
    # Pattern for inline SVG global bg (Retail)
    # Be careful with greedy matching. Assuming '<!-- SVG Background para todo el componente -->' is followed by a <div> containing <svg> and </svg> then </div>
    # Using a non-greedy logic for div content
    content = re.sub(r'<!-- SVG Background para todo el componente -->\s*<div[^>]*pointer-events-none[^>]*>\s*<svg.*?xmlns="http://www.w3.org/2000/svg".*?</svg>\s*</div>', '', content, flags=re.DOTALL)
    
    # 3. Inject BackgroundWavesConjunto into Grid Section
    # Target: <section class="py-20 relative z-10">
    # We want to insert the bg div immediately after section open
    bg_div = """    <div class="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <BackgroundWavesConjunto />
    </div>
"""
    # Use replace for string literal injection
    grid_section_tag = '<section class="py-20 relative z-10">'
    if grid_section_tag in content:
        # Check if already has background (to avoid double injection)
        section_start = content.find(grid_section_tag)
        following_text = content[section_start:section_start+500]
        if 'BackgroundWavesConjunto' not in following_text:
            content = content.replace(grid_section_tag, grid_section_tag + '\n' + bg_div)
            print("  Injected BackgroundWavesConjunto into Grid Section")

    # 4. Replace CTA Background with CubixBlackBg
    # Target: Inside CTA Section <section ... bg-brand-primary ...>
    # Look for <!-- SVG Background --> or the div containing the SVG
    
    # For Residencial (Component based AnimatedPrimaryBg)
    # It might look like: <div ...> <AnimatedPrimaryBg /> </div>
    # We replace <AnimatedPrimaryBg /> with <CubixBlackBg />
    # OR replace the whole block if desired. User said "same components", so CubixBlackBg.
    
    if '<AnimatedPrimaryBg />' in content:
        content = content.replace('<AnimatedPrimaryBg />', '<CubixBlackBg />')
        print("  Replaced AnimatedPrimaryBg with CubixBlackBg")
        
    # For Retail (Inline SVG)
    # Target: <div class="absolute inset-0 ..."> ... <svg ...> </svg> ... </div>
    # We can perform a robust replacement finding the CTA section first
    
    cta_marker = '<!-- CTA Section -->'
    if cta_marker in content:
        parts = content.split(cta_marker)
        if len(parts) > 1:
            pre_cta = parts[0] + cta_marker
            post_cta = parts[1]
            
            # Find the inner SVG/content to replace. 
            # In Retail, it's <!-- SVG Background --> \n <div...> ... <svg>...</svg> ... </div>
            
            # Regex to find the SVG container block within the CTA part
            # Div with "absolute inset-0"
            
            # Simplified match: Replace the SVG content inside the div
            # Or better: Replace the <svg ...> ... </svg> with <CubixBlackBg />
            
            # Let's try matching the svg tag specifically inside this region
            # Note: The SVG in Retail has class="w-full h-full" etc.
            
            # Be precise:
            # Match: <div class="absolute inset-0 ..."> \s* <svg ...> </svg> \s* </div>
            # Replace with: <div class="absolute inset-0 ..."> \n <CubixBlackBg /> \n </div>
            
            # Actually, `CubixBlackBg` component includes the SVG. It does NOT include the wrapping absolute div in itself?
            # Let's check `CubixBlackBg.astro` ... it is just <svg ...>.
            # So we need to keep the wrapping div.
            
            replacement_made = False
            
            # Regex for <svg ... </svg>
            svg_regex = r'<svg\s+class="w-full h-full"\s+xmlns="http://www.w3.org/2000/svg".*?</svg>'
            
            match = re.search(svg_regex, post_cta, flags=re.DOTALL)
            if match:
                 post_cta = post_cta[:match.start()] + '<CubixBlackBg />' + post_cta[match.end():]
                 content = pre_cta + post_cta
                 print("  Replaced CTA inline SVG with CubixBlackBg")
                 replacement_made = True
            
            if not replacement_made: 
                # Check for Residencial case where it might be wrapped differently? 
                # Residencial has <AnimatedPrimaryBg>. Already handled above.
                pass

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
