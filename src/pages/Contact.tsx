import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { projectList } from '../data';

interface ContactProps {
  onBookClick: () => void;
}

export default function Contact({ onBookClick }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Managed Farmland (Hassle-Free Option)',
    budget: '₹40–60 Lakhs',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string, phone: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your Name and Mobile Number.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send data to backend to store in leads table
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (e) {
      console.error('Failed to save lead', e);
    }

    // 2. Format message for WhatsApp
    const whatsappMessage = `Hi SK Farmland, I am ${formData.name}. I am interested in ${formData.interest} with a budget of ${formData.budget}. My phone is ${formData.phone}${formData.email ? ' and email is ' + formData.email : ''}.`;
    const whatsappUrl = `https://wa.me/917411131002?text=${encodeURIComponent(whatsappMessage)}`;

    setSubmittedData({ name: formData.name, phone: formData.phone });

    setFormData({
      name: '',
      phone: '',
      email: '',
      interest: 'Managed Farmland (Hassle-Free Option)',
      budget: '₹40–60 Lakhs',
      notes: '',
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    // 3. Open WhatsApp link
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      id="contact-page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-10 pb-12 pt-4"
    >

      {/* Header */}
      <section id="contact-hero" className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-white text-white font-mono text-[10px] uppercase tracking-widest">
          <Calendar size={11} className="animate-pulse" />
          Get in Touch
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
          {"📞 Get In Touch".split(" ").map((word, i) => (
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
          Looking to own farmland near Bangalore? Our team is here to guide you at every step—from selecting the right plot  We’ll help you choose the best option based on your budget and requirements.
        </p>
      </section>

      {/* Main Grid */}
      <section id="contact-grid-section" className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Form: Form submission card */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border-2 border-orange-600 rounded-2xl p-5 md:p-6 space-y-4 hover:border-orange-500 transition-colors">

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight">Enquiry Form:</h3>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-900 text-xs text-zinc-300">
                    📍 <strong>Book Your Site Visit Today:</strong> Fill the form below or contact us directly:
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full bg-[#141414] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 px-4 text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter phone number"
                        className="w-full bg-[#141414] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 px-4 text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email address"
                        className="w-full bg-[#141414] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 px-4 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Select Budget (dropdown list) */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Select Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#141414] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 px-3 text-sm outline-none transition-all"
                    >
                      <option value="₹40–60 Lakhs">₹40–60 Lakhs</option>
                      <option value="₹60–80 Lakhs">₹60–80 Lakhs</option>
                      <option value="₹80 Lakhs & Above">₹80 Lakhs & Above</option>
                    </select>
                  </div>


                </div>

                <div className="pt-2 space-y-3">
                  <p className="text-[11px] text-orange-400 font-medium font-mono text-center flex items-center justify-center gap-1.5 bg-orange-500/5 py-2 px-3 border border-orange-500/10 rounded-lg">
                    <span>👉</span> “Limited plots available – Book your site visit now
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-3.5 rounded-xl hover:from-orange-500 hover:to-amber-400 active:scale-[0.98] transition-all text-xs tracking-wider uppercase shadow-[0_4px_15px_rgba(249,115,22,0.25)] cursor-pointer"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Enquiry Request'}
                    <ArrowRight size={13} />
                  </button>
                </div>
              </form>
            ) : (
              /* Inline Form Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-5"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>

                <h3 className="text-xl font-bold text-white">Inquiry Received Safely!</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-orange-400">{submittedData?.name}</strong>. Your custom inquiry has been logged in our databases.
                </p>

                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  📞 An experienced agronomist coordinator will call you back at <strong>{submittedData?.phone}</strong> within 2 hours to walk you through layout schedules.
                </div>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-xs text-orange-500 hover:text-orange-400 underline font-semibold font-mono tracking-wider cursor-pointer"
                >
                  Send another query
                </button>
              </motion.div>
            )}

          </div>

          {/* Right details: Direct communication cards */}
          <div className="lg:col-span-5 space-y-6">

            {/* Quick Contact Information */}
            <div className="bg-[#0A0A0A] border-2 border-orange-600 rounded-2xl p-6 space-y-5 hover:border-orange-500 transition-colors">
              <h3 className="text-base font-bold text-white tracking-tight border-b border-zinc-900 pb-3">Office </h3>

              <div className="space-y-4 text-xs text-zinc-400">
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-orange-500/5 text-orange-500 border border-orange-500/10 shrink-0">
                    <MapPin size={14} />
                  </span>
                  <div>
                    <h5 className="font-bold text-zinc-200">Office</h5>
                    <p className="mt-1 leading-relaxed">

                      Gumalpura Anekal thalli road tamilnadu
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-orange-500/5 text-orange-500 border border-orange-500/10 shrink-0">
                    <Phone size={14} />
                  </span>
                  <div>
                    <h3 className="text-white font-bold mb-1">Phone Number</h3>
                    <p className="text-zinc-400 text-sm">
                      +91 74111 31002
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">(Available 24/7 for urgent layout bookings)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-orange-500/5 text-orange-500 border border-orange-500/10 shrink-0">
                    <Mail size={14} />
                  </span>
                  <div>
                    <h3 className="text-white font-bold mb-1">Email Address</h3>
                    <p className="text-zinc-400 text-sm">
                      info@skfarmlanddevelopers.com
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
      </section>

    </motion.div>
  );
}
