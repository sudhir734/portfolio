import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import Counter from './Counter';

interface Scene02IdentityProps {
  onOpenTerminal: () => void;
  onOpenPgp: () => void;
}

export default function Scene02Identity({ onOpenTerminal, onOpenPgp }: Scene02IdentityProps) {
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="identity"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden z-10"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Architectural Editorial Identity (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#10b981] uppercase">
              SCENE 02 // IDENTITY & CLEARANCE
            </span>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-[clamp(44px,6.5vw,92px)] font-[900] tracking-[-0.04em] uppercase leading-[0.9] text-[#f0f3f6]">
              WHO IS<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0f3f6] via-[#7e8794] to-[#f0f3f6]">
                BEHIND THE MASK?
              </span>
            </h1>
          </motion.div>

          {/* Identity Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[15px] md:text-[17px] text-[#8e99a8] leading-relaxed max-w-[580px] font-normal"
          >
            <strong className="text-[#f0f3f6] font-semibold">Sudhir Gunnam</strong> — B.Tech IT student (2024–2028) at DVR & Dr. HS MIC College of Technology, specializing in offensive security, penetration testing, bug bounty vulnerability research, and real-time defensive intrusion detection systems.
          </motion.p>

          {/* Magnetic CTA Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Magnetic strength={0.3}>
              <button
                onClick={scrollToWork}
                className="group inline-flex items-center gap-2.5 bg-[#f0f3f6] text-[#060709] rounded-full px-8 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.18em] shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:bg-[#10b981] hover:text-[#060709] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>EXPLORE OPERATIONS</span>
                <span className="text-[8px]">◆</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="/Sudhir_Gunnam_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-[#0e1014] text-[#f0f3f6] border border-[#1a1e24] rounded-full px-8 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.18em] hover:border-[#10b981] hover:text-[#10b981] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>VIEW RESUME</span>
                <span className="text-[8px]">↗</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Quick Technical Channels */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-5 text-[11px] font-mono text-[#7e8794] pt-2"
          >
            <button
              onClick={onOpenTerminal}
              className="hover:text-[#10b981] transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
            >
              <span>&gt;_ Launch Terminal</span>
            </button>
            <span className="text-[#333]">/</span>
            <button
              onClick={onOpenPgp}
              className="hover:text-[#10b981] transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
            >
              <span>PGP 4096R</span>
            </button>
            <span className="text-[#333]">/</span>
            <span className="text-[#10b981]">eJPT In Pursuit</span>
          </motion.div>
        </div>

        {/* Right Column: Character Visual Rig & Floating Telemetry Bento (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Character Stand with Subtle Breathing Float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
          >
            {/* Holographic Ring */}
            <div className="absolute inset-0 rounded-full border border-[#1a1e24] animate-spin-slow opacity-40 pointer-events-none" />

            {/* Character Image */}
            <img
              src="/hacker-mask.png"
              alt="Masked Identity"
              className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] relative z-10 pointer-events-none select-none"
            />
          </motion.div>

          {/* Floating Live Metric Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-4 right-0 bg-[#0e1014]/90 backdrop-blur-md border border-[#1a1e24] rounded-2xl p-4 shadow-2xl z-20"
          >
            <div className="text-[9px] font-mono tracking-widest text-[#7e8794] uppercase mb-1">
              ACTIVE CLEARANCE
            </div>
            <div className="text-[20px] font-mono font-bold text-[#10b981] flex items-center gap-2">
              <span><Counter value="04" /></span>
              <span className="text-[11px] font-mono font-normal text-[#f0f3f6]">OPERATIONS BUILT</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
