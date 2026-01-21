
path = r'c:\Users\alexi\Desktop\Web---Carpio-Constructora\src\pages\proyectos\diseno-residencial.astro'

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find where things go wrong. Around line 265.
# Look for the start of CTA section
cta_start_idx = -1
for i, line in enumerate(lines):
    if '<!-- CTA Section -->' in line:
        cta_start_idx = i
        break

if cta_start_idx != -1:
    print(f"Found CTA start at line {cta_start_idx + 1}")
    
    # We will keep content up to cta_start_idx (inclusive of previous lines, not inclusive of CTA start line if we rewrite it)
    # Actually, let's include the CTA start line comment
    
    clean_lines = lines[:cta_start_idx]
    
    # New content
    new_content = """    <!-- CTA Section -->
    <section class="py-20 bg-brand-primary relative overflow-hidden">
      <!-- SVG Background -->
      <div class="absolute inset-0 w-full h-full opacity-30 mix-blend-normal pointer-events-none">
        <CubixBlackBg />
      </div>

      <div class="max-w-4xl mx-auto px-6 text-center relative z-10" data-aos="fade-up">
        <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          ¿Necesitas un Diseño Personalizado?
        </h2>
        <p class="text-xl text-gray-200 mb-8">
          Contáctanos y creemos juntos el diseño perfecto para tu hogar.
        </p>
        <a
          href="https://wa.me/593998323304?text=%C2%A1Hola%20Carpio%20Constructora!%20%F0%9F%A4%A9%20Me%20encantar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20sus%20dise%C3%B1os%20residenciales."
          target="_blank"
          class="inline-flex items-center gap-2 bg-[#D79528] hover:bg-[#c08520] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <Icon name="ph:whatsapp-logo-fill" class="w-6 h-6" />
          Contactar por WhatsApp
        </a>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
"""
    
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(clean_lines)
        f.write(new_content)
    
    print("Fixed diseno-residencial.astro")

else:
    print("Could not find CTA section start")
