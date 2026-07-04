import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Calendar } from 'lucide-react';



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
          const formattedData = data.map((proj: any) => ({
            ...proj,
            images: typeof proj.images === 'string' ? JSON.parse(proj.images) : proj.images,
            highlights: typeof proj.highlights === 'string' ? JSON.parse(proj.highlights) : proj.highlights,
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
          Projects
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl leading-relaxed">
          Experience premium farmland living with thoughtfully planned infrastructure, natural surroundings, and modern amenities.
        </p>
      </div>

      {projects.length > 0 ? (
        projects.map((project, idx) => (
          <motion.div 
            key={project.id} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              scale: 1.02, 
              rotateX: 2, 
              rotateY: -2, 
              boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)"
            }}
            style={{ perspective: 1000 }}
            className="bg-[#090909] border-2 border-orange-600 rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-orange-500 transition-colors"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">{project.name}</h3>
            
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
                {project.highlights && project.highlights.map((highlight: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> 
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {( (project.price && project.price.trim() !== '') || (project.bank_loan && project.bank_loan.trim() !== '') ) && (
                <div className="mt-8 p-6 bg-zinc-950/80 border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-xl flex flex-col md:flex-row gap-6 justify-between items-center">
                  <div>
                    <h5 className="text-lg font-bold text-white mb-1">Pricing</h5>
                    <p className="text-orange-400 font-semibold text-xl">{project.price || 'Contact for price'}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <h5 className="text-lg font-bold text-white mb-1">Bank Loan</h5>
                    <p className="text-zinc-400 font-medium">{project.bank_loan || 'Not Available'}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-20 text-zinc-500">
          <p>No projects available at the moment. Please check back later.</p>
        </div>
      )}
    </motion.div>
  );
}
