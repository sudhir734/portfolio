import { useState } from 'react';
import { motion } from 'framer-motion';
import { operations, type Operation } from '../data/operations';
import CardGeometry from './CardGeometry';
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface Scene03WorkProps {
  onOpenModal: (op: Operation) => void;
}

export default function Scene03Work({ onOpenModal }: Scene03WorkProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % operations.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + operations.length) % operations.length);
  };

  const currentOp = operations[activeIndex];

  return (
    <section
      id="work"
      className="relative min-h-[90vh] py-20 px-6 md:px-12 border-t border-[#1a1e24] bg-[#08090b] overflow-hidden z-10"
    >
      <div className="max-w-[1400px] w-full mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#10b981] uppercase mb-2">
              <ShieldCheck size={14} />
              <span>SCENE 03 // SELECTED OPERATIONS</span>
            </div>
            <h2 className="text-[36px] md:text-[54px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#f0f3f6]">
              ENGINEERED<br />SECURITY WORK
            </h2>
          </div>

          {/* Project Carousel Controls */}
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-mono text-[#7e8794]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(operations.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                className="p-3 rounded-full border border-[#1a1e24] bg-[#0e1014] text-[#f0f3f6] hover:border-[#10b981] hover:text-[#10b981] transition-colors cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextProject}
                className="p-3 rounded-full border border-[#1a1e24] bg-[#0e1014] text-[#f0f3f6] hover:border-[#10b981] hover:text-[#10b981] transition-colors cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Large Project Theater (Low-Scroll Immersive Viewport) */}
        <motion.div
          key={currentOp.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onOpenModal(currentOp)}
          data-cursor="project"
          className="bg-[#0e1014] border border-[#1a1e24] rounded-[28px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-[#10b981] hover:shadow-[0_20px_60px_rgba(16,185,129,0.06)] transition-all duration-300 cursor-pointer group select-none"
        >
          {/* Left Metadata & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-mono font-black text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/30 uppercase">
                {currentOp.status}
              </span>
              <span className="text-[11px] font-mono tracking-widest text-[#7e8794] uppercase">
                DOMAIN: {currentOp.domain.toUpperCase()}
              </span>
            </div>

            <h3 className="text-[28px] md:text-[38px] font-black uppercase text-[#f0f3f6] leading-tight group-hover:text-[#10b981] transition-colors">
              {currentOp.title}
            </h3>

            <div className="text-[13px] font-mono text-[#7e8794]">
              {currentOp.category}
            </div>

            <p className="text-[14px] md:text-[15px] text-[#8e99a8] leading-relaxed max-w-[540px]">
              {currentOp.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-2">
              {currentOp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-3 py-1 bg-[#14181e] border border-[#222832] rounded-lg text-[#cad2dc]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action link */}
            <div className="pt-4 flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-[#10b981] group-hover:underline">
              <span>LAUNCH THREAT INSPECTOR & ARCHITECTURE</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Right Isometric 3D Artwork (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center p-6 bg-[#060709] rounded-2xl border border-[#1a1e24] h-[260px] md:h-[300px]">
            <div className="transform group-hover:scale-105 transition-transform duration-500">
              <CardGeometry variant={currentOp.id} />
            </div>
          </div>
        </motion.div>

        {/* 4-Project Direct Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {operations.map((op, idx) => (
            <button
              key={op.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'bg-[#14181e] border-[#10b981] text-[#f0f3f6]'
                  : 'bg-[#0e1014] border-[#1a1e24] text-[#7e8794] hover:border-[#333] hover:text-[#f0f3f6]'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-[#10b981] mb-1">
                {op.number}
              </div>
              <div className="text-[12px] font-bold uppercase truncate">
                {op.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
