import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { HelpCircle, Clock, CheckCircle, Shield, Sliders, Layout as LayoutIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const iconMap = {
  HelpCircle,
  Clock,
  CheckCircle,
  Shield,
  Sliders,
  LayoutIcon
};

const FAQS_DATA = [
  {
    category: "Servicios",
    iconName: "HelpCircle",
    question: "¿Qué servicios de construcción ofrecen?",
    answer: "Ofrecemos soluciones integrales de construcción residencial y comercial, que incluyen diseño arquitectónico, diseño interior, remodelaciones, ampliaciones y asesoría técnica especializada."
  },
  {
    category: "Tiempos",
    iconName: "Clock",
    question: "¿Cuánto toma completar un proyecto?",
    answer: "El tiempo de ejecución depende de la complejidad y alcance. Nuestro equipo realiza una planificación detallada inicial para asegurar plazos realistas, eficientes y cumplidos."
  },
  {
    category: "Modalidad",
    iconName: "CheckCircle",
    question: "¿Trabajan con proyectos llave en mano?",
    answer: "Sí, nos encargamos de todo el proceso: desde el diseño y la planificación hasta la construcción y entrega final, garantizando tranquilidad y comodidad absoluta para nuestros clientes."
  },
  {
    category: "Personalización",
    iconName: "Sliders",
    question: "¿Puedo personalizar mis planos?",
    answer: "Absolutamente. Adaptamos planos existentes o desarrollamos un diseño totalmente nuevo para que tu obra comercial o residencial refleje al 100% tus necesidades y visión arquitectónica."
  },
  {
    category: "Normas",
    iconName: "Shield",
    question: "¿Cumplen con las normas locales?",
    answer: "Sí, todos nuestros proyectos cumplen estrictamente con los códigos de construcción, regulaciones ambientales y normativas de seguridad vigentes en el país."
  },
  {
    category: "Diseño",
    iconName: "LayoutIcon",
    question: "¿Ofrecen solo planos o también construyen?",
    answer: "Ofrecemos servicios altamente flexibles: podemos encargarnos exclusivamente del diseño arquitectónico, de la dirección técnica, o de la ejecución y construcción completa de la obra."
  }
];

// --- INDIVIDUAL FAQ CARD COMPONENT ---

interface CardProps {
  index: number;
  faq: typeof FAQS_DATA[0];
  translateX: any;
  containerWidth: number;
}

const FAQCard: React.FC<CardProps> = ({ index, faq, translateX, containerWidth }) => {
  const cardWidth = 340; 
  const cardSpacing = 380; 
  const cardCenterOffset = index * cardSpacing;
  const IconComponent = iconMap[faq.iconName] || HelpCircle;

  // Calculate 3D rotations, scales, depth Z, and opacity based on animated horizontal viewport position
  const rotateY = useTransform(translateX, (value: number) => {
    const screenX = cardCenterOffset + value;
    const distance = screenX - (containerWidth / 2 - cardWidth / 2);
    const rot = -distance * 0.08; 
    return Math.min(Math.max(rot, -28), 28); 
  });

  const scale = useTransform(translateX, (value: number) => {
    const screenX = cardCenterOffset + value;
    const distance = screenX - (containerWidth / 2 - cardWidth / 2);
    const absDist = Math.abs(distance);
    const sc = 1 - absDist * 0.0003;
    return Math.max(sc, 0.88); 
  });

  const translateZ = useTransform(translateX, (value: number) => {
    const screenX = cardCenterOffset + value;
    const distance = screenX - (containerWidth / 2 - cardWidth / 2);
    const absDist = Math.abs(distance);
    return -absDist * 0.15; 
  });

  const opacity = useTransform(translateX, (value: number) => {
    const screenX = cardCenterOffset + value;
    const distance = screenX - (containerWidth / 2 - cardWidth / 2);
    const absDist = Math.abs(distance);
    const op = 1 - absDist * 0.0006;
    return Math.max(op, 0.45); 
  });

  return (
    <motion.div
      style={{
        rotateY,
        scale,
        z: translateZ,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className="w-[300px] sm:w-[340px] h-[380px] sm:h-[430px] bg-[#0E0E0E] border border-white/10 hover:border-[#D79528]/40 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(215,149,40,0.02)] backdrop-blur-lg select-none flex-shrink-0 transition-colors duration-300"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D79528] font-bold font-mono">
            Pregunta {index + 1} • {faq.category}
          </span>
          <div className="text-white/20">
            <IconComponent className="w-5 h-5 stroke-[1.5]" />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-6 leading-tight">
          {faq.question}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mt-4 line-clamp-6">
          {faq.answer}
        </p>
      </div>
      
      <div className="border-t border-white/5 pt-4 flex items-center justify-between">
        <span className="text-[9px] tracking-[0.25em] text-white/20 uppercase font-mono">
          Constructora Carpio
        </span>
        <div className="w-7 h-7 bg-[#D79528]/10 rounded-full flex items-center justify-center border border-[#D79528]/20">
          <svg className="w-3.5 h-3.5 text-[#D79528]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN ARROW-CONTROLLED FAQ CAROUSEL ---

export default function ServiciosFAQReact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Motion value to continuously track translation so children can react dynamically
  const translateX = useMotionValue(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    setContainerWidth(width);
    
    // Jump to initial position immediately on mount
    const cardWidthHalf = 170; // 340 / 2
    const target = width / 2 - (currentIndex * 380 + cardWidthHalf);
    translateX.set(target);

    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate translation smoothly when currentIndex or containerWidth changes
  useEffect(() => {
    if (containerWidth === 0) return;
    const cardWidthHalf = 170;
    const target = containerWidth / 2 - (currentIndex * 380 + cardWidthHalf);
    
    animate(translateX, target, {
      type: "spring",
      stiffness: 60,
      damping: 25,
      mass: 1.2
    });
  }, [currentIndex, containerWidth]);

  const nextCard = () => {
    setCurrentIndex(prev => Math.min(FAQS_DATA.length - 1, prev + 1));
  };

  const prevCard = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-16 md:py-24 overflow-hidden select-none bg-[#050505] rounded-b-[40px] sm:rounded-b-[50px] md:rounded-b-[60px]"
      style={{ perspective: "1500px" }}
    >
      {/* Background gold/yellow glow matching the branding */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[400px] bg-[#D79528]/5 rounded-full blur-[100px] sm:blur-[160px] -z-10 pointer-events-none"></div>

      {/* 3D Transform Row Container */}
      <motion.div
        style={{
          x: translateX,
          transformStyle: "preserve-3d",
        }}
        className="flex gap-10 items-center h-[460px] sm:h-[500px]"
      >
        {FAQS_DATA.map((faq, idx) => (
          <FAQCard 
            key={idx}
            index={idx}
            faq={faq}
            translateX={translateX}
            containerWidth={containerWidth}
          />
        ))}
      </motion.div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 sm:px-12 pointer-events-none">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#103646]/80 hover:bg-[#103646] border border-white/10 hover:border-[#D79528]/50 text-white flex items-center justify-center pointer-events-auto transition-all disabled:opacity-30 disabled:pointer-events-none backdrop-blur-md shadow-xl"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <button
          onClick={nextCard}
          disabled={currentIndex === FAQS_DATA.length - 1}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#103646]/80 hover:bg-[#103646] border border-white/10 hover:border-[#D79528]/50 text-white flex items-center justify-center pointer-events-auto transition-all disabled:opacity-30 disabled:pointer-events-none backdrop-blur-md shadow-xl"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>

      {/* Decorative indicator dots */}
      <div className="flex justify-center items-center gap-2 mt-8 sm:mt-12 pointer-events-none">
        {FAQS_DATA.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "w-6 bg-[#D79528]" : "w-2 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
