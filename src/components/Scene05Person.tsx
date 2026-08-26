import { motion } from 'framer-motion';
import { BookOpen, Bug, FileDown, ExternalLink } from 'lucide-react';
import Magnetic from './Magnetic';

interface Scene05PersonProps {
  onOpenBounties: () => void;
  onOpenHandbook: () => void;
}

export default function Scene05Person({ onOpenBounties, onOpenHandbook }: Scene05PersonProps) {
  return (
    <section
      id="about"
      className="relative min-h-[85vh] py-20 px-6 md:px-12 border-t border-[#1a1e24] bg-[#08090b] overflow-hidden z-10"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#10b981] uppercase">
            <BookOpen size={14} />
            <span>SCENE 05 // THE ETHICAL PERSON</span>
          </div>

          <h2 className="text-[36px] md:text-[54px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#f0f3f6]">
            ENGINEERING,<br />ETHICS & OSINT
          </h2>

          <p className="text-[15px] text-[#8e99a8] leading-relaxed">
            Offensive security is not about destruction — it is the science of uncovering systemic vulnerabilities before malicious adversaries can exploit them.
          </p>

          <Magnetic strength={0.3}>
            <a
              href="/Sudhir_Gunnam_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#10b981] text-[#060709] rounded-full px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-[0.16em] hover:bg-white transition-colors"
            >
              <FileDown size={14} />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </Magnetic>
        </div>

        {/* Right Column: Research Case Studies & Handbook Interactive Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Bug Bounty Vulnerability Research */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#0e1014] border border-[#1a1e24] rounded-[24px] p-8 space-y-4 hover:border-[#10b981] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-[#10b981] uppercase bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/30">
                <Bug size={13} />
                DISCLOSED ON HACKERONE
              </span>
              <span className="text-[11px] font-mono text-[#7e8794]">JAN 2026</span>
            </div>

            <h3 className="text-[20px] font-black uppercase text-[#f0f3f6]">
              WebSocket Broken Authentication (CWE-306)
            </h3>

            <p className="text-[14px] text-[#8e99a8] leading-relaxed">
              Demonstrated missing token verification during WebSocket HTTP Upgrade handshakes on production microservices, permitting unauthorized real-time telemetry eavesdropping.
            </p>

            <button
              onClick={onOpenBounties}
              className="text-[11px] font-mono font-bold text-[#10b981] hover:underline inline-flex items-center gap-1.5 cursor-pointer pt-2"
            >
              <span>INSPECT CASE STUDY & REPORT TIMELINE</span>
              <ExternalLink size={13} />
            </button>
          </motion.div>

          {/* Card 2: Offensive Security Handbook */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#0e1014] border border-[#1a1e24] rounded-[24px] p-8 space-y-4 hover:border-[#10b981] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-[#f0f3f6] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <BookOpen size={13} />
                SELF-AUTHORED REFERENCE
              </span>
              <span className="text-[11px] font-mono text-[#7e8794]">15 CHAPTERS</span>
            </div>

            <h3 className="text-[20px] font-black uppercase text-[#f0f3f6]">
              Offensive Security Tradecraft Handbook
            </h3>

            <p className="text-[14px] text-[#8e99a8] leading-relaxed">
              Offline reference synthesizing practical exploitation methodology, Active Directory Kerberoasting attack chains, pivoting, and bug bounty recon triage.
            </p>

            <button
              onClick={onOpenHandbook}
              className="text-[11px] font-mono font-bold text-[#f0f3f6] hover:underline inline-flex items-center gap-1.5 cursor-pointer pt-2"
            >
              <span>BROWSE 15 CHAPTER SYLLABUS & PLAYBOOK</span>
              <ExternalLink size={13} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
