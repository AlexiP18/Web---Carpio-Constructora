import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion';

// --- DATA ---

const BENEFITS_DATA = [
  {
    eyebrow: "Calidad Garantizada",
    heading: "Altos Estándares",
    description: "Cada detalle refleja nuestro compromiso con la excelencia, desde la selección de materiales hasta la precisión en la ejecución."
  },
  {
    eyebrow: "Trayectoria y Confianza",
    heading: "8+ Años de Experiencia",
    description: "Casi una década construyendo con calidad y compromiso. Nuestro equipo combina experiencia e innovación para ofrecer resultados confiables, duraderos y siempre enfocados en la satisfacción del cliente."
  },
  {
    eyebrow: "Diseños Únicos",
    heading: "Soluciones Personalizadas",
    description: "Cada proyecto es único. Adaptamos nuestros servicios a tus necesidades específicas, presupuesto y visión arquitectónica para resultados excepcionales."
  }
];

const IMAGES = [
  {
    url: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_amaranto/1. exterior/1_Exterior_Panoramica",
    rotation: "rotate-3",
    label: "Casa Amaranto - Exterior"
  },
  {
    url: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_magna/1. exterior/0_Vista_Principal",
    rotation: "-rotate-6",
    label: "Casa Magna - Frontal"
  },
  {
    url: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/keops/2. interior/1. Principal",
    rotation: "rotate-2",
    label: "Proyecto Keops - Interior"
  },
  {
    url: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/arrayanes_ficoa/2. interior/2_Sala",
    rotation: "-rotate-4",
    label: "Arrayanes Ficoa - Sala"
  },
  {
    url: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/arrayanes_izamba/1. exterior/vista",
    rotation: "rotate-6",
    label: "Arrayanes Izamba - Exterior"
  },
  {
    url: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_amaranto/2. interior/7_interior_bbq",
    rotation: "-rotate-3",
    label: "Casa Amaranto - Área BBQ"
  }
];

// --- GALLERY CARD COMPONENT ---

interface GalleryCardProps {
  url: string;
  rotation: string;
  label: string;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ url, rotation, label, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`aspect-square w-32 sm:w-56 md:w-72 lg:w-80 rounded-[20px] sm:rounded-[30px] overflow-hidden border border-gray-200 hover:border-[#103646]/40 bg-white transition-all duration-500 transform hover:scale-105 cursor-pointer shadow-xl relative pointer-events-auto group ${rotation}`}
    >
      {/* Full vibrant color image without grayscale */}
      <img 
        src={url} 
        alt={label} 
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
      />
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#103646]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">{label}</span>
      </div>
    </div>
  );
};

// --- MAIN EXPLORATIONS GALLERY COMPONENT ---

export default function ExplorationsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Track scroll progress of the 300vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply smooth physics-based spring smoothing to eliminate scroll stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Split scroll timeline into 3 stages for the text content
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveIndex(0);
    } else if (latest < 0.70) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  // Fluid staggered parallax offsets for both columns moving upwards smoothly
  const yLeft = useTransform(smoothProgress, [0, 1], [300, -300]);
  const yRight = useTransform(smoothProgress, [0, 1], [420, -180]);

  // Current active text item
  const activeItem = BENEFITS_DATA[activeIndex];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[300vh] bg-transparent text-gray-900 overflow-visible"
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 pointer-events-none">
        
        {/* Content Box */}
        <div className="relative flex flex-col items-center justify-center text-center max-w-xl mx-auto px-6 pointer-events-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center"
            >
              {/* Eyebrow badge with corporate colors */}
              <span className="text-xs uppercase tracking-widest text-[#103646] font-bold mb-4 bg-[#103646]/10 px-4 py-1.5 rounded-full border border-[#103646]/20">
                {activeItem.eyebrow}
              </span>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6 text-gray-900">
                {activeItem.heading.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-2">
                    {word.toLowerCase() === 'experiencia' || word.toLowerCase() === 'estándares' || word.toLowerCase() === 'personalizadas' ? (
                      <span className="italic font-bold text-[#D79528]">{word}</span>
                    ) : word}
                  </span>
                ))}
              </h2>

              {/* Subtext */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 font-normal leading-relaxed mb-8 max-w-md">
                {activeItem.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Call to Action Button */}
          <div className="flex gap-4 items-center">
            <a 
              href="/contacto" 
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#103646] text-white hover:bg-[#103646]/90 font-bold uppercase tracking-wider rounded-full text-xs sm:text-sm transition-all duration-300 shadow-xl hover:scale-105"
            >
              Solicitar Información
            </a>
          </div>

        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute overlay) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="grid grid-cols-2 gap-[140px] sm:gap-[380px] md:gap-[540px] lg:gap-[640px] max-w-[1400px] w-full px-4 items-center justify-items-center pointer-events-none">
          
          {/* Column 1 (Left Parallax Column): Cards 1-3 */}
          <motion.div 
            style={{ y: yLeft }}
            className="flex flex-col gap-16 sm:gap-24 md:gap-32 pointer-events-none"
          >
            {IMAGES.slice(0, 3).map((img, idx) => (
              <GalleryCard 
                key={idx}
                url={img.url}
                rotation={img.rotation}
                label={img.label}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </motion.div>

          {/* Column 2 (Right Parallax Column): Cards 4-6 */}
          <motion.div 
            style={{ y: yRight }}
            className="flex flex-col gap-16 sm:gap-24 md:gap-32 pointer-events-none"
          >
            {IMAGES.slice(3, 6).map((img, idx) => (
              <GalleryCard 
                key={idx}
                url={img.url}
                rotation={img.rotation}
                label={img.label}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </motion.div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 bg-white/10 p-2.5 rounded-full"
              aria-label="Cerrar vista"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={selectedImage} 
              alt="Ampliada" 
              className="max-w-full max-h-[85vh] md:max-h-[90vh] rounded-[20px] object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
