import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ShieldCheck, FileText, Milestone, Zap, Sprout, Landmark, MapPin, Smile, Compass, Sparkles, PhoneCall, Check, Leaf, TrendingUp, DollarSign, Home as HomeIcon, Calendar, ArrowRight, Award } from 'lucide-react';
import { trustHighlights, incomeGenerators } from '../data';
import { PageId } from '../types';
import AnimatedReveal from '../components/AnimatedReveal';
import AnimatedText from '../components/AnimatedText';
import gallery1 from '../assets/gallery-1.jpeg';
import gallery2 from '../assets/gallery-2.jpeg';
import gallery3 from '../assets/gallery-3.jpeg';
import gallery4 from '../assets/gallery-4.jpeg';
import gallery5 from '../assets/gallery-5.jpeg';

function AboutCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <AnimatePresence initial={false}>
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt="About Us Gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
      />
    </AnimatePresence>
  );
}

interface AboutUsProps {
  setActivePage: (page: PageId) => void;
  onBookClick: () => void;
}

export default function AboutUs({ setActivePage, onBookClick }: AboutUsProps) {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgContainerRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  
  const natureRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: natureScroll } = useScroll({
    target: natureRef,
    offset: ["start end", "end start"]
  });
  const natureY = useTransform(natureScroll, [0, 1], ["-12%", "12%"]);

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
  const whyCards = [
    {
      title: '100% Clear Title Deeds',
      desc: 'Every plot comes with legally verified ownership documents, ensuring a smooth and transparent registration process.',
      icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Legally Verified Documents',
      desc: 'All property documents are thoroughly verified before sale, giving every buyer complete peace of mind.',
      icon: <FileText className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Excellent Road Connectivity',
      desc: 'Our projects offer easy access through major roads with well-developed concrete internal roads.',
      icon: <Milestone className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Water & Electricity Facilities',
      desc: 'Shared borewells, water supply, and electricity infrastructure are planned for the convenience of every plot owner.',
      icon: <Zap className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Plantation-Ready Farmland',
      desc: 'Fertile soil, irrigation facilities, and organic farming support help you start cultivation with confidence.',
      icon: <Sprout className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Farmhouse Development & Extra Income Opportunity',
      desc: 'Build your dream farmhouse on your own farmland and enjoy peaceful weekend living. Many of our customers have already built beautiful farmhouses and are earning additional income by listing them on platforms like Airbnb and other farm stay booking services.',
      icon: <HomeIcon className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Investment, Farming & Weekend Living',
      desc: 'Whether you want to invest for future appreciation, enjoy organic farming, build a retirement home, or own a peaceful weekend getaway, our projects are designed to suit your lifestyle and investment goals.',
      icon: <Landmark className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Prime Locations Near Bengaluru',
      desc: 'Our projects are strategically located in fast-growing green corridors with excellent connectivity to Electronic City, Jigani, Chandapura, Bannerghatta Road, Kanakapura Road, Hosur, and Anekal.',
      icon: <MapPin className="w-5 h-5 text-orange-500" />,
    },
  ];

  return (
    <motion.div
      id="about-page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-12 pb-12 pt-4"
    >
      
      {/* Page Header */}
      <AnimatedReveal type="slide" direction="up" delay={0.1} duration={0.8} className="text-center space-y-4 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 font-mono text-[10px] uppercase tracking-widest">
          <Compass size={11} className="animate-spin" style={{ animationDuration: '8s' }} />
          Who We Are
        </div>
        <motion.h1 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 flex flex-wrap justify-center gap-x-2"
        >
          {"Pioneering Premium Farmland Development".split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
          <AnimatedText type="typing" duration={2} text="At SK Farmland Developers, we believe that owning farmland should be simple, transparent, secure, and rewarding. For over 5+ years of trust, we have helped families and investors own premium farmland through legally verified projects with quality infrastructure and complete transparency." />
        </p>
        <p className="text-sm text-zinc-400 leading-relaxed">
          <AnimatedText type="typing" duration={2} text="With 700+ acres developed, 1,000+ happy customers, and 10+ premium farmland projects, we have earned a reputation for trust, integrity, and customer satisfaction." />
        </p>
      </AnimatedReveal>

      {/* Legacy Story Section */}
      <AnimatedReveal type="3d-flip-x" delay={0.2} duration={0.8} className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#090909] border-2 border-orange-600 rounded-3xl p-6 md:p-10 hover:border-orange-500 transition-colors">
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight"><AnimatedText type="words" text="Our Vision" /></h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              <AnimatedText type="typing" duration={2} text="Our vision is to reconnect people with nature while creating secure farmland investment opportunities. We bridge the gap between urban families seeking peaceful weekend living and investors looking for long-term capital appreciation." />
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              <AnimatedText type="typing" duration={2} text="We carefully identify fertile farmland in high-growth locations near Electronic City, Jigani, Chandapura, Bannerghatta Road, Kanakapura Road, Hosur, and Anekal. Every project is thoughtfully planned with modern infrastructure, making it suitable for farming, farmhouse construction, weekend living, or long-term investment." />
            </p>

            <div className="pt-4 border-t border-zinc-900/80 grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-extrabold text-orange-500">100%</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-1">Legally Verified Files</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-orange-500">1,000+</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-1">Happy Clients Served</p>
              </div>
            </div>
          </div>

          <div ref={imgContainerRef} className="relative group">
            <div className="relative rounded-2xl overflow-hidden border-2 border-orange-600 hover:border-orange-500 transition-colors h-64 bg-black">
              <AboutCarousel images={[gallery1, gallery2, gallery3, gallery4, gallery5]} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-20" />
            </div>
          </div>

        </div>
      </AnimatedReveal>

      {/* Grid of trust parameters (Why choose us) */}
      <AnimatedReveal type="slide" direction="up" delay={0.2} duration={0.8} className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 font-mono">
            ✅ Absolute Credibility
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Choose SK Farmland Developers?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            We operate with complete clarity, legal validation, and structured infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card, i) => (
            <AnimatedReveal
              key={i}
              type="3d-flip-x"
              delay={i * 0.1}
              duration={0.7}
              className="h-full"
            >
              <div
                id={`why-card-${i}`}
                className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 rounded-xl p-5 transition-all duration-300 space-y-3 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-full bg-orange-500/5 border border-orange-500/10 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">{card.title}</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>

      </AnimatedReveal>

      {/* Property Visit Assistance */}
      <AnimatedReveal type="slide" direction="up" delay={0.2} duration={0.8} className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 space-y-8 mt-12">
        <div className="bg-[#090909] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
            <MapPin className="text-orange-500" /> Property Visit Assistance
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            We welcome every prospective buyer to visit our farmland projects. Once you arrive at the project location, our experienced team will personally accompany you and show you the entire property.
          </p>
          <div className="bg-black/50 border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="text-orange-500 w-4 h-4" /> During your visit, we will explain:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-400">
              <li className="flex items-start gap-2"><Check className="text-orange-500 w-4 h-4 shrink-0 mt-0.5" /> Project layout and available plots</li>
              <li className="flex items-start gap-2"><Check className="text-orange-500 w-4 h-4 shrink-0 mt-0.5" /> Land boundaries and road connectivity</li>
              <li className="flex items-start gap-2"><Check className="text-orange-500 w-4 h-4 shrink-0 mt-0.5" /> Water and electricity facilities</li>
              <li className="flex items-start gap-2"><Check className="text-orange-500 w-4 h-4 shrink-0 mt-0.5" /> Plantation and farming opportunities</li>
              <li className="flex items-start gap-2"><Check className="text-orange-500 w-4 h-4 shrink-0 mt-0.5" /> Legal documentation and ownership process</li>
              <li className="flex items-start gap-2"><Check className="text-orange-500 w-4 h-4 shrink-0 mt-0.5" /> Farmhouse development possibilities</li>
              <li className="flex items-start gap-2"><Check className="text-orange-500 w-4 h-4 shrink-0 mt-0.5" /> Investment potential and future growth</li>
            </ul>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed mt-6">
            Our objective is to ensure that every buyer has complete clarity, confidence, and transparency before making an investment decision.
          </p>
        </div>
      </AnimatedReveal>

      {/* Our Commitment CTA */}
      <AnimatedReveal type="slide" direction="up" delay={0.2} duration={0.8} className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 mt-12">
        <div className="bg-gradient-to-r from-zinc-950 via-[#120F0B] to-zinc-950 border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 font-mono flex items-center justify-center lg:justify-start gap-1">
              <ShieldCheck size={11} className="animate-pulse" />
              Our Commitment
            </span>
            <p className="text-sm text-zinc-300 leading-relaxed">
              At SK Farmland Developers, honesty, transparency, and customer satisfaction are at the heart of everything we do. From your first enquiry to registration and after-sales support, we are committed to making your farmland ownership journey smooth, secure, and hassle-free.
            </p>
            <p className="text-base font-semibold text-white tracking-wide">
              Invest with Confidence. Grow with Nature. <span className="text-orange-400">Build Your Future with SK Farmland Developers.</span>
            </p>
          </div>
        </div>
      </AnimatedReveal>

     </motion.div>
  );
}
