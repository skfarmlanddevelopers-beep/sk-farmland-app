import { motion } from 'motion/react';
import { Leaf, Check, Info, Calendar, Wrench, AlertTriangle, Lightbulb, DollarSign, Compass } from 'lucide-react';

interface ManagedFarmlandProps {
  onBookClick: () => void;
}

export default function ManagedFarmland({ onBookClick }: ManagedFarmlandProps) {
  const comparisonRows = [
    {
      feature: 'Agronomic Upkeep',
      managed: '100% Handled (Organic weed control, fertilization, plowing)',
      plain: 'Self-managed (Must hire local labor)',
    },
    {
      feature: '35 Fruits Plantation',
      managed: 'Complimentary Included (Mango, Guava, Sapota)',
      plain: 'Optional (Chargeable per tree sapling)',
    },
    {
      feature: 'Drip Irrigation Network',
      managed: 'Automated pressure drip integrated to each plant',
      plain: 'Manual piping needed',
    },
    {
      feature: 'Compound Frontage Fencing',
      managed: 'High-quality uniform wooden picket fencing & gates',
      plain: 'Self-installation required',
    },
    {
      feature: 'Water Infrastructure',
      managed: 'Individual high-pressure connection mapped to corner',
      plain: 'Shared community borewell outlet access',
    },
    {
      feature: 'Security & Surveillance',
      managed: '24/7 active gate guards & boundary CCTV surveillance',
      plain: 'Basic layout security gates only',
    },
    {
      feature: 'Internal Access Infrastructure',
      managed: 'CC internal roads with solar-powered illumination lines',
      plain: 'Standard gravel roads and unlit path blocks',
    },
  ];

  return (
    <div
      id="managed-page-container"
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
        <div className="bg-gradient-to-r from-zinc-950 via-[#110E0A] to-zinc-950 border border-orange-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-left">
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
          <div className="bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-6 space-y-4">
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
          <div className="bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between space-y-6">
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
            <div className="flex items-start gap-2.5 bg-zinc-950 p-4 rounded-xl border border-zinc-900 text-[10px] text-zinc-500 leading-relaxed font-mono">
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
          <div className="bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-6 space-y-4">
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
          <div className="bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-6 space-y-4">
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
          <div className="bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-6 space-y-4">
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
          <div className="bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-6 space-y-4">
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

      {/* Interactive Side-By-Side Comparison Matrix */}
      <section id="managed-vs-plain" className="mx-auto max-w-5xl px-4 space-y-6">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 font-mono">
            ⚖ Make Your Decision
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Managed vs. Plain Farmland Matrix
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Review how our standard managed layout options compare directly to standard private land blocks.
          </p>
        </div>

        {/* Elegant Table container */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-900 bg-black shadow-lg">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#090909] border-b border-zinc-900 text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">
                <th className="py-4.5 px-6 font-mono">Key Features</th>
                <th className="py-4.5 px-6 font-mono text-orange-400 bg-orange-500/5 border-x border-zinc-900">
                  🌾 Managed Farmland Option
                </th>
                <th className="py-4.5 px-6 font-mono text-zinc-400">🌿 Plain Farmland Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-xs">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-950/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-zinc-300">{row.feature}</td>
                  <td className="py-4 px-6 text-zinc-200 bg-orange-500/[0.02] border-x border-zinc-900/60 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-orange-400">
                      <span className="text-xs">✦</span>
                      {row.managed}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">{row.plain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Start Your Hassle-Free Journey CTA */}
      <section id="managed-cta" className="mx-auto max-w-4xl px-4 text-center">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 font-mono">
            📍 Start Your Hassle-Free Journey
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">Own your farmland and let us manage it for you</h3>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Book a weekend site visit today. Our legal advocates, soil specialists, and layout engineers are present on-site to walk you through plots and answer legal/taxation queries.
          </p>
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-full hover:from-orange-500 hover:to-amber-400 transition-all duration-300 cursor-pointer shadow-md"
          >
            <Calendar size={13} />
            Schedule Managed Farmland Visit
          </button>
        </div>
      </section>

    </div>
  );
}
