import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, animate } from 'motion/react';
import { Leaf, Award, Map, Users, Home as HomeIcon, Check, Calendar, MessageCircle } from 'lucide-react';
import { PageId } from '../types';
import { statsData } from '../data';
import heroTop from '../assets/hero-top.jpg';
import heroBottom from '../assets/hero-bottom.jpg';
import gallery1 from '../assets/gallery-1.jpeg';
import gallery2 from '../assets/gallery-2.jpeg';
import customHeroLeft from '../assets/custom-hero-left.jpg';
import customHeroRight from '../assets/custom-hero-right.jpg';
import hero1_1 from '../assets/hero 1 (1).jpeg';
import hero1_2 from '../assets/hero 1 (2).jpeg';
import hero1_3 from '../assets/hero 1 (3).jpeg';
import hero1_4 from '../assets/hero 1 (4).jpeg';
import hero1_5 from '../assets/hero 1 (5).jpeg';
import hero1_6 from '../assets/hero 1 (6).jpeg';
import hero1_7 from '../assets/hero 1 (7).jpeg';
import hero1_8 from '../assets/hero 1 (8).jpeg';
import hero1_9 from '../assets/hero 1 (9).jpeg';
import hero1_10 from '../assets/hero 1 (10).jpeg';
import hero1_11 from '../assets/hero 1 (11).jpeg';
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
  children?: React.ReactNode;
}

