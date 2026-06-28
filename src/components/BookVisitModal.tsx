import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Phone, Mail, User, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { projectList } from '../data';
import { LeadSubmission } from '../types';

interface BookVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProject?: string;
}

export default function BookVisitModal({ isOpen, onClose, preSelectedProject = '' }: BookVisitModalProps) {
  const [formData, setFormData] = useState<LeadSubmission>({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    projectInterest: preSelectedProject || 'Managed Farmland (Hassle-Free Option)',
    notes: '',
    budget: '₹40–60 Lakhs',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API request to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Persist submission locally in localStorage as a backup
      try {
        const existingLeads = JSON.parse(localStorage.getItem('sk_leads') || '[]');
        localStorage.setItem('sk_leads', JSON.stringify([...existingLeads, { ...formData, timestamp: new Date().toISOString() }]));
      } catch (e) {
        console.error('Failed to save lead', e);
      }
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      preferredDate: '',
      projectInterest: 'Managed Farmland (Hassle-Free Option)',
      notes: '',
      budget: '₹40–60 Lakhs',
    });
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with elegant glass blur */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[#0E0E0E] border border-orange-500/20 rounded-2xl shadow-[0_10px_50px_rgba(249,115,22,0.15)] z-10"
          >
            {/* Top decorative gradient border */}
            <div className="h-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-orange-500 hover:bg-black p-2 rounded-full transition-all z-20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-500">📞 Get In Touch</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Looking to own farmland near Bangalore? Our team is here to guide you at every step—from selecting the right plot to booking your site visit. We’ll help you choose the best option based on your budget and requirements.
                  </p>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-900 text-[11px] text-zinc-300 leading-normal">
                    📍 <strong>Book Your Site Visit Today:</strong> Fill the form below or contact us directly:
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Name and Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">Name *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                          <User size={15} />
                        </span>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your name"
                          className="w-full bg-[#161616] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">Phone Number *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                          <Phone size={15} />
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter phone number"
                          className="w-full bg-[#161616] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                        <Mail size={15} />
                      </span>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email address"
                        className="w-full bg-[#161616] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Project & Budget grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project of Interest */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">Interested Option</label>
                      <select
                        value={formData.projectInterest}
                        onChange={(e) => setFormData({ ...formData, projectInterest: e.target.value })}
                        className="w-full bg-[#161616] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 px-3 text-sm outline-none transition-all"
                      >
                        <option value="Managed Farmland (Hassle-Free Option)" className="bg-[#161616]">
                          Managed Farmland (Hassle-Free Option)
                        </option>
                        {projectList.map((project) => (
                          <option key={project.id} value={project.name} className="bg-[#161616]">
                            {project.name} ({project.type})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Select Budget (dropdown list) */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">Select Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#161616] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg py-2.5 px-3 text-sm outline-none transition-all"
                      >
                        <option value="₹40–60 Lakhs" className="bg-[#161616]">₹40–60 Lakhs</option>
                        <option value="₹60–80 Lakhs" className="bg-[#161616]">₹60–80 Lakhs</option>
                        <option value="₹80 Lakhs & Above" className="bg-[#161616]">₹80 Lakhs & Above</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Notes */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Preferred Date / Additional Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Specify preferred site visit dates or custom requirements..."
                      rows={2}
                      className="w-full bg-[#161616] border border-zinc-800 focus:border-orange-500 text-zinc-100 rounded-lg p-3 text-sm outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-5 space-y-3">
                  <p className="text-[11px] text-orange-400 font-medium font-mono text-center flex items-center justify-center gap-1.5 bg-orange-500/5 py-2 px-3 border border-orange-500/10 rounded-lg">
                    <span>👉</span> “Limited plots available – Book your site visit now
                  </p>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-3.5 rounded-lg hover:from-orange-500 hover:to-amber-400 active:scale-[0.98] transition-all text-xs disabled:opacity-50 shadow-[0_4px_15px_rgba(249,115,22,0.3)] cursor-pointer tracking-wider uppercase"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Scheduling Visit...
                      </span>
                    ) : (
                      <>
                        Confirm Booking & Site Visit
                        <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {/* Transparency notice */}
                <p className="text-[10px] text-zinc-500 text-center mt-3">
                  🛡 100% Privacy Guaranteed. We never spam. Free pick-up and drop-off are organized from key Bengaluru hub points.
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="p-8 text-center flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                  className="w-16 h-16 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6 border border-orange-500/20"
                >
                  <CheckCircle2 size={36} className="stroke-[1.5]" />
                </motion.div>

                <h3 className="text-xl font-semibold text-white tracking-tight">
                  Site Visit Successfully Scheduled!
                </h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-sm">
                  Thank you, <strong className="text-orange-500">{formData.name}</strong>. Your request for{' '}
                  <strong className="text-zinc-200">{formData.projectInterest}</strong> is received.
                </p>

                {/* Details Box */}
                <div className="w-full bg-[#161616] rounded-xl p-4 my-6 text-left border border-zinc-800/60 text-xs text-zinc-300 space-y-2.5">
                  <div className="flex justify-between border-b border-zinc-800/60 pb-2">
                    <span className="text-zinc-500">Scheduled Date:</span>
                    <span className="font-medium text-orange-400">{formData.preferredDate || 'To be confirmed'}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/60 pb-2">
                    <span className="text-zinc-500">Transport Pick-Up:</span>
                    <span className="font-medium text-emerald-400">Complimentary Provided</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 text-center pt-1 leading-relaxed">
                    📞 Our Farmland Coordinator will call you at <strong className="text-zinc-200">{formData.phone}</strong> within 2 hours to coordinate transport and share route plans.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white px-6 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
