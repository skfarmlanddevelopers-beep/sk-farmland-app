import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Image, X, ZoomIn, Compass, ArrowRight, Sparkles } from 'lucide-react';

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
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [dynamicGallery, setDynamicGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          const customImages = data.filter((img: any) => img.image && (img.image.startsWith('/uploads/') || img.image.startsWith('data:image/')));
          setDynamicGallery(customImages);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic gallery', err);
      }
    };
    fetchGallery();
  }, []);

  const combinedGalleryData = [...dynamicGallery];

  return (
    <motion.div
      id="gallery-page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-10 pb-12 pt-4"
    >

      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        id="gallery-hero" className="text-center space-y-4 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4"
      >
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
      </motion.section>

      <section id="gallery-grid-wrapper" className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 space-y-6">

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {combinedGalleryData.map((item: GalleryItem) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[#090909] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                {/* Image Box with Parallax */}
                <ParallaxGalleryImage
                  src={item.image}
                  alt={item.title}
                />


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
              className="relative max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl z-10 flex items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white hover:text-orange-500 p-2 rounded-full transition-all border border-zinc-800/40 z-20"
                aria-label="Close Lightbox"
              >
                <X size={18} />
              </button>

              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Guided Tour Banner */}
      <section id="gallery-cta" className="mx-auto max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-4 text-center">
        <div className="p-6 rounded-2xl bg-zinc-950 border-2 border-orange-600 hover:border-orange-500 transition-colors space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 font-mono flex items-center justify-center gap-1">
            <Sparkles size={11} className="animate-pulse" />
            See It with Your Own Eyes
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">Pictures speak, but walking on-site transforms.</h3>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Don't just browse photos online. Experience the crisp morning breeze, smell the fertile soil, and pick sweet fruits directly from trees on our managed layouts.
          </p>
          {/*  <button
            onClick={onBookClick}
            className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:underline pt-2"
          >
            Schedule Weekend Sightseeing
            <ArrowRight size={13} />
          </button> */}
        </div>
      </section>

    </motion.div>
  );
}
