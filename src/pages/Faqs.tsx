import { motion } from 'motion/react';
import { PageId } from '../types';

interface Props {
  setActivePage?: (page: PageId) => void;
}

export default function Faqs({ setActivePage }: Props) {
  const faqsList = [
    {
      q: "What is Managed Farmland?",
      a: "Managed farmland is an agricultural investment where you own the land, and our expert team takes care of planting, maintenance, security, and harvesting."
    },
    {
      q: "Can I build a farmhouse on my plot?",
      a: "Yes, you can build a farmhouse or cottage on your designated plot subject to local zoning regulations and the layout guidelines."
    },
    {
      q: "Are the legal documents clear and verified?",
      a: "Absolutely. All our farmland projects come with 100% clear titles, legally verified documents, and hassle-free registration processes."
    },
    {
      q: "Do you provide water and electricity?",
      a: "Yes, we provide individual water connections with drip irrigation for plants, and street lighting with basic electricity access points as part of the layout infrastructure."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-black pt-12 md:pt-24 px-4 pb-20"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <span className="text-orange-500 font-mono text-sm uppercase tracking-widest">Help Center</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h1>
          <p className="text-zinc-400">Everything you need to know about our farmland projects and investment process.</p>
        </div>

        <div className="space-y-4 pt-6">
          {faqsList.map((faq, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
