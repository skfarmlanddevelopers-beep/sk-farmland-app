import { motion } from 'motion/react';
import { Leaf, Check, Info, Calendar, Wrench, AlertTriangle, Lightbulb, DollarSign, Compass } from 'lucide-react';

interface ManagedFarmlandProps {
  onBookClick: () => void;
}

export default function ManagedFarmland({ onBookClick }: ManagedFarmlandProps) {

  return (
    <motion.div
      id="managed-page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-12 pb-12 pt-4"
    >

      {/* Header / Hero section */}
      <section id="managed-hero" className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 font-mono text-[10px] uppercase tracking-widest">
          <Leaf size={11} />
          🌾 Managed Farmland (Hassle-Free Ownership)
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
          {"Own Farmland Without the Hassle of Managing It".split(" ").map((word, i) => (
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
          At SK Farmland Developers, our Managed Farmland concept is designed for customers who want to invest in land and enjoy nature—without worrying about day-to-day maintenance.
        </p>
      </section>

      {/* What is Managed Farmland introduction card */}
      <section id="what-is-managed" className="mx-auto max-w-5xl px-4">
        <div className="bg-gradient-to-r from-zinc-950 via-[#110E0A] to-zinc-950 border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-left">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-orange-500">🌿</span> What is Managed Farmland?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
              Ideal for customers who want a peaceful farmland experience without daily involvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-200 bg-zinc-900 px-3.5 py-1.5 rounded-lg border border-zinc-800/80">
                <span className="text-orange-500 font-mono">👉</span> You own the land
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-200 bg-zinc-900 px-3.5 py-1.5 rounded-lg border border-zinc-800/80">
                <span className="text-orange-500 font-mono">👉</span> We take care of development & maintenance
              </span>
            </div>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-zinc-900" />
          <div className="text-xs text-zinc-500 font-mono italic max-w-xs text-center md:text-left">
            "Your green asset grows secured while you focus on what you love."
          </div>
        </div>
      </section>

      {/* Main Grid: Development, Facilities & Maintenance */}
      <section id="managed-infrastructure" className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Column 1: Development & Facilities Provided */}
          <div className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-orange-500">🛠️</span> Development & Facilities Provided
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              {[
                '35 plants provided for each plot',
                'Drip irrigation system',
                'Individual water connection for every plot',
                'Picket fencing in the front portion',
                '24/7 security for the project',
                'Street lights within the layout',
                'Internal access roads (project-based)'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Maintenance Support */}
          <div className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
                <span className="text-orange-500">🔧</span> Maintenance Support
              </h3>
              <ul className="space-y-3 text-xs text-zinc-400">
                {[
                  'Regular upkeep and basic maintenance handled by our team',
                  'Plantation care and irrigation support included',
                  'Maintenance charges applicable (details shared during purchase)'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 shrink-0">
                      <Wrench size={10} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Note indicator */}
            <div className="flex items-start gap-2.5 bg-zinc-950 p-4 rounded-xl border-2 border-orange-600 hover:border-orange-500 transition-colors text-[10px] text-zinc-500 leading-relaxed font-mono">
              <Info size={12} className="text-orange-500/60 shrink-0 mt-0.5" />
              <span>Guidelines regarding registration are shared transparently prior to sale agreement executions.</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Grid: Additional Charges & Usage Benefits */}
      <section id="charges-and-usage" className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Column 1: Additional Charges (If Required) */}
          <div className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-orange-500">⚠️</span> Additional Charges (If Required)
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              {[
                'Water usage for farmhouse construction will be charged separately',
                'Cleaning of land (removal of unwanted plants, bushes, etc.) will be charged extra',
                'Any additional work beyond standard maintenance will be charged as applicable'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                    <AlertTriangle size={10} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Usage & Benefits */}
          <div className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-orange-500">🌱</span> Usage & Benefits
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              {[
                'Suitable for fruit plants like mango, coconut, guava, etc.',
                'Ideal for weekend visits, relaxation, or future farmhouse construction',
                'Enjoy nature without managing daily activities'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Main Grid: Income Opportunity & Why Choose */}
      <section id="income-and-reasons" className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Column 1: Income Opportunity */}
          <div className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-orange-500">💰</span> Income Opportunity
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              {[
                { title: 'Build your farmhouse as per your budget', desc: 'Draft outlines.' },
                { title: 'List your property on platforms like Airbnb or farmstay models', desc: 'Active rentals.' },
                { title: 'Earn rental income from weekend stays & tourists', desc: 'Steady passive returns.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 shrink-0">
                    <DollarSign size={10} />
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-200">{item.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Why Choose Managed Farmland? */}
          <div className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-orange-500">🧘‍♂️</span> Why Choose Managed Farmland?
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {[
                'No daily supervision required',
                'Perfect for working professionals & investors',
                'Peaceful getaway with managed facilities',
                'Long-term land appreciation',
                'Lifestyle + investment in one'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>


      {/* Start Your Hassle-Free Journey CTA */}
      <section id="managed-cta" className="mx-auto max-w-4xl px-4 text-center mt-8">
        <div className="p-6 rounded-2xl bg-zinc-950 border-2 border-orange-600 hover:border-orange-500 transition-colors space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 font-mono">
            📍 Start Your Hassle-Free Journey
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">Own your farmland and let us manage it for you</h3>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Book a weekend site visit today. Our legal advocates, soil specialists, and layout engineers are present on-site to walk you through plots and answer legal/taxation queries.
          </p>

        </div>
      </section>

    </motion.div>
  );
}
