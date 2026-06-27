import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, FileText, Milestone, Zap, Sprout, Landmark, MapPin, Smile, Compass, Sparkles, PhoneCall } from 'lucide-react';
import { trustHighlights } from '../data';

interface AboutUsProps {
  onBookClick: () => void;
}

export default function AboutUs({ onBookClick }: AboutUsProps) {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgContainerRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const whyCards = [
    {
      title: '100% Clear Title Deeds',
      desc: 'Each individual plot carries clear physical titles. Bookings transition directly into stamp registration without hidden clauses.',
      icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Legally Verified Documents',
      desc: 'Double-checked by independent high-court advocates in Bengaluru. All background files are ready for verification.',
      icon: <FileText className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Excellent Road Connectivity',
      desc: 'Direct entrance linkages from double roads (Anekal Thalli road / Hoganekkal Road) with solid CC internal network.',
      icon: <Milestone className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Borewell & Electricity Facility',
      desc: 'Fully loaded with high-capacity shared borewells and dedicated electricity grids mapped to individual plot corners.',
      icon: <Zap className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Plantation Ready Farmland',
      desc: 'Scientific organic soil enrichment completed. Equipped with high-flow automated drip irrigation.',
      icon: <Sprout className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Investment, Farming & Weekend Living',
      desc: 'Multi-functional layout: generate rental income via tourist farm stays, harvest organic yields, or enjoy peaceful weekend retreats.',
      icon: <Landmark className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Projects Near Bengaluru',
      desc: 'Convenient corridors in high-growth green zones (Bannerghatta Extn, Kanakapura Road, Electronic City, Jigani, Hosur).',
      icon: <MapPin className="w-5 h-5 text-orange-500" />,
    },
    {
      title: 'Complete Site Visit Assistance',
      desc: 'Complementary pickup and drops for prospective clients. Guided tour with in-depth layout briefings and legal queries addressed.',
      icon: <Smile className="w-5 h-5 text-orange-500" />,
    },
  ];

  return (
    <div
      id="about-page-container"
      className="space-y-12 pb-12 pt-4"
    >
      
      {/* Page Header */}
      <section id="about-hero" className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 font-mono text-[10px] uppercase tracking-widest">
          <Compass size={11} className="animate-spin" style={{ animationDuration: '8s' }} />
          Who We Are
        </div>
        <motion.h1 
          initial="hidden"
          animate="visible"
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
        <p className="text-sm text-zinc-400 leading-relaxed">
          At SK Farmland Developers, we believe land ownership should be empowering, transparent, and completely hassle-free. With over 5+ Years of Trust, we have cleared and delivered 700+ acres of nature-rich estates to families and capital appreciation investors.
        </p>
      </section>

      {/* Legacy Story Section */}
      <section id="about-story" className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#090909] border border-zinc-900 rounded-3xl p-6 md:p-10">
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Our Sacred Commitment</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              SK Farmland Developers was established with a singular focus: bridging the gap between urban families desiring natural organic living and secured, legally cleared land assets. 
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We specialize in identify premium soil belts within 1 hour distance from electronic hubs like Electronic City, Jigani, and Bannerghatta. We transform these into high-end gated farming communities. Each project combines state-of-the-art agricultural practices with concrete infrastructure, making it ready for immediate farming, leisure, or farmhouse construction.
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
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 h-80">
              <motion.img
                src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=700&q=80"
                alt="Agricultural plantation grid"
                referrerPolicy="no-referrer"
                style={{ y: imgY }}
                className="absolute -top-[15%] left-0 w-full h-[130%] object-cover opacity-85 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* Grid of trust parameters (Why choose us) */}
      <section id="why-choose-us-section" className="mx-auto max-w-5xl px-4 space-y-8">
        
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
            <div
              key={i}
              id={`why-card-${i}`}
              className="bg-[#0A0A0A] border border-zinc-900/80 rounded-xl p-5 hover:border-orange-500/25 transition-all duration-300 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-full bg-orange-500/5 border border-orange-500/10 flex items-center justify-center">
                  {card.icon}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">{card.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Transparent Site Visit Invite Banner */}
      <section id="about-site-visit-cta" className="mx-auto max-w-5xl px-4">
        <div className="bg-gradient-to-r from-zinc-950 via-[#120F0B] to-zinc-950 border border-orange-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 font-mono flex items-center justify-center md:justify-start gap-1">
              <Sparkles size={11} className="animate-pulse" />
              Complete Transparency
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Site Visit Assistance For Every Prospective Buyer
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Transparency builds trust. We arrange complimentary comfortable SUVs to take you and your family directly to our farm layouts on weekends, guided by legal advocates and soil specialists.
            </p>
          </div>

          <button
            onClick={onBookClick}
            className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl hover:from-orange-500 hover:to-amber-400 transition-all duration-300 shadow-md cursor-pointer"
          >
            <PhoneCall size={13} />
            Request Free Pickup Ride
          </button>
        </div>
      </section>

    </div>
  );
}
