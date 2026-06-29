import { motion } from 'motion/react';
import { PageId } from '../types';

interface Props {
  setActivePage?: (page: PageId) => void;
}

export default function Testimonials({ setActivePage }: Props) {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "IT Professional, Bangalore",
      text: "Investing with SK Farmland Developers was the best decision for our family. The managed farmland option means we have a beautiful weekend retreat without any of the daily maintenance stress. The organic mangoes from our own plot are just a bonus!"
    },
    {
      name: "Sneha Reddy",
      role: "Entrepreneur",
      text: "The transparency and legal clarity provided by the team gave us immense confidence. They walked us through every document, and the registration process was completely seamless. Highly recommend them for secure land investments."
    },
    {
      name: "Amit Desai",
      role: "NRI Investor",
      text: "Being out of the country, I needed an investment I didn't have to micromanage. The updates on the drip irrigation setup and plantation growth have been fantastic. It's a great feeling to own a piece of nature that's so well looked after."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-black pt-12 md:pt-24 px-4 pb-20 text-center"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <span className="text-orange-500 font-mono text-sm uppercase tracking-widest">Happy Customers</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">What Our Investors Say</h1>
          <p className="text-zinc-400">Hear directly from the families and professionals who have chosen to build their future with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border-2 border-orange-600 hover:border-orange-500 transition-colors rounded-2xl p-6 text-left flex flex-col justify-between space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed italic">"{t.text}"</p>
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <span className="text-xs text-orange-500 font-mono">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
