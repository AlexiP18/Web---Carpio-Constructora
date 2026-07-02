import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, Heart, Star } from 'lucide-react';

const iconMap = {
  Target,
  Eye,
  Heart,
  Star
};

// --- REUSABLE COMPONENTS ---

// 1. LiveProjectButton: Ghost/outline pill button pointing to /proyectos.
export const LiveProjectButton = ({ href = "/proyectos", label = "Ver Proyectos" }) => (
  <a 
    href={href}
    className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-[#D7E2EA] text-[#D7E2EA] font-semibold uppercase tracking-widest rounded-full text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors duration-300 pointer-events-auto"
  >
    {label}
  </a>
);

// 2. ContactButton: Rounded-full pill button with premium gradient and box-shadows.
export const ContactButton = ({ href = "/contacto", label = "Contacto" }) => (
  <a 
    href={href}
    className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl pointer-events-auto"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
      outline: '2px solid white',
      outlineOffset: '-3px',
    }}
  >
    {label}
  </a>
);

// 3. FadeIn: Framer Motion wrapper using whileInView.
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  x = 0, 
  y = 30, 
  as = "div" 
}) => {
  const Component = motion.create(as);
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </Component>
  );
};

// 4. Magnet: Mouse-following magnetic hover effect.
export const Magnet = ({ children, strength = 4 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    const activeRange = Math.max(width, height) / 2 + 60;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < activeRange) {
      setPosition({
        x: distanceX / strength,
        y: distanceY / strength
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

// 5. AnimatedText: Character-by-character scroll-reveal text animation.
export const AnimatedText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });

  const words = text.split(" ");
  const totalChars = text.replace(/\s/g, "").length;
  let charAccumulator = 0;

  return (
    <p ref={ref} className="text-gray-400 text-lg md:text-xl leading-relaxed flex flex-wrap max-w-2xl mx-auto text-center justify-center">
      {words.map((word, wordIdx) => {
        const chars = word.split("");
        return (
          <span key={wordIdx} className="mr-2 mb-1 inline-flex">
            {chars.map((char, charIdx) => {
              const currentIndex = charAccumulator++;
              return (
                <Character 
                  key={charIdx} 
                  char={char} 
                  progress={scrollYProgress} 
                  index={currentIndex} 
                  total={totalChars}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

const Character = ({ char, progress, index, total }) => {
  const start = index / total;
  const end = Math.min(start + 0.15, 1);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-20 text-gray-500">{char}</span>
      <motion.span 
        style={{ opacity }} 
        className="absolute top-0 left-0 text-white font-medium"
      >
        {char}
      </motion.span>
    </span>
  );
};

// --- DATA ---

const PROJECTS_DATA = [
  {
    iconName: "Target",
    projectName: "Nuestra Misión",
    category: "Empresa",
    description: "Ofrecemos soluciones integrales en construcción y diseño, creando espacios modernos, funcionales y de calidad, reflejando el estilo y las necesidades de cada cliente.",
    col1_img1: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_amaranto/1. exterior/1_Exterior_Panoramica",
    col1_img2: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_amaranto/2. interior/5_Interior_jardin",
    col2_img: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_amaranto/1. exterior/0_Exterior_Cerramiento"
  },
  {
    iconName: "Eye",
    projectName: "Nuestra Visión",
    category: "Futuro",
    description: "Ser referentes en construcción y diseño integral, creando proyectos que inspiren bienestar y estilo, fundamentados en la innovación, la excelencia, la ética y el compromiso con nuestros clientes.",
    col1_img1: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_magna/1. exterior/1_Vista_Lateral",
    col1_img2: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_magna/1. exterior/3_Entrada_Principal",
    col2_img: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/casa_magna/1. exterior/0_Vista_Principal"
  },
  {
    iconName: "Heart",
    projectName: "Nuestros Valores",
    category: "Pilares",
    description: "Integridad, innovación, trabajo en equipo y responsabilidad social son los pilares fundamentales que guían cada decisión en nuestra empresa.",
    col1_img1: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/keops/2. interior/2. Lobby_Exterior",
    col1_img2: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/keops/2. interior/3. Lobby_Interior",
    col2_img: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/keops/2. interior/1. Principal"
  },
  {
    iconName: "Star",
    projectName: "Por Qué Elegirnos",
    category: "Experiencia",
    description: "Contamos con más de 8 años de experiencia, un equipo de expertos certificados y un compromiso inquebrantable con la satisfacción del cliente.",
    col1_img1: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/arrayanes_ficoa/2. interior/2_Sala",
    col1_img2: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/arrayanes_ficoa/1. exterior/5_Area_Recreacional",
    col2_img: "https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/carpio-constructora/projects/arrayanes_ficoa/1. exterior/0_Vista_Exterior"
  }
];

// --- CARD STACKING ITEM COMPONENT ---

interface ProjectCardProps {
  index: number;
  iconName: string;
  projectName: string;
  category: string;
  description: string;
  col1_img1: string;
  col1_img2: string;
  col2_img: string;
  progress: any;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  index,
  iconName,
  projectName,
  category,
  description,
  col1_img1,
  col1_img2,
  col2_img,
  progress,
  totalCards
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  // Scale down card as scroll progresses further
  const scale = useTransform(progress, [index * 0.22, 1], [1, targetScale]);
  const IconComponent = iconMap[iconName] || Target;

  return (
    <div className="sticky top-24 md:top-32 h-[85vh] flex items-center justify-center w-full z-20 pointer-events-none">
      <motion.div
        style={{
          scale,
          top: `calc(6rem + ${index * 28}px)`,
        }}
        className="w-full max-w-5xl border-2 border-[#D7E2EA] bg-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between h-[75vh] md:h-[70vh] pointer-events-auto"
      >
        {/* Card Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4 sm:pb-6">
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
            {/* Icon instead of number */}
            <div className="text-[#D7E2EA]/30 flex-shrink-0">
              <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.5]" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold mb-1">
                {category}
              </span>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                {projectName}
              </h4>
              {description && (
                <p className="text-xs sm:text-sm text-gray-400 mt-2 font-normal leading-relaxed max-w-xl">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          <div className="self-end sm:self-auto flex-shrink-0">
            <Magnet>
              <LiveProjectButton label="Ver Proyectos" />
            </Magnet>
          </div>
        </div>

        {/* Card Bottom Row: Two-Column Image Grid */}
        <div className="grid grid-cols-[40%_60%] gap-4 sm:gap-6 mt-4 sm:mt-6 flex-1 overflow-hidden">
          {/* Left Column (40%) - Stacked images */}
          <div className="flex flex-col gap-4 sm:gap-6 justify-between h-full">
            <div className="w-full overflow-hidden rounded-[25px] sm:rounded-[35px] md:rounded-[45px] h-[48%] relative">
              <img 
                src={col1_img1} 
                alt={`${projectName} detail 1`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ height: '100%' }}
              />
            </div>
            <div className="w-full overflow-hidden rounded-[25px] sm:rounded-[35px] md:rounded-[45px] h-[48%] relative">
              <img 
                src={col1_img2} 
                alt={`${projectName} detail 2`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ height: '100%' }}
              />
            </div>
          </div>

          {/* Right Column (60%) - One tall image */}
          <div className="w-full h-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] relative">
            <img 
              src={col2_img} 
              alt={`${projectName} main`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN PROJECTS SECTION ---

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      ref={containerRef}
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* Animated Headline */}
        <div className="text-center mb-16 sm:mb-24">
          <FadeIn y={40}>
            <h2 
              className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter uppercase mb-6 inline-block"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nuestra Empresa
            </h2>
          </FadeIn>
          <AnimatedText text="Descubre la esencia de Constructora Carpio. Conoce los pilares que impulsan nuestro trabajo diario y la pasión por edificar proyectos extraordinarios con calidad y rigor técnico." />
        </div>

        {/* Stacking Cards List */}
        <div className="relative pb-[10vh]">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard 
              key={idx}
              index={idx}
              totalCards={PROJECTS_DATA.length}
              progress={scrollYProgress}
              {...project}
            />
          ))}
        </div>

        {/* Footer Contact CTA Button */}
        <div className="flex justify-center mt-12 sm:mt-20">
          <Magnet>
            <ContactButton label="Contáctanos" />
          </Magnet>
        </div>

      </div>
    </section>
  );
}
