import { Mail, Phone, Key, Terminal as TerminalIcon, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

interface Scene06ExitProps {
  onOpenContact: () => void;
  onOpenPgp: () => void;
  onOpenTerminal: () => void;
}

export default function Scene06Exit({
  onOpenContact,
  onOpenPgp,
  onOpenTerminal,
}: Scene06ExitProps) {
  return (
    <footer
      id="contact"
      className="relative min-h-[80vh] py-24 px-6 md:px-12 border-t border-[#1a1e24] bg-[#050608] flex flex-col justify-between overflow-hidden z-10"
    >
      {/* Background Mask Silhouette Receding into Darkness */}
      <div className="absolute right-0 bottom-0 w-[400px] md:w-[600px] aspect-square opacity-15 pointer-events-none select-none">
        <img
          src="/hacker-mask.png"
          alt="Mask Silhouette"
          className="w-full h-full object-contain filter grayscale contrast-150"
        />
      </div>

      <div className="max-w-[1400px] w-full mx-auto space-y-16 relative z-10">
        {/* Top Eyebrow */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#10b981] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span>SCENE 06 // THE HORIZON & TRANSMISSION</span>
        </div>

        {/* Large Editorial Headline */}
        <div className="space-y-4">
          <h2 className="text-[clamp(44px,7vw,100px)] font-[900] tracking-[-0.04em] uppercase leading-[0.88] text-[#f0f3f6]">
            LET'S BUILD<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#38bdf8] to-[#f0f3f6]">
              SOMETHING SECURE.
            </span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#8e99a8] max-w-[500px]">
            Open for offensive security roles, penetration testing engagements, vulnerability research collaboration, and red teaming.
          </p>
        </div>

        {/* Direct Transmission Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Magnetic strength={0.3}>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2.5 bg-[#f0f3f6] text-[#060709] rounded-full px-8 py-4 text-[12px] font-mono font-bold uppercase tracking-[0.18em] hover:bg-[#10b981] hover:text-[#060709] transition-all cursor-pointer shadow-2xl"
            >
              <Mail size={15} />
              <span>INITIATE CONTACT</span>
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <button
              onClick={onOpenPgp}
              className="inline-flex items-center gap-2.5 bg-[#0e1014] text-[#f0f3f6] border border-[#1a1e24] rounded-full px-7 py-4 text-[11px] font-mono font-bold uppercase tracking-[0.18em] hover:border-[#10b981] hover:text-[#10b981] transition-all cursor-pointer"
            >
              <Key size={14} />
              <span>PGP PUBLIC KEY</span>
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2.5 bg-[#0e1014] text-[#f0f3f6] border border-[#1a1e24] rounded-full px-7 py-4 text-[11px] font-mono font-bold uppercase tracking-[0.18em] hover:border-[#10b981] hover:text-[#10b981] transition-all cursor-pointer"
            >
              <TerminalIcon size={14} className="text-[#10b981]" />
              <span>&gt;_ OPEN CYBER CLI</span>
            </button>
          </Magnetic>
        </div>

        {/* Channel Links Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#1a1e24]">
          <a
            href="mailto:gunnamsudhir5@gmail.com"
            className="p-4 rounded-xl bg-[#0e1014] border border-[#1a1e24] flex items-center justify-between hover:border-[#10b981] transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Mail size={16} className="text-[#10b981] shrink-0" />
              <div className="text-[12px] font-mono text-[#cad2dc] group-hover:text-white truncate">
                gunnamsudhir5@gmail.com
              </div>
            </div>
            <ArrowUpRight size={13} className="text-[#7e8794] group-hover:text-[#10b981] shrink-0" />
          </a>

          <a
            href="tel:8919882181"
            className="p-4 rounded-xl bg-[#0e1014] border border-[#1a1e24] flex items-center justify-between hover:border-[#10b981] transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Phone size={16} className="text-[#10b981] shrink-0" />
              <div className="text-[12px] font-mono text-[#cad2dc] group-hover:text-white">
                +91 8919882181
              </div>
            </div>
            <ArrowUpRight size={13} className="text-[#7e8794] group-hover:text-[#10b981] shrink-0" />
          </a>

          <a
            href="https://github.com/sudhir734"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#0e1014] border border-[#1a1e24] flex items-center justify-between hover:border-[#10b981] transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <svg className="w-4 h-4 fill-[#10b981] shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <div className="text-[12px] font-mono text-[#cad2dc] group-hover:text-white">
                github.com/sudhir734
              </div>
            </div>
            <ArrowUpRight size={13} className="text-[#7e8794] group-hover:text-[#10b981] shrink-0" />
          </a>

          <a
            href="https://linkedin.com/in/sudhirgunnam"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#0e1014] border border-[#1a1e24] flex items-center justify-between hover:border-[#10b981] transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <svg className="w-4 h-4 fill-[#10b981] shrink-0" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <div className="text-[12px] font-mono text-[#cad2dc] group-hover:text-white">
                linkedin.com/in/sudhirgunnam
              </div>
            </div>
            <ArrowUpRight size={13} className="text-[#7e8794] group-hover:text-[#10b981] shrink-0" />
          </a>
        </div>
      </div>

      {/* Bottom Legal / Editorial Signature */}
      <div className="max-w-[1400px] w-full mx-auto pt-16 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#7e8794] gap-4 relative z-10">
        <div>© 2026 SUDHIR GUNNAM // ALL RIGHTS RESERVED</div>
        <div className="text-[#10b981]">OFFENSIVE SECURITY · RED TEAMING · IDS</div>
      </div>
    </footer>
  );
}
