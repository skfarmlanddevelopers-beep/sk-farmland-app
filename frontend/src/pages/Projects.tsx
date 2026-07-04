import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Calendar } from 'lucide-react';
import AnimatedReveal from '../components/AnimatedReveal';
import AnimatedText from '../components/AnimatedText';



interface HeroCarouselProps {
  images: string[];
  labels: string[];
  yBounce: number[];
  className?: string;
}

function HeroCarousel({ images, labels, yBounce, className = "" }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <motion.div
      animate={{ y: yBounce }}
      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      className={`w-full rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] aspect-[16/10] relative group z-10 bg-black ${className}`}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={labels[currentIndex] || "Premium Farmland Project"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </AnimatePresence>

      {/* Soft premium shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
    </motion.div>
  );
}

interface ProjectsProps {
  onBookClick: (projectName?: string) => void;
}

export default function Projects({ onBookClick }: ProjectsProps) {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?all=true');
        if (response.ok) {
          const data = await response.json();
          // Parse JSON fields
          const safeParse = (str: any) => {
            if (typeof str !== 'string') return str;
            try { return JSON.parse(str); } catch (e) { return []; }
          };

          const formattedData = data.map((proj: any) => ({
            ...proj,
            images: safeParse(proj.images),
            highlights: safeParse(proj.highlights),
          }));
          setProjects(formattedData);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <motion.div
      id="projects-page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6 pb-12 pt-6 max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] mx-auto px-4"
    >
      <div className="text-left space-y-3 mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          <AnimatedText type="words" text="Projects" />
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl leading-relaxed">
          <AnimatedText type="typing" duration={2} text="Experience premium farmland living with thoughtfully planned infrastructure, natural surroundings, and modern amenities." />
        </p>
      </div>

      {projects.length > 0 ? (
        projects.map((project, idx) => (
          <AnimatedReveal
            key={project.id}
            type="3d-flip-x"
            delay={idx * 0.15}
            duration={0.9}
            className="w-full"
          >
            <motion.div 
              whileHover={{ 
                scale: 1.02, 
                rotateX: 2, 
                rotateY: -2, 
                boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)"
              }}
              className="bg-[#090909] border-2 border-orange-600 rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-orange-500 transition-colors w-full"
            >
            <div className="mb-6 flex flex-col gap-1">
              {project.heading && <span className="text-orange-500 font-bold uppercase tracking-wider text-2xl sm:text-3xl">{project.heading}</span>}
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{project.name}</h3>
              {project.sub_heading && <p className="text-zinc-400 font-bold text-2xl sm:text-3xl">{project.sub_heading}</p>}
            </div>
            
            {project.images && project.images.length > 0 && (
              <div className="mb-8">
                <HeroCarousel
                  images={project.images}
                  labels={Array(project.images.length).fill(project.name)}
                  yBounce={[0, 0, 0]}
                  className="!aspect-[4/3] md:!aspect-[16/10] max-h-[700px]"
                />
              </div>
            )}

            <div className="space-y-6">
              <h4 className="text-xl font-bold text-orange-500 flex items-center gap-2">
                🌿 Project Highlights
              </h4>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-zinc-300">
                {project.highlights && project.highlights.map((highlight: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> 
                    <span>{typeof highlight === "object" && highlight !== null ? ((highlight as any).heading ? (highlight as any).heading + ": " + (highlight as any).text : (highlight as any).text) : highlight}</span>
                  </li>
                ))}
              </ul>

              {( (project.price && project.price.trim() !== '') || (project.bank_loan && project.bank_loan.trim() !== '') ) && (
                <div className="mt-8 p-6 md:p-8 bg-zinc-950/80 border-2 border-orange-600/50 hover:border-orange-500 transition-all rounded-2xl flex flex-col md:flex-row gap-8 md:gap-6 justify-between items-center shadow-xl">
                  <div className="text-center md:text-left flex-1">
                    <h5 className="text-sm md:text-base font-bold text-zinc-400 uppercase tracking-widest mb-2">Pricing</h5>
                    <p className="text-orange-400 font-black text-2xl md:text-4xl drop-shadow-lg">{project.price || 'Contact for price'}</p>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-orange-600/30"></div>
                  <div className="text-center md:text-right flex-1">
                    <h5 className="text-sm md:text-base font-bold text-zinc-400 uppercase tracking-widest mb-2">Bank Loan</h5>
                    <p className="text-white font-bold text-xl md:text-2xl">{project.bank_loan || 'Not Available'}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatedReveal>
        ))
      ) : (
        <div className="text-center py-20 text-zinc-500">
          <p>No projects available at the moment. Please check back later.</p>
        </div>
      )}
    </motion.div>
  );
}
