import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Image, X, ZoomIn, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { galleryData } from '../data';
import { GalleryItem } from '../types';

interface GalleryProps {
  onBookClick: () => void;
}

function ParallaxGalleryImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={containerRef} className="aspect-4/3 relative overflow-hidden bg-zinc-950">
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        style={{ y }}
        className="absolute -top-[10%] left-0 w-full h-[120%] object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-all pointer-events-none" />
      
      {/* Zoom indicator on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-orange-600/80 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
          <ZoomIn size={16} />
        </div>
      </div>
    </div>
  );
}

export default function Gallery({ onBookClick }: GalleryProps) {
  const [filter, setFilter] = useState<'All' | 'Land' | 'Farmhouse' | 'Crops' | 'Entrance'>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = galleryData.filter((item) => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <div
      id="gallery-page-container"
      className="space-y-10 pb-12 pt-4"
    >
      
      {/* Header */}
      <section id="gallery-hero" className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 font-mono text-[10px] uppercase tracking-widest">
          <Image size={11} />
          Visual Showcase
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Experience the Beautiful Nature Living
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Take a look through our real project sites. See our manicured stone paths, automated drip fruit trees, premium gated entrance gates, and eco farm cottages.
        </p>
      </section>

      {/* Category filters */}
      <section id="gallery-grid-wrapper" className="mx-auto max-w-5xl px-4 space-y-6">
        
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['All', 'Land', 'Farmhouse', 'Crops', 'Entrance'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                filter === cat
                  ? 'bg-orange-600 border-orange-600 text-white'
                  : 'bg-[#0E0E0E] border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
              }`}
            >
              {cat === 'All' ? 'All Images' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: GalleryItem) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[#090909] border border-zinc-900 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                {/* Image Box with Parallax */}
                <ParallaxGalleryImage
                  src={item.image}
                  alt={item.title}
                />

                {/* Info Overlay Panel */}
                <div className="p-4 space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-orange-400 font-mono">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed truncate">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl w-full bg-[#0E0E0E] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white hover:text-orange-500 p-2 rounded-full transition-all border border-zinc-800/40 z-20"
                aria-label="Close Lightbox"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Left side Image */}
                <div className="md:col-span-8 bg-black flex items-center justify-center aspect-video md:aspect-auto md:h-[500px]">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right side Detail details */}
                <div className="md:col-span-4 p-6 flex flex-col justify-between space-y-6 bg-[#0B0B0B] border-t md:border-t-0 md:border-l border-zinc-900">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono rounded-md inline-block">
                        {selectedImage.category} Collection
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight pt-1.5">{selectedImage.title}</h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {selectedImage.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Status check:</p>
                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>100% Ready on Site</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions inside modal */}
                  <div className="space-y-3 pt-6 border-t border-zinc-900">
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        onBookClick();
                      }}
                      className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg shadow-md transition-all cursor-pointer"
                    >
                      Book Tour of Site
                    </button>
                    
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="w-full bg-zinc-900 border border-zinc-800 hover:text-white text-zinc-400 text-xs font-semibold uppercase py-3 rounded-lg transition-colors cursor-pointer"
                    >
                      Back to Gallery
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Guided Tour Banner */}
      <section id="gallery-cta" className="mx-auto max-w-4xl px-4 text-center">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 font-mono flex items-center justify-center gap-1">
            <Sparkles size={11} className="animate-pulse" />
            See It with Your Own Eyes
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">Pictures speak, but walking on-site transforms.</h3>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Don\'t just browse photos online. Experience the crisp morning breeze, smell the fertile soil, and pick sweet fruits directly from trees on our managed layouts. Complete pickups arranged.
          </p>
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:underline pt-2"
          >
            Schedule Weekend Sightseeing
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

    </div>
  );
}
