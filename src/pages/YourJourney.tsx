import { motion } from 'motion/react';
import { Leaf, Users, ShieldCheck, TrendingUp, Smile, PhoneCall } from 'lucide-react';

interface YourJourneyProps {
  onBookClick: () => void;
}

export default function YourJourney({ onBookClick }: YourJourneyProps) {
  const values = [
    {
      step: '01',
      title: 'Commitment to Land & Nature',
      desc: 'We are passionate about farmland development and creating spaces where you can enjoy peace, greenery, and a healthy lifestyle close to nature.',
      icon: <Leaf className="w-5 h-5 text-orange-500" />,
    },
    {
      step: '02',
      title: 'Teamwork & Support',
      desc: 'Our team works closely with you throughout the process—from site visit to registration—ensuring a smooth and hassle-free experience.',
      icon: <Users className="w-5 h-5 text-orange-500" />,
    },
    {
      step: '03',
      title: 'Trust & Transparency',
      desc: 'We believe in honest dealings. All our projects come with clear communication, proper guidance, and verified documentation.',
      icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
    },
    {
      step: '04',
      title: 'Growth & Investment Value',
      desc: 'We help you choose farmland that offers long-term value, whether for personal use, farming, or future investment growth.',
      icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
    },
    {
      step: '05',
      title: 'Customer Satisfaction',
      desc: 'Your satisfaction is our priority. We are committed to helping you make the right decision with confidence and peace of mind.',
      icon: <Smile className="w-5 h-5 text-orange-500" />,
    },
  ];

  return (
    <motion.div
      id="journey-page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-10 pb-12 pt-4"
    >

      {/* Header / Hero */}
      <section id="journey-hero" className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 font-mono text-[10px] uppercase tracking-widest">
          <Leaf size={11} className="animate-pulse" />
          🌿 Your Journey With SK Farmland Developers
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
          {"Your Journey With SK Farmland Developers".split(" ").map((word, i) => (
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
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          We believe our success comes from helping our customers achieve their dream of owning farmland. We are committed to creating valuable opportunities in the farmland and real estate sector—guiding you at every step, from selecting the right land to building your dream farmhouse. Join us in a journey that connects you with nature, investment opportunities, and a peaceful lifestyle.
        </p>
      </section>

      {/* Values Timeline Section */}
      <section id="journey-timeline" className="mx-auto max-w-4xl px-4 relative">

        {/* Decorative timeline line */}
        <div className="hidden md:block absolute left-12 top-20 bottom-20 w-[1px] bg-zinc-900" />
        <div className="hidden md:block absolute left-12 top-20 bottom-20 w-[1px] bg-gradient-to-b from-orange-500/20 via-orange-500/5 to-transparent" />

        <div className="text-center md:text-left space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 font-mono">
            🌱 Our Core Principles
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Our Values</h2>
        </div>

        <div className="space-y-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="relative flex flex-col md:flex-row items-start gap-6 md:gap-10 group"
            >

              {/* Step indicator bubble */}
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0A0A0A] border-2 border-orange-600 text-orange-500 shrink-0 font-bold font-mono text-sm group-hover:border-orange-500 transition-all duration-300 z-10 shadow-md">
                {val.step}
              </div>

              {/* Step Card Details */}
              <div className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-5 md:p-6 space-y-3 w-full text-left">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-orange-500/5 border border-orange-500/10 text-orange-500">
                    {val.icon}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {val.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Build Your Future CTA Banner */}
      <section id="journey-cta" className="mx-auto max-w-4xl px-4 text-center">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-[#100C08] to-zinc-950 border-2 border-orange-600 hover:border-orange-500 transition-colors space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 font-mono">
            🌄 Build Your Future With Us
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Whether you are looking for a weekend getaway, farmhouse living, or a secure land investment, SK Farmland Developers is here to support your journey.
          </h3>
          <p className="text-xs text-zinc-300 max-w-xl mx-auto leading-relaxed font-mono flex items-center justify-center gap-1.5 bg-black/45 py-2 px-4 rounded-lg border-2 border-orange-600 hover:border-orange-500 transition-colors">
            <span className="text-orange-500 text-sm">👉</span> Experience the joy of owning your own farmland and creating a lifestyle close to nature.
          </p>
          <div className="pt-2">

          </div>
        </div>
      </section>

    </motion.div>
  );
}
