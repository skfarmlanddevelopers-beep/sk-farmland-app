import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Calendar } from 'lucide-react';

import project1_1 from '../assets/project1 (1).jpeg';
import project1_2 from '../assets/project1 (2).jpeg';
import project1_3 from '../assets/project1 (3).jpeg';
import project1_4 from '../assets/project1 (4).jpeg';
import project1_5 from '../assets/project1 (5).jpeg';
import project1_6 from '../assets/project1 (6).jpeg';
import project1_7 from '../assets/project1 (7).jpeg';
import project1_8 from '../assets/project1 (8).jpeg';

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
  return (
    <motion.div
      id="projects-page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6 pb-12 pt-6 max-w-6xl mx-auto px-4"
    >
      <div className="text-left space-y-3 mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Projects
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Experience premium farmland living with thoughtfully planned infrastructure, natural surroundings, and modern amenities.
        </p>
      </div>

      <div className="bg-[#090909] border-2 border-orange-600 rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-orange-500 transition-colors">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Project 1</h3>
        
        <div className="mb-8">
          <HeroCarousel
            images={[project1_1, project1_2, project1_3, project1_4, project1_5, project1_6, project1_7, project1_8]}
            labels={Array(8).fill("Project 1")}
            yBounce={[0, 0, 0]}
            className="!aspect-[16/9] md:!aspect-[16/10] max-h-[700px]"
          />
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold text-orange-500 flex items-center gap-2">
            🌿 Project Highlights
          </h4>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-zinc-300">
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> 350 Acres of premium farmland with 550 plots available in various sizes.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Grand entrance arch with an elegant main gate.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> 24×7 security for a safe and secure environment.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Individual water connection provided to every plot.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Wide cement concrete main roads and well-laid internal roads.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Street lighting throughout the project.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Front picket compound fencing provided for every plot.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> 
              <div>
                <span className="font-semibold text-white">4-Acre Clubhouse featuring:</span>
                <ul className="ml-4 mt-2 space-y-1 text-zinc-400">
                  <li>• Indoor &amp; outdoor games</li>
                  <li>• Horse riding</li>
                  <li>• Restaurant</li>
                  <li>• Temple and peaceful meditation hall.</li>
                </ul>
              </div>
            </li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Plantation of 40+ varieties of trees, including Mango, Sapota, Jackfruit, Coconut, Teak, Silver Oak, and more.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Organic farming guidance and support to help you cultivate your own produce.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Close to popular tourist attractions like Muthyala Maduvu Waterfalls (Pearl Valley) and Pearl Valley Dam.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Peaceful environment surrounded by beautiful mountain views.</li>
            <li className="flex items-start gap-2"><Check className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" /> Excellent connectivity to Anekal, Chandapura, Electronic City, Bannerghatta Road, Kanakapura Road, and Hosur.</li>
          </ul>

          <div className="mt-8 p-6 bg-zinc-950/80 border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-xl flex flex-col md:flex-row gap-6 justify-between items-center">
            <div>
              <h5 className="text-lg font-bold text-white mb-1">Pricing</h5>
              <p className="text-orange-400 font-semibold text-xl">₹849 per sq. ft. <span className="text-sm text-zinc-500 font-normal">(Slightly Negotiable)</span></p>
            </div>
            <div className="text-left md:text-right">
              <h5 className="text-lg font-bold text-white mb-1">Bank Loan</h5>
              <p className="text-zinc-400 font-medium">Not Available</p>
            </div>
          </div>


        </div>
      </div>
    </motion.div>
  );
}
