import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { House, Storefront, Buildings, Briefcase, ArrowRight } from 'lucide-react';

interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  backgroundImage: string;
  images?: string[];
}

interface MobileProjectsStackProps {
  projects: ProjectItem[];
}

const getTagIcon = (tag: string) => {
  const t = (tag || '').toLowerCase();
  if (t.includes('residencial') || t.includes('unifamiliar') || t.includes('casa')) return House;
  if (t.includes('retail') || t.includes('comercial') || t.includes('local')) return Storefront;
  if (t.includes('conjunto') || t.includes('multifamiliar') || t.includes('edificio')) return Buildings;
  return Briefcase;
};

const ProjectCardMobile: React.FC<{
  index: number;
  totalCards: number;
  progress: any;
  project: ProjectItem;
}> = ({ index, totalCards, progress, project }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scale = useTransform(
    progress,
    [index / totalCards, 1],
    [1, targetScale]
  );

  const firstTag = project.tags?.[0] || "Proyecto";
  const TagIcon = getTagIcon(firstTag);
  const img1 = project.backgroundImage;
  const img2 = project.images?.[0] || img1;

  return (
    <div className="sticky top-20 flex items-center justify-center w-full z-20 pointer-events-none mb-12">
      <motion.div
        style={{
          scale,
          top: `calc(5rem + ${index * 20}px)`,
        }}
        className="w-full border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] rounded-[32px] sm:rounded-[40px] p-5 sm:p-7 shadow-2xl flex flex-col justify-between pointer-events-auto"
      >
        {/* Card Header Row */}
        <div className="flex flex-col gap-3 border-b border-gray-800/80 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#D79528] text-white text-[11px] font-black rounded-full uppercase tracking-wider shadow-md select-none">
              <TagIcon className="w-3.5 h-3.5" />
              <span>{firstTag}</span>
            </div>
            <a 
              href={`/proyecto/${project.slug}`} 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#D79528] text-[#D79528] hover:bg-[#D79528] hover:text-white font-semibold uppercase tracking-wider rounded-full text-xs transition-colors duration-300"
            >
              <span>Ver Proyecto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
            {project.title}
          </h3>

          {project.description && (
            <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed line-clamp-3">
              {project.description}
            </p>
          )}
        </div>

        {/* Card Body: Two-Column Image Grid */}
        <div className="grid grid-cols-[40%_60%] gap-3 mt-4 h-[190px] sm:h-[220px] overflow-hidden">
          {/* Left Column (40%) - Two stacked images */}
          <div className="flex flex-col gap-3 justify-between h-full">
            <div className="w-full overflow-hidden rounded-[18px] h-[48%] relative">
              <img 
                src={img1} 
                alt={`${project.title} 1`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full overflow-hidden rounded-[18px] h-[48%] relative">
              <img 
                src={img2} 
                alt={`${project.title} 2`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column (60%) - One main tall image */}
          <div className="w-full h-full overflow-hidden rounded-[22px] relative">
            <img 
              src={img1} 
              alt={`${project.title} main`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function MobileProjectsStack({ projects }: MobileProjectsStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative z-10 w-full lg:hidden pb-12">
      {projects.map((project, idx) => (
        <ProjectCardMobile
          key={project.slug || idx}
          index={idx}
          totalCards={projects.length}
          progress={scrollYProgress}
          project={project}
        />
      ))}
    </div>
  );
}
