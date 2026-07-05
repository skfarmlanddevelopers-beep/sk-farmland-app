import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, animate } from 'motion/react';
import { Leaf, Award, Map, Users, Home as HomeIcon, Check, Calendar, MessageCircle } from 'lucide-react';
import { PageId } from '../types';
import { statsData } from '../data';
import AnimatedReveal from '../components/AnimatedReveal';
import AnimatedText from '../components/AnimatedText';
import heroTop from '../assets/hero-top.jpg';
import heroBottom from '../assets/hero-bottom.jpg';
import gallery1 from '../assets/gallery-1.jpeg';
import gallery2 from '../assets/gallery-2.jpeg';



interface HeroCarouselProps {
  images: string[];
  labels: string[];
  yBounce: number[];
  className?: string;
  children?: React.ReactNode;
}

function HeroCarousel({ images, labels, yBounce, className = "", children }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] aspect-[16/10] relative group z-10 bg-black ${className}`}
    >
      <AnimatePresence initial={false}>
        {images.length > 0 ? (
          <motion.div key={currentIndex} className="absolute inset-0 w-full h-full">
            <motion.img
              src={images[currentIndex]}
              alt={labels[currentIndex] || "Premium Farmland Project"}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.2 }, scale: { duration: 8, ease: "linear" } }}
              className="absolute inset-0 w-full h-full object-cover origin-center"
            />

          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm">
            No image available
          </div>
        )}
      </AnimatePresence>

      {/* Soft premium shadow overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none z-20 ${children ? 'from-black/90 via-black/60 to-black/40' : 'from-black/60 via-transparent to-transparent'}`} />

      {children && (
        <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center p-4 sm:p-6 bg-black/20">
          {children}
        </div>
      )}
    </div>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numValue = parseInt(value.replace(/,/g, '').replace('+', ''), 10);
  const suffix = value.includes('+') ? '+' : '';

  useEffect(() => {
    if (isInView && ref.current && !isNaN(numValue)) {
      const controls = animate(0, numValue, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(v)) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

interface HomeProps {
  setActivePage: (page: PageId) => void;
  onBookClick: () => void;
}

export default function Home({ setActivePage, onBookClick }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yLeft = useTransform(heroScroll, [0, 1], ["0%", "15%"]);
  const yRight = useTransform(heroScroll, [0, 1], ["0%", "25%"]);

  const [dynamicLeftImages, setDynamicLeftImages] = useState<string[]>([]);
  const [dynamicRightImages, setDynamicRightImages] = useState<string[]>([]);
  const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await fetch('/api/hero-images');
        if (response.ok) {
          const data = await response.json();
          const lefts = data.filter((img: any) => img.side === 'left').map((img: any) => img.image_path);
          const rights = data.filter((img: any) => img.side === 'right').map((img: any) => img.image_path);
          setDynamicLeftImages(lefts);
          setDynamicRightImages(rights);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic hero images:', err);
      }
    };
    
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?home=true&t=${new Date().getTime()}`, { cache: 'no-store' });
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
          setDynamicProjects(formattedData);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchHeroImages();
    fetchProjects();
  }, []);


  const finalLeftImages = dynamicLeftImages;
  const finalLeftLabels = dynamicLeftImages.length > 0 ? Array(dynamicLeftImages.length).fill("SK Farmland Community") : [];

  const finalRightImages = dynamicRightImages;
  const finalRightLabels = dynamicRightImages.length > 0 ? Array(dynamicRightImages.length).fill("Premium Lifestyle") : [];

  // Animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const iconMap = (iconName: string) => {
    switch (iconName) {
      case 'Map': return <Map className="text-orange-500 w-6 h-6 stroke-[1.5]" />;
      case 'Users': return <Users className="text-orange-500 w-6 h-6 stroke-[1.5]" />;
      case 'Leaf': return <Leaf className="text-orange-500 w-6 h-6 stroke-[1.5]" />;
      case 'Home': return <HomeIcon className="text-orange-500 w-6 h-6 stroke-[1.5]" />;
      case 'Award': return <Award className="text-orange-500 w-6 h-6 stroke-[1.5]" />;
      default: return <Leaf className="text-orange-500 w-6 h-6" />;
    }
  };

  return (
    <motion.div
      id="home-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-12"
    >

      {/* 1. Hero / Splash Section */}
      <section ref={heroRef} id="hero-section" className="relative overflow-hidden pt-4 pb-4">
        {/* Ambient radial orange glow background decoration */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] px-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pt-0">

          {/* Top Hero Image Column: Infrastructure Carousel */}
          <motion.div style={{ y: yLeft }}>
            <HeroCarousel
              images={finalLeftImages}
              labels={finalLeftLabels}
              yBounce={[0, -6, 0]}
            >
            </HeroCarousel>
          </motion.div>

          {/* Bottom Hero Image Column: Scenic/Community Carousel */}
          <motion.div style={{ y: yRight }}>
            <HeroCarousel
              images={finalRightImages}
              labels={finalRightLabels}
              yBounce={[0, 6, 0]}
            />
          </motion.div>

        </div>
      </section>

      {/* 2. Trust Stats Strip */}
      <AnimatedReveal type="3d-flip-x" delay={0.2} duration={0.9} className="relative z-10 px-4">
        <div className="mx-auto max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] bg-[#090909] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="text-left mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 font-mono">
              <AnimatedText type="words" text="Our Legacy in Figures" />
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              <AnimatedText type="typing" text="Trusted by Families & Investors across India" />
            </h2>
          </div>

          <div className="w-full relative mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 py-2">
              {statsData.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-5 bg-zinc-950/60 rounded-xl border-2 border-amber-500 w-full"
                >
                  <div
                    className="p-3 bg-amber-500/10 rounded-full border border-amber-500/30 mb-3 text-amber-500"
                  >
                    {iconMap(stat.icon)}
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  <span className="text-[10px] sm:text-xs text-zinc-500 mt-2 uppercase font-semibold tracking-wide text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedReveal>

      {/* Section 1: Own Your Dream Farmland */}
      <AnimatedReveal type="slide" direction="up" delay={0.1} duration={0.8} className="mx-auto max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] px-4 py-4 space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 rounded-full border border-white text-orange-400 font-mono text-xs uppercase tracking-widest">
          <Leaf size={14} className="animate-pulse" />
          <AnimatedText text="Own Your Dream Farmland" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase flex flex-wrap gap-x-3 gap-y-2 mt-4 text-white">
          <AnimatedText text="Lifestyle | Investment | Extra Income Opportunity" />
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed text-left max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
          <p>
            <AnimatedText type="typing" text="Premium farmland projects available near to Anekal Thalli Road towards Hoganekkal Road & which are very near to Electronic City, Jigani, Chandapur, Bannerghatta road, Kanakapura Road & Hosur (peaceful & high-growth location)." duration={2} />
          </p>
          <p>
            <AnimatedText type="typing" text="At SK Farmland Developers, we offer farmland solutions designed for personal use, investment, and income generation. Whether you want peaceful living in nature or long-term returns, we make the process simple, secure, and transparent." duration={2} />
          </p>
        </div>
      </AnimatedReveal>

      {/* Section 2: Experience True Nature Living */}
      <AnimatedReveal type="slide" direction="left" delay={0.2} duration={0.8} className="mx-auto max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] px-4 py-4">
        <div className="bg-zinc-950 border-2 border-orange-600 rounded-2xl p-6 md:p-10 hover:border-orange-500 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] relative overflow-hidden group">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/20 transition-all duration-700" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-6 flex flex-wrap gap-x-2 text-white">
            <span className="text-2xl sm:text-4xl mr-2">🌄</span>
            <AnimatedText text="Experience True Nature Living" />
          </h2>
          <div className="space-y-5 text-sm sm:text-base text-zinc-400 leading-relaxed relative z-10">
            <p><AnimatedText type="typing" text="Imagine living far away from the hustle and bustle of the city — surrounded by pure nature, undisturbed, and completely free from pollution." duration={1.5} /></p>
            <p><AnimatedText type="typing" text="Wake up to the sound of birds, breathe in fresh air, and enjoy wide open spaces where you can grow your own food, walk among greenery, and reconnect with a healthier lifestyle." duration={2} delay={0.5} /></p>
            <p><AnimatedText type="typing" text="Our farmland is ideal for cultivating crops such as mango, guava, papaya, banana, sugarcane, vegetables, and seasonal grains, supported by fertile soil and water availability." duration={2} delay={1.0} /></p>
            <p><AnimatedText type="typing" text="You can also keep animals like chickens, cows, dogs, sheep, goats, or birds, making your land not just an investment—but a complete countryside experience." duration={2} delay={1.5} /></p>
          </div>
        </div>
      </AnimatedReveal>

      {/* Section 3: What We Offer */}
      <AnimatedReveal type="slide" direction="up" delay={0.2} duration={0.8} className="mx-auto max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] px-4 py-6 space-y-6">
        <div className="text-left space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-2xl">🌱</span> <AnimatedText text="What We Offer" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatedReveal type="3d-flip-x" delay={0.3} className="h-full">
            <div className="bg-zinc-950 border-2 border-orange-600 rounded-2xl p-6 hover:border-orange-500 transition-colors h-full">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                🏡 <AnimatedText text="Farmland" />
              </h3>
              <div className="h-px w-full bg-orange-600 my-4" />
              <p className="text-sm text-zinc-300 font-semibold mb-4">
                <AnimatedText text="Plot Size Starts From 0.25 Quarter Acre, 0.5 Half Acre, or 1–2 Acres)" />
              </p>
              <p className="text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AnimatedText text="One Plot – One Owner – Complete Freedom" />
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal type="3d-flip-x" delay={0.5} className="h-full">
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-orange-600 rounded-2xl p-6 shadow-[0_0_20px_rgba(249,115,22,0.1)] relative hover:border-orange-500 transition-colors h-full">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-orange-500 text-white border border-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                Hassle-Free Option
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                🌾 <AnimatedText text="Managed Farmland" />
              </h3>
              <div className="h-px w-full bg-orange-600 my-4" />
              <ul className="space-y-3 text-sm text-zinc-400">
                {['Maintenance, plantation & basic upkeep handled', '35 plants with drip irrigation system', 'Individual water connection for each plot', 'Picket compound fencing in front of each plot for better layout appearance', '24/7 security', 'Internal Access Road', 'Cement Concrete Roads', 'Solar street lights', 'Ideal for investment without daily involvement'].map((f, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="leading-tight"><AnimatedText text={f} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedReveal>

          <AnimatedReveal type="3d-flip-x" delay={0.7} className="h-full">
            <div className="bg-zinc-950 border-2 border-orange-600 rounded-2xl p-6 hover:border-orange-500 transition-colors h-full">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                🌿 <AnimatedText text="Plain Farmland" />
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2"><AnimatedText text="(Without Development)" /></p>
              <div className="h-px w-full bg-orange-600 my-4" />
              <ul className="space-y-3 text-sm text-zinc-400">
                {['Budget-friendly land options', 'Freedom to develop as per your choice', 'Suitable for long-term investment and future development'].map((f, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="leading-tight"><AnimatedText text={f} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedReveal>
        </div>
      </AnimatedReveal>

      {/* Section 4: Value and Pricing */}
      <AnimatedReveal type="slide" direction="right" delay={0.2} duration={0.8} className="mx-auto max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#090909] border-2 border-orange-600 rounded-2xl p-6 md:p-8 hover:border-orange-500 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">💰</span> <AnimatedText text="Earn Income From Your Farmland" />
            </h2>
            <ul className="space-y-4 text-sm sm:text-base text-zinc-400 mb-6">
              <li className="flex gap-3 items-start">
                <span className="text-orange-500 mt-1">👉</span>
                <span><AnimatedText text="Build your farmhouse as per your budget & style" /></span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-orange-500 mt-1">👉</span>
                <span><AnimatedText text="Build your Dream FARM HOUSE & earn extra income with platforms like Airbnb or farm stay" /></span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-orange-500 mt-1">👉</span>
                <span><AnimatedText text="Generate rental income from weekend stays & tourists" /></span>
              </li>
            </ul>
            <div className="inline-block px-4 py-2 bg-orange-500/10 border border-white text-white rounded-lg text-sm font-semibold">
              <AnimatedText text="Turn your farmland into a lifestyle asset + income source." />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-black border-2 border-orange-600 rounded-2xl p-6 md:p-8 shadow-[0_0_20px_rgba(249,115,22,0.1)] flex flex-col justify-center text-center hover:border-orange-500 transition-colors group">
            <AnimatedReveal type="scale" delay={0.4} duration={0.5}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                <span className="text-xl group-hover:animate-bounce">💵</span> <AnimatedText text="Investment Range" />
              </h2>
              <div className="text-3xl md:text-4xl font-extrabold text-orange-400 tracking-tight mb-2 flex flex-wrap justify-center items-center gap-2">
                👉 <span><AnimatedText text="₹549/- to ₹999/-" /></span> <span className="text-sm md:text-base font-medium text-zinc-400"><AnimatedText text="per sq.ft" /></span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-4">
                <AnimatedText text="(Price subject to change based on project and location)" />
              </p>
            </AnimatedReveal>
          </div>

          <div className="lg:col-span-3 bg-zinc-950 border-2 border-orange-600 rounded-2xl p-6 md:p-8 hover:border-orange-500 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">🏡</span> <AnimatedText text="Why Choose SK Farmland Developers" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6">
              {['100% Clear Title & Legal Verification', 'Managed Farmland & Plain Land', 'Projects available near Bengaluru', 'Prime locations with good road connectivity', 'Transparent & hassle-free process', 'Complete guidance from booking to registration'].map((f, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="bg-orange-500/10 p-2 rounded-full group-hover:bg-orange-500/20 transition-colors shrink-0">
                    <Check size={16} className="text-orange-500 shrink-0" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300 leading-snug mt-1 break-words"><AnimatedText text={f} /></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedReveal>

      {/* Section 5: Experience & CTA */}
      <AnimatedReveal type="slide" direction="up" delay={0.2} duration={0.8} className="mx-auto max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#090909] border-2 border-orange-600 rounded-2xl p-8 flex flex-col justify-center hover:border-orange-500 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">🌄</span> <AnimatedText text="Experience Nature Your Way" />
            </h2>
            <ul className="space-y-4 text-sm md:text-base text-zinc-300">
              <li><AnimatedText text="Build your dream farmhouse 🏡" /></li>
              <li><AnimatedText text="Enjoy peaceful weekend living 🌿" /></li>
              <li><AnimatedText text="Earn rental income 💰" /></li>
              <li><AnimatedText text="Invest in appreciating land 📈" /></li>
            </ul>
            <p className="text-orange-400 font-semibold mt-6 uppercase tracking-wider text-sm">
              <AnimatedText text="Choose managed farmland for worry-free ownership" />
            </p>
          </div>

          <div className="bg-gradient-to-tr from-zinc-900 to-zinc-950 border-2 border-orange-600 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-[0_5px_30px_rgba(249,115,22,0.06)] relative overflow-hidden hover:border-orange-500 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <AnimatedReveal type="3d-flip-y" delay={0.4} duration={1}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 font-mono mb-4 block">
                📍 <AnimatedText text="Start Your Journey Today" />
              </span>
              <div className="space-y-4 flex flex-col items-start mx-auto w-fit mt-4">
                <div className="flex items-center gap-3 text-white text-sm md:text-base font-semibold">
                  <span className="text-orange-500 shrink-0">👉</span> <span><AnimatedText text="Explore our projects" /></span>
                </div>
                <div className="flex items-center gap-3 text-white text-sm md:text-base font-semibold">
                  <span className="text-orange-500 shrink-0">👉</span> <span><AnimatedText text="Choose the farmland that suits your needs" /></span>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </AnimatedReveal>

      {/* Projects Section */}
      <AnimatedReveal type="slide" direction="up" delay={0.1} duration={0.8} className="mx-auto max-w-6xl xl:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 2xl:max-w-[1400px] px-4 py-6 space-y-6">
        <div className="text-left space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            <AnimatedText text="Projects" />
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl leading-relaxed">
            Experience premium farmland living with thoughtfully planned infrastructure, natural surroundings, and modern amenities.
          </p>
        </div>

        {dynamicProjects.length > 0 ? (
          dynamicProjects.map((project, idx) => (
            <div key={project.id} className="w-full">
              <div 
                className="bg-[#090909] border-2 border-orange-600 rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] mt-6 w-full"
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
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <p>No projects available at the moment. Please check back later.</p>
          </div>
        )}
      </AnimatedReveal>

    </motion.div>
  );
}
