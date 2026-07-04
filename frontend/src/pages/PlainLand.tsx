import { motion } from 'motion/react';
import { Leaf, Check, X, ShieldAlert, FileText, IndianRupee, Handshake, TreePine } from 'lucide-react';

interface PlainLandProps {
  onBookClick: () => void;
}

export default function PlainLand({ onBookClick }: PlainLandProps) {

  return (
    <motion.div
      id="plainland-page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-12 pb-12 pt-4"
    >

      {/* Header / Hero section */}
      <section id="plainland-hero" className="text-center space-y-4 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-green-400 font-mono text-[10px] uppercase tracking-widest">
          <TreePine size={11} />
          🟢 Plain Land (Without Development)
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
          {"We offer clear title farmland / plain land".split(" ").map((word, i) => (
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
      </section>

      <section className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: -2,
              boxShadow: "0 25px 50px -12px rgba(234, 88, 12, 0.4)"
            }}
            className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-all duration-300 rounded-2xl p-6 space-y-4 cursor-default"
          >
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-emerald-500">✨</span> Highlights
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              {[
                '100% Clear Documents (Legal verification done)',
                'Direct Sale – No Middlemen',
                'Good Location & Easy Road Access',
                'Suitable for Farming / Investment / Weekend Stay',
                'Peaceful Environment with Natural Surroundings'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Important Note */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: -2,
              boxShadow: "0 25px 50px -12px rgba(234, 88, 12, 0.4)"
            }}
            className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-all duration-300 rounded-2xl p-6 space-y-4 cursor-default"
          >
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-red-500">⚠️</span> IMPORTANT NOTE (VERY CLEAR)
            </h3>
            <p className="text-xs text-zinc-300 font-bold mb-2">This is PLAIN LAND (RAW LAND)</p>
            <ul className="space-y-3 text-xs text-zinc-400 mb-4">
              {[
                'No layout development',
                'No internal roads (unless already existing)',
                'No fencing / compound (can be done by buyer)',
                'No electricity setup (buyer can arrange as per requirement)'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                    <X size={10} className="stroke-[3]" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-zinc-900">
              <p className="text-xs text-zinc-300 flex items-start gap-2">
                <span className="text-orange-500 font-mono">👉</span> Buyer has full freedom to develop the land as per their needs.
              </p>
            </div>
          </motion.div>

          {/* Why Smart Investment */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: -2,
              boxShadow: "0 25px 50px -12px rgba(234, 88, 12, 0.4)"
            }}
            className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-all duration-300 rounded-2xl p-6 space-y-4 cursor-default"
          >
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-orange-500">💰</span> WHY THIS IS A SMART INVESTMENT
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              {[
                'Lower Cost Compared to Developed Plots',
                'Full Control – Build & Develop Your Way',
                'No Maintenance Charges',
                'Better Appreciation in Long Term'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Business Policy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: -2,
              boxShadow: "0 25px 50px -12px rgba(234, 88, 12, 0.4)"
            }}
            className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-all duration-300 rounded-2xl p-6 space-y-4 cursor-default"
          >
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-zinc-900 pb-3 mb-1">
              <span className="text-orange-500">⚠️</span> BUSINESS POLICY
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-start gap-2.5">
                <span className="text-orange-500 shrink-0 mt-0.5">🔹</span>
                <span className="leading-relaxed">This offering is strictly between SK Farmland Developers and direct buyers only</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-500 shrink-0 mt-0.5">🔹</span>
                <span className="leading-relaxed">Real estate agents / land developers are requested not to approach or engage</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-500 shrink-0 mt-0.5">🔹</span>
                <span className="leading-relaxed">Communication only with genuine buyers</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </section>

    </motion.div>
  );
}
