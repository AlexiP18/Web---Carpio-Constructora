
path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\todos-servicios.astro'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Original wrapper:
# <div class="absolute inset-0 opacity-10">
#   <MosaicHeroBg />
# </div>

# New wrapper:
# <div class="absolute inset-0 opacity-10 text-white">
#   <MosaicHeroBg />
# </div>

import re
pattern = r'(<div class="absolute inset-0 opacity-10")>'
replacement = r'\1 text-white">'

if re.search(pattern, content):
    content = re.sub(pattern, replacement, content)
    print("Added text-white to MosaicHeroBg wrapper.")
else:
    print("Could not find MosaicHeroBg wrapper to add text-white.")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
