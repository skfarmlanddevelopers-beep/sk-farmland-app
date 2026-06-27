import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, Compass, ShieldCheck, DollarSign, TrendingUp, Leaf, Award, Map, Users, Home as HomeIcon, Sparkles, ArrowRight, Check } from 'lucide-react';
import { PageId } from '../types';
import { statsData, incomeGenerators, projectList } from '../data';
import heroTop from '../assets/hero-top.jpg';
import heroBottom from '../assets/hero-bottom.jpg';
import gallery8 from '../assets/gallery-8.jpeg';

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
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(heroScroll, [0, 1], [1.05, 1.15]);

  const natureRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: natureScroll } = useScroll({
    target: natureRef,
    offset: ["start end", "end start"]
  });
  const natureY = useTransform(natureScroll, [0, 1], ["-12%", "12%"]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
      className="space-y-12 pb-12"
    >
      
      {/* 1. Hero / Splash Section */}
      <section ref={heroRef} id="hero-section" className="relative overflow-hidden pt-0 pb-4">
        {/* Ambient radial orange glow background decoration */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pt-0">
          
          {/* Top Hero Image: Luxury Gated Entry Gate */}
          <motion.div 
            variants={itemVariants} 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="w-full rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl shadow-black/80 aspect-[16/10] relative group z-10"
          >
            <img 
              src={heroTop} 
              alt="Premium Luxury Gated Entrance Gate" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
            />
            {/* Soft premium shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-sm border border-orange-500/20 px-3.5 py-1.5 rounded-lg text-[9px] uppercase tracking-widest text-orange-400 font-mono font-bold">
              Gated Entry Plaza
            </div>
          </motion.div>

          {/* Bottom Hero Image: Sunset Resort Community */}
          <motion.div 
            variants={itemVariants} 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="w-full rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl shadow-black/80 aspect-[16/10] relative group z-10"
          >
            <img 
              src={heroBottom} 
              alt="Premium Sunset Resort Community" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-sm border border-orange-500/20 px-3.5 py-1.5 rounded-lg text-[9px] uppercase tracking-widest text-orange-400 font-mono font-bold">
              Scenic Resort Community
            </div>
          </motion.div>

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
        <div className="mx-auto max-w-5xl bg-[#090909] border border-zinc-900 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 font-mono">
              Our Legacy in Figures
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Trusted by Families & Investors Near Bengaluru
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                id={`stat-card-${i}`}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center p-4 bg-zinc-950/60 rounded-xl border border-zinc-900/60 hover:border-orange-500/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.06)] transition-all duration-300"
              >
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5 + i * 0.5, ease: "easeInOut" }}
                  className="p-3 bg-orange-500/5 rounded-full border border-orange-500/10 mb-3 text-orange-500"
                >
                  {iconMap(stat.icon)}
                </motion.div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-500 mt-1 uppercase font-semibold tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Why Choose Us Section */}
      <motion.section 
        id="nature-living-section" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-5xl px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Why Choose Us details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 bg-orange-500"></span>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500 font-mono">
                🌄 Why Choose Us
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Why Choose SK Farmland Developers?
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We bridge the gap between secure, legally cleared land ownership and natural organic countryside living near Bengaluru, operating with complete transparency and top-tier infrastructure.
            </p>

            {/* Why Choose Us 8-point checklist grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 pt-2">
              {[
                '100% Clear Title Deeds',
                'Legally Verified Documents',
                'Excellent Road Connectivity',
                'Borewell & Electricity Facility',
                'Plantation Ready Farmland',
                'Ideal for Investment, Farming & Weekend Living',
                'Projects Near Bengaluru',
                'Site Visit Assistance'
              ].map((title, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-zinc-200 tracking-wide leading-tight">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Graphic Card */}
          <div ref={natureRef} className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-900 group h-80">
              <motion.img
                src={gallery8}
                alt="Winding path inside premium project"
                referrerPolicy="no-referrer"
                style={{ y: natureY }}
                className="absolute -top-[15%] left-0 w-full h-[130%] object-cover object-center group-hover:scale-105 transition-all duration-700 opacity-80 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-orange-500/20 text-center">
                <p className="text-[10px] text-orange-400 font-bold uppercase tracking-[0.2em] font-mono">
                  Featured Project Image
                </p>
                <p className="text-xs text-zinc-200 font-medium mt-1">
                  Ready-made Farmhouses & pathways under management
                </p>
              </div>
            </div>
            
            {/* Background luxury accent */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl z-[-1]" />
          </div>

        </div>

        {/* Bottom Details Row: Own Your Dream Farmland & Experience True Nature Living */}
        <div className="border-t border-zinc-900/80 pt-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left z-10 relative">
          {/* Own Your Dream Farmland */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wide flex items-center gap-1.5 font-mono">
              <span>🌿</span> Own Your Dream Farmland
            </h4>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono font-bold">
              Lifestyle | Investment | Extra Income Opportunity
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Premium farmland projects available near to Anekal Thalli Road towards Hoganekkal Road & which are very near to Electronic City, Jigani, Chandapur, Bannerghatta road, Kanakapura Road & Hosur (peaceful & high-growth location).
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              At SK Farmland Developers, we offer farmland solutions designed for personal use, investment, and income generation. Whether you want peaceful living in nature or long-term returns, we make the process simple, secure, and transparent.
            </p>
          </div>

          {/* Experience True Nature Living */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wide flex items-center gap-1.5 font-mono">
              <span>🌄</span> Experience True Nature Living
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed pt-1">
              Imagine living far away from the hustle and bustle of the city — surrounded by pure nature, undisturbed, and completely free from pollution. Wake up to the sound of birds, breathe in fresh air, and enjoy wide open spaces where you can grow your own food, walk among greenery, and reconnect with a healthier lifestyle.
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our farmland is ideal for cultivating crops such as mango, guava, papaya, banana, sugarcane, vegetables, and seasonal grains, supported by fertile soil and water availability. You can also keep animals like chickens, cows, dogs, sheep, goats, or birds, making your land not just an investment—but a complete countryside experience.
            </p>
          </div>
        </div>

      </motion.section>

      {/* 4. What We Offer Options */}
      <motion.section 
        id="what-we-offer-section" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-5xl px-4"
      >
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500 font-mono">
            🌱 Tailored Solutions
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            What We Offer
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
            At SK Farmland Developers, we offer farmland solutions designed for personal use, investment, and steady income generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Option 1: Farmland Plots */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-6 relative flex flex-col justify-between hover:border-orange-500/35 hover:shadow-[0_0_20px_rgba(249,115,22,0.06)] transition-all duration-300"
          >
            <div>
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-5 border border-orange-500/25"
              >
                <Compass size={18} />
              </motion.div>
              
              <h3 className="text-lg font-bold text-white tracking-tight">🏡 Private Farmland Plots</h3>
              <p className="text-xs text-orange-500 font-mono mt-1 uppercase tracking-wider font-semibold">
                0.25, 0.5, or 1–2 Acres
              </p>
              
              <p className="text-xs text-zinc-400 leading-relaxed mt-3">
                Own exclusive agricultural plots with individual physical titles. Perfect for families looking to establish private organic food gardens or secure long-term capital assets.
              </p>

              <ul className="text-xs text-zinc-400 space-y-2.5 mt-5 border-t border-zinc-900/60 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-orange-500 text-sm">✔</span>
                  <span>One Plot – One Owner – Complete Freedom</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500 text-sm">✔</span>
                  <span>Individual Fencing Available</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={() => setActivePage('projects')}
              className="mt-6 w-full py-2.5 bg-zinc-950 border border-zinc-800 hover:border-orange-500/40 hover:text-orange-500 text-zinc-300 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors duration-300 cursor-pointer"
            >
              View Available Plots
            </button>
          </motion.div>

          {/* Option 2: Managed Farmland (Hassle-Free) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-[#0C0804] border border-orange-500/30 rounded-2xl p-6 relative flex flex-col justify-between shadow-[0_4px_25px_rgba(249,115,22,0.05)] hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.1)] transition-all duration-300"
          >
            <div>
              <div className="absolute top-4 right-4 bg-orange-500 text-black text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-widest">
                Popular
              </div>
              
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 mb-5 border border-orange-500/35"
              >
                <Leaf size={18} />
              </motion.div>
              
              <h3 className="text-lg font-bold text-white tracking-tight">🌾 Managed Farmland</h3>
              <p className="text-xs text-orange-500 font-mono mt-1 uppercase tracking-wider font-semibold">
                Hassle-Free Asset Management
              </p>
              
              <p className="text-xs text-zinc-400 leading-relaxed mt-3">
                A worry-free plantation investment where basic upkeep, drip irrigation, fencing, access, and 24/7 boundary security are fully handled by our dedicated team.
              </p>

              <ul className="text-xs text-zinc-400 space-y-2.5 mt-5 border-t border-zinc-800/60 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-orange-500 text-sm">✔</span>
                  <span>35 plants with automated drip</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500 text-sm">✔</span>
                  <span>Cement roads & solar street lamps</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={() => setActivePage('managed')}
              className="mt-6 w-full py-2.5 bg-orange-600 text-white font-bold rounded-lg text-xs tracking-wider uppercase hover:bg-orange-500 transition-colors duration-300 cursor-pointer"
            >
              Explore Managed Features
            </button>
          </motion.div>

          {/* Option 3: Plain Farmland */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-6 relative flex flex-col justify-between hover:border-orange-500/35 hover:shadow-[0_0_20px_rgba(249,115,22,0.06)] transition-all duration-300"
          >
            <div>
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-5 border border-orange-500/25"
              >
                <Award size={18} />
              </motion.div>
              
              <h3 className="text-lg font-bold text-white tracking-tight">🌿 Plain Farmland</h3>
              <p className="text-xs text-orange-500 font-mono mt-1 uppercase tracking-wider font-semibold">
                Without Development
              </p>
              
              <p className="text-xs text-zinc-400 leading-relaxed mt-3">
                Highly budget-friendly pristine agricultural land plots. Gives you complete freedom to design your farmhouse layouts and plantations from scratch.
              </p>

              <ul className="text-xs text-zinc-400 space-y-2.5 mt-5 border-t border-zinc-900/60 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-orange-500 text-sm">✔</span>
                  <span>Budget-friendly land options</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500 text-sm">✔</span>
                  <span>Freedom to build over time</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={() => setActivePage('projects')}
              className="mt-6 w-full py-2.5 bg-zinc-950 border border-zinc-800 hover:border-orange-500/40 hover:text-orange-500 text-zinc-300 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors duration-300 cursor-pointer"
            >
              Explore Plain Land
            </button>
          </motion.div>

        </div>
      </motion.section>

      {/* 5. Income Generator Section */}
      <motion.section 
        id="income-generation-section" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-5xl px-4 bg-[#080808] border border-zinc-900 rounded-3xl p-6 md:p-10 relative overflow-hidden"
      >
        
        {/* Ambient top glowing line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 font-mono">
              💰 Lifestyle Asset + Income
            </span>
            
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Earn Steady Income From Your Farmland
            </h2>
            
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              Why let your investment sit idle? SK Farmland Developers provides complete structural layouts to easily turn your countryside escape into an extra income engine.
            </p>

            {/* Price badge */}
            <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Current Investment Range</p>
              <p className="text-lg md:text-xl font-bold text-orange-400">₹499/- to ₹849/- <span className="text-xs font-normal text-zinc-400">per sq.ft</span></p>
              <p className="text-[9px] text-zinc-600 font-mono">(Price subject to change based on project and specific location)</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {incomeGenerators.map((gen, i) => (
              <div
                key={i}
                className="bg-zinc-950 border border-zinc-900/80 rounded-xl p-5 hover:border-orange-500/20 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-orange-500/5 text-orange-500 flex items-center justify-center border border-orange-500/10">
                    {gen.icon === 'Home' && <HomeIcon size={14} />}
                    {gen.icon === 'TrendingUp' && <TrendingUp size={14} />}
                    {gen.icon === 'Leaf' && <Leaf size={14} />}
                    {gen.icon === 'DollarSign' && <DollarSign size={14} />}
                  </span>
                  <h4 className="text-sm font-bold text-zinc-100 tracking-tight">{gen.title}</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{gen.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* 6. Ready to start journey CTA Card */}
      <section id="home-cta-banner" className="mx-auto max-w-5xl px-4 text-center">
        <div className="py-8 px-6 rounded-2xl bg-gradient-to-tr from-zinc-950 via-[#100D09] to-zinc-950 border border-orange-500/25 space-y-4 shadow-[0_5px_30px_rgba(249,115,22,0.06)]">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 font-mono">
            📍 Start Your Journey Today
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to Experience True Nature Living?
          </h2>
          
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Contact us today for more information, detailed floor plans, and customized farm layouts. We arrange comfortable, free transport with complete on-site guidance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-full hover:from-orange-500 hover:to-amber-400 transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(249,115,22,0.2)]"
            >
              <Calendar size={13} />
              Book Free Site Visit
            </button>
            
            <button
              onClick={() => setActivePage('journey')}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-zinc-300 hover:text-white hover:underline text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Learn the buying process
              <ArrowRight size={13} className="text-orange-500" />
            </button>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