function HeroCarousel({ images, labels, yBounce, className = "", children }: HeroCarouselProps) {
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
      <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none z-20 ${children ? 'from-black/90 via-black/60 to-black/40' : 'from-black/60 via-transparent to-transparent'}`} />

      {children && (
        <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center p-4 sm:p-6 bg-black/20">
          {children}
        </div>
      )}
    </motion.div>
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

        <div className="relative z-10 mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pt-0">

          {/* Top Hero Image Column: Infrastructure Carousel */}
          <HeroCarousel
            images={[customHeroLeft, hero1_1, hero1_2, hero1_3, hero1_4, hero1_5, hero1_6]}
            labels={["SK Farmland Community", "Gated Entry Plaza", "Premium Infrastructure", "Secure Boundary", "Eco-Friendly Design", "Scenic View", "Lush Greenery"]}
            yBounce={[0, -6, 0]}
          >

          </HeroCarousel>

          {/* Bottom Hero Image Column: Scenic/Community Carousel */}
          <HeroCarousel
            images={[customHeroRight, hero1_7, hero1_8, hero1_9, hero1_10, hero1_11]}
            labels={["Premium Lifestyle", "Scenic Resort Community", "Lush Organic Farm", "Clubhouse & Amenities", "Serene Living Spaces", "Nature Living"]}
            yBounce={[0, 6, 0]}
          />

        </div>
      </section>

      {/* 2. Trust Stats Strip */}
      <motion.section
        id="stats-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="relative z-10 px-4"
      >
        <div className="mx-auto max-w-6xl bg-[#090909] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="text-left mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 font-mono">
              Our Legacy in Figures
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Trusted by Families & Investors across India
            </h2>
          </div>

          <div className="w-full relative mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 py-2">
              {statsData.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-5 bg-zinc-950/60 rounded-xl border-2 border-orange-600 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.06)] transition-all duration-300 w-full"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5 + (i % statsData.length) * 0.5, ease: "easeInOut" }}
                    className="p-3 bg-orange-500/5 rounded-full border border-orange-500/10 mb-3 text-orange-500"
                  >
                    {iconMap(stat.icon)}
                  </motion.div>
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
      </motion.section>

      {/* Section 1: Own Your Dream Farmland */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-6xl px-4 py-4 space-y-4 text-left"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 font-mono text-xs uppercase tracking-widest">
          <Leaf size={14} className="animate-pulse" />
          Own Your Dream Farmland
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
          Lifestyle <span className="text-zinc-600 px-2">|</span> Investment <span className="text-zinc-600 px-2">|</span> Extra Income Opportunity
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed text-left max-w-4xl">
          <p>
            Premium farmland projects available near to Anekal Thalli Road towards Hoganekkal Road & which are very near to Electronic City, Jigani, Chandapur, Bannerghatta road, Kanakapura Road & Hosur (peaceful & high-growth location).
          </p>
          <p>
            At SK Farmland Developers, we offer farmland solutions designed for personal use, investment, and income generation. Whether you want peaceful living in nature or long-term returns, we make the process simple, secure, and transparent.
          </p>
        </div>
      </motion.section>

      {/* Section 2: Experience True Nature Living */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-6xl px-4 py-4"
      >
        <div className="bg-zinc-950 border-2 border-orange-600 rounded-2xl p-6 md:p-10 hover:border-orange-500 transition-colors shadow-2xl relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6 flex items-center gap-3">
            <span className="text-2xl">🌄</span> Experience True Nature Living
          </h2>
          <div className="space-y-5 text-sm sm:text-base text-zinc-400 leading-relaxed relative z-10">
            <p>Imagine living far away from the hustle and bustle of the city — surrounded by pure nature, undisturbed, and completely free from pollution.</p>
            <p>Wake up to the sound of birds, breathe in fresh air, and enjoy wide open spaces where you can grow your own food, walk among greenery, and reconnect with a healthier lifestyle.</p>
            <p>Our farmland is ideal for cultivating crops such as mango, guava, papaya, banana, sugarcane, vegetables, and seasonal grains, supported by fertile soil and water availability.</p>
            <p>You can also keep animals like chickens, cows, dogs, sheep, goats, or birds, making your land not just an investment—but a complete countryside experience.</p>
          </div>
        </div>
      </motion.section>

      {/* Section 3: What We Offer */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-6xl px-4 py-6 space-y-6"
      >
        <div className="text-left space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-2xl">🌱</span> What We Offer
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-950 border-2 border-orange-600 rounded-2xl p-6 hover:border-orange-500 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              🏡 Farmland
            </h3>
            <div className="h-px w-full bg-zinc-800 my-4" />
            <p className="text-sm text-zinc-300 font-semibold mb-4">
              Plot Size Starts From 0.25 Quarter Acre, 0.5 Half Acre, or 1–2 Acres)
            </p>
            <p className="text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
              One Plot – One Owner – Complete Freedom
            </p>
          </div>

          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-orange-600 rounded-2xl p-6 shadow-[0_0_20px_rgba(249,115,22,0.1)] relative hover:border-orange-500 transition-colors">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-orange-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              Hassle-Free Option
            </div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              🌾 Managed Farmland
            </h3>
            <div className="h-px w-full bg-zinc-800 my-4" />
            <ul className="space-y-3 text-sm text-zinc-400">
              {['Maintenance, plantation & basic upkeep handled', '35 plants with drip irrigation system', 'Individual water connection for each plot', 'Picket compound fencing in front of each plot for better layout appearance', '24/7 security', 'Internal Access Road', 'Cement Concrete Roads', 'Solar street lights', 'Ideal for investment without daily involvement'].map((f, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <Check size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  <span className="leading-tight">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-950 border-2 border-orange-600 rounded-2xl p-6 hover:border-orange-500 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              🌿 Plain Farmland
            </h3>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">(Without Development)</p>
            <div className="h-px w-full bg-zinc-800 my-4" />
            <ul className="space-y-3 text-sm text-zinc-400">
              {['Budget-friendly land options', 'Freedom to develop as per your choice', 'Suitable for long-term investment and future development'].map((f, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <Check size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  <span className="leading-tight">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Value and Pricing */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#090909] border-2 border-orange-600 rounded-2xl p-6 md:p-8 hover:border-orange-500 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">💰</span> Earn Income From Your Farmland
            </h2>
            <ul className="space-y-4 text-sm sm:text-base text-zinc-400 mb-6">
              <li className="flex gap-3 items-start">
                <span className="text-orange-500 mt-1">👉</span>
                <span>Build your farmhouse as per your budget & style</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-orange-500 mt-1">👉</span>
                <span>Build your Dream FARM HOUSE & earn extra income with platforms like Airbnb or farm stay</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-orange-500 mt-1">👉</span>
                <span>Generate rental income from weekend stays & tourists</span>
              </li>
            </ul>
            <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold">
              Turn your farmland into a lifestyle asset + income source.
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-black border-2 border-orange-600 rounded-2xl p-6 md:p-8 shadow-[0_0_20px_rgba(249,115,22,0.1)] flex flex-col justify-center text-center hover:border-orange-500 transition-colors">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-center gap-2">
              <span className="text-xl">💵</span> Investment Range
            </h2>
            <div className="text-2xl md:text-3xl font-extrabold text-orange-400 tracking-tight mb-2 flex justify-center items-center gap-2">
              👉 <span className="[-webkit-text-stroke:1px_white]">₹499/- to ₹849/-</span> <span className="text-sm font-medium text-zinc-400">per sq.ft</span>
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-500 font-mono mt-4">
              (Price subject to change based on project and location)
            </p>
          </div>

          <div className="lg:col-span-3 bg-zinc-950 border-2 border-orange-600 rounded-2xl p-6 md:p-8 hover:border-orange-500 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">🏡</span> Why Choose SK Farmland Developers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-zinc-400">
              {['100% Clear Title & Legal Verification', 'Options: Private, Managed & Plain Land', 'Projects available near Bangalore & Pondicherry', 'Prime locations with good road connectivity', 'Transparent & hassle-free process', 'Complete guidance from booking to registration'].map((f, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <Check size={18} className="text-orange-500 shrink-0" />
                  <span className="leading-tight">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 5: Experience & CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#090909] border-2 border-orange-600 rounded-2xl p-8 flex flex-col justify-center hover:border-orange-500 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">🌄</span> Experience Nature Your Way
            </h2>
            <ul className="space-y-4 text-sm md:text-base text-zinc-300">
              <li>Build your dream farmhouse 🏡</li>
              <li>Enjoy peaceful weekend living 🌿</li>
              <li>Earn rental income 💰</li>
              <li>Invest in appreciating land 📈</li>
            </ul>
            <p className="text-orange-400 font-semibold mt-6 uppercase tracking-wider text-sm">
              Choose managed farmland for worry-free ownership
            </p>
          </div>

          <div className="bg-gradient-to-tr from-zinc-900 to-zinc-950 border-2 border-orange-600 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-[0_5px_30px_rgba(249,115,22,0.06)] relative overflow-hidden hover:border-orange-500 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 font-mono mb-4">
              📍 Start Your Journey Today
            </span>
            <div className="space-y-4 w-full max-w-sm flex flex-col items-center">
              <div className="flex items-center gap-3 text-white text-sm md:text-base font-semibold">
                <span className="text-orange-500">👉</span> Explore our projects
              </div>
              <div className="flex items-center gap-3 text-white text-sm md:text-base font-semibold text-left">
                <span className="text-orange-500">👉</span> Choose the farmland that suits your needs
              </div>
            </div>


          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-6xl px-4 py-6 space-y-6"
      >
        <div className="text-left space-y-3">
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

            <div className="mt-8 p-6 bg-zinc-950/80 border border-zinc-800 rounded-xl flex flex-col md:flex-row gap-6 justify-between items-center">
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
      </motion.section>

    </motion.div>
  );
}
