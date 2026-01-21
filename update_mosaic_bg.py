
path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\components\ui\MosaicHeroBg.astro'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if it already has frontmatter
if not content.strip().startswith('---'):
    # Logic to Convert to Component
    frontmatter = """---
const { class: className, ...props } = Astro.props;
---
"""
    # Replace opening svg tag to include class and props
    # Original: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1243 590" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
    # New: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1243 590" preserveAspectRatio="xMidYMid slice" class={`w-full h-full ${className}`} {...props}>
    
    import re
    svg_tag_pattern = r'<svg([^>]*)class="w-full h-full"([^>]*)>'
    replacement = r'<svg\1class={`w-full h-full ${className}`} {...props}\2>'
    
    # We might need to be careful with the regex if class attribute is elsewhere or formatted differently
    # Let's try a simple string replace for the specific tag we saw in view_file
    original_opening = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1243 590" preserveAspectRatio="xMidYMid slice" class="w-full h-full">'
    new_opening = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1243 590" preserveAspectRatio="xMidYMid slice" class={`w-full h-full ${className}`} {...props}>'
    
    if original_opening in content:
        content = content.replace(original_opening, new_opening)
        content = frontmatter + content
        
        # Replace fill color
        content = content.replace('fill="#103646"', 'fill="currentColor"')
        print("Successfully converted MosaicHeroBg to Astro component and set fill to currentColor.")
    else:
        print("Could not find exact opening SVG tag. Aborting safe replace.")
else:
    print("File already has frontmatter. Checking if it needs fill update.")
    # If already component, ensure we update fills
    if 'fill="#103646"' in content:
        content = content.replace('fill="#103646"', 'fill="currentColor"')
        print("Updated fill to currentColor.")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
