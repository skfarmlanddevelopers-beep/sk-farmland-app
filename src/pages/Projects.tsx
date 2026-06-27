import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, LayoutGrid, Ruler, DollarSign, Calendar, Compass, Lock } from 'lucide-react';
import { projectList, projectLocations } from '../data';
import { ProjectItem } from '../types';

interface ProjectsProps {
  onBookClick: (projectName?: string) => void;
}

export default function Projects({ onBookClick }: ProjectsProps) {
  const [filter, setFilter] = useState<'All' | 'Ongoing' | 'Completed' | 'Upcoming'>('All');

  // Compute status counts dynamically
  const totalCount = projectList.length;
  const ongoingCount = projectList.filter((p) => p.status === 'Ongoing').length;
  const completedCount = projectList.filter((p) => p.status === 'Completed').length;
  const upcomingCount = projectList.filter((p) => p.status === 'Upcoming').length;

  const filteredProjects = projectList.filter((project) => {
    if (filter === 'All') return true;
    return project.status === filter;
  });

  return (
    <div
      id="projects-page-container"
      className="space-y-10 pb-12 pt-4"
    >
      
      {/* Header */}
      <section id="projects-hero" className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 font-mono text-[10px] uppercase tracking-widest">
          <LayoutGrid size={11} />
          Active Listings
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
          {"Explore Our Premium Farmland Projects".split(" ").map((word, i) => (
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
          Premium gated farmland properties near Bangalore & Pondicherry. Fully equipped with water networks, access roads, clear physical titles, and plantation-ready soil templates.
        </p>
      </section>

      {/* Filter Tabs & Location Breakdown Container */}
      <section id="projects-listings" className="mx-auto max-w-5xl px-4 space-y-6">
        
        {/* Toggle Status Filter Bars (Rajan Farms capsule style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {(['All', 'Ongoing', 'Completed', 'Upcoming'] as const).map((tab) => {
            const count =
              tab === 'All'
                ? totalCount
                : tab === 'Ongoing'
                ? ongoingCount
                : tab === 'Completed'
                ? completedCount
                : upcomingCount;
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-[#14532d] border-[#14532d] text-white shadow-[0_3px_12px_rgba(20,83,45,0.25)]'
                    : 'bg-[#0E0E0E] border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
                }`}
              >
                {tab} <span className="opacity-80 font-normal ml-1">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Project Card Layout Wrapper */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: ProjectItem) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                
                {/* 1. DESKTOP / LARGE SCREEN ROW LAYOUT */}
                <div className="hidden lg:flex flex-row items-stretch bg-[#0A0A0A] border border-zinc-900 rounded-3xl overflow-hidden hover:border-orange-500/25 transition-all duration-300 w-full min-h-[340px]">
                  
                  {/* Left Half: Full-height image */}
                  <div className="w-[45%] relative overflow-hidden h-auto shrink-0">
                    <img
                      src={project.image}
                      alt={project.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-85 hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/30 pointer-events-none" />

                    {/* Status Badge */}
                    <span className={`absolute top-5 left-5 text-[9px] font-bold font-mono tracking-widest uppercase px-3 py-1 rounded-md border text-white ${
                      project.status === 'Completed'
                        ? 'bg-emerald-600/90 border-emerald-500/30'
                        : project.status === 'Upcoming'
                        ? 'bg-orange-600/90 border-orange-500/30'
                        : 'bg-amber-600/90 border-amber-500/30'
                    }`}>
                      {project.status === 'Completed' ? '✅ Completed' : project.status === 'Upcoming' ? '🆕 Launching Soon' : '⚡ Ongoing'}
                    </span>

                    {/* Type Badge on Top-Right */}
                    <span className="absolute top-5 right-5 bg-black/90 backdrop-blur-md text-orange-400 text-[9px] font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-md border border-orange-500/20">
                      {project.type} Farmland
                    </span>

                    {/* Price Range Badge */}
                    <span className="absolute bottom-5 left-5 bg-orange-600 text-white text-[10px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-lg shadow-md font-mono">
                      {project.price.split(' per sq.ft')[0]}
                    </span>
                  </div>

                  {/* Right Half: Text details */}
                  <div className="w-[55%] p-8 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Name & Location header */}
                      <div className="flex items-start justify-between border-b border-zinc-900/60 pb-3 mb-3">
                        <div className="space-y-1">
                          <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight">{project.name}</h3>
                          <p className="text-xs text-zinc-500 flex items-center gap-1.5 font-mono">
                            <MapPin size={13} className="text-orange-500 shrink-0" />
                            {project.location}
                          </p>
                        </div>
                        
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold">
                          {project.distance}
                        </span>
                      </div>

                      {/* Dimension and Price grid cards */}
                      <div className="grid grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-900/60 text-xs mb-4">
                        <div className="space-y-0.5">
                          <span className="text-zinc-500 block uppercase font-mono text-[9px] tracking-wider">Dimension Range</span>
                          <span className="font-semibold text-zinc-200 flex items-center gap-1">
                            <Ruler size={12} className="text-orange-500" />
                            {project.size}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-zinc-500 block uppercase font-mono text-[9px] tracking-wider">Pricing Context</span>
                          <span className="font-semibold text-zinc-200 flex items-center gap-1">
                            <DollarSign size={12} className="text-orange-500" />
                            {project.price}
                          </span>
                        </div>
                      </div>

                      {/* Inclusions checklist list */}
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-bold">Included features:</p>
                        <ul className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-orange-500 shrink-0">✔</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Book Free Site Visit Button */}
                    <div className="pt-4 border-t border-zinc-900">
                      <button
                        onClick={() => onBookClick(project.name)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase shadow-[0_4px_12px_rgba(249,115,22,0.15)] transition-all cursor-pointer"
                      >
                        <Calendar size={13} />
                        Book Free Site Visit
                      </button>
                    </div>
                  </div>

                </div>

                {/* 2. RESPONSIVE / MOBILE CARD LAYOUT (Rajan Farms Overlaid Style) */}
                <div className="lg:hidden relative overflow-hidden rounded-3xl border border-zinc-900 aspect-[4/5] flex flex-col justify-end p-5 shadow-2xl group w-full">
                  
                  {/* Cover Image Background */}
                  <img
                    src={project.image}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                  />
                  {/* Dark gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                  {/* Top Badges overlay: Status and Type */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className={`text-[8px] sm:text-[9px] font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-md border text-white ${
                      project.status === 'Completed'
                        ? 'bg-emerald-600/95 border-emerald-500/30'
                        : project.status === 'Upcoming'
                        ? 'bg-orange-600/95 border-orange-500/30'
                        : 'bg-amber-600/95 border-amber-500/30'
                    }`}>
                      {project.status === 'Completed' ? '✅ Completed' : project.status === 'Upcoming' ? '🆕 Launching Soon' : '⚡ Ongoing'}
                    </span>

                    <span className="bg-black/85 backdrop-blur-sm text-orange-400 text-[8px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-orange-500/20">
                      {project.type}
                    </span>
                  </div>

                  {/* Top features tag bubbles (stacked below the status badge) */}
                  <div className="absolute top-14 left-4 z-20 flex flex-wrap gap-1 pointer-events-none">
                    {project.features.slice(0, 2).map((feat, idx) => (
                      <span key={idx} className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[8px] px-2 py-0.5 rounded-full font-medium">
                        {feat.split(' with ')[0].split(' & ')[0]}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="relative z-20 space-y-2 w-full text-left">
                    {/* Location Corridor Label */}
                    <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider font-mono">
                      {project.location.includes('Pondicherry') ? 'NEAR PONDICHERRY' : 'NEAR BANGALORE'}
                    </p>

                    {/* Bold Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none pt-0.5">
                      {project.name}
                    </h3>

                    {/* Subtitle description */}
                    <p className="text-[10px] sm:text-xs text-zinc-300 font-medium leading-relaxed">
                      {project.id === 'sk-green-acres' && 'Serene managed plantation community with fruit trees'}
                      {project.id === 'sk-tamarind-valley' && 'Grand entrance retreat layouts near Hosur'}
                      {project.id === 'sk-nature-retreat' && 'Spectacular mountain view layouts and organic soil'}
                      {project.id === 'sk-heritage-orchards' && 'Budget friendly appreciation plain land plots'}
                      {project.id === 'sk-banyan-echoes' && 'Serene Miyawaki forest community grids'}
                      {project.id === 'sk-misty-heights' && 'Panoramic misty hilltop gated farmlands'}
                    </p>

                    {/* Location with Pin */}
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                      <MapPin size={11} className="text-orange-500 shrink-0" />
                      <span>{project.location.split(',')[0]}</span>
                    </div>

                    {/* Action buttons matching Image 3 layout */}
                    <div className="flex items-center gap-2.5 w-full pt-1.5">
                      {/* Solid Green button */}
                      <button
                        onClick={() => onBookClick(project.name)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#14532d] hover:bg-[#166534] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-2.5 px-2 rounded-full transition-colors cursor-pointer border border-emerald-800/30 shadow-lg whitespace-nowrap"
                      >
                        <Lock size={11} className="text-white/80 shrink-0" />
                        <span className="whitespace-nowrap">Unlock Price</span>
                      </button>

                      {/* Translucent Glass button */}
                      <button
                        onClick={() => onBookClick(project.name)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/15 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-2.5 px-2 rounded-full transition-all cursor-pointer whitespace-nowrap"
                      >
                        <span className="whitespace-nowrap">View More →</span>
                      </button>
                    </div>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* Corridor coverage map section */}
      <section id="project-locations-list" className="mx-auto max-w-5xl px-4">
        <div className="bg-[#090909] border border-zinc-900 rounded-3xl p-6 md:p-10 space-y-6">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 font-mono">
              📍 Geolocation Coverage
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Prime Agricultural Locations Mapping Near Bangalore
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Our projects are strategically located in rapid economic corridors, ensuring both rich soil fertility for organic farming and massive future land appreciation value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {projectLocations.map((loc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-900 hover:border-orange-500/20 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/5 text-orange-500 flex items-center justify-center border border-orange-500/10 text-xs font-bold font-mono">
                  0{i + 1}
                </div>
                <span className="text-xs sm:text-sm font-medium text-zinc-300">{loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
