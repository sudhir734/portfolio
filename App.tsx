import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import OperationsSection from './components/OperationsSection';
import ResearchSection from './components/ResearchSection';
import LabSection from './components/LabSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import BackgroundDecoration from './components/BackgroundDecoration';
import CyberTerminal from './components/CyberTerminal';
import ProjectModal from './components/ProjectModal';
import PgpKeyDrawer from './components/PgpKeyDrawer';
import ContactModal from './components/ContactModal';
import BountyReaderModal from './components/BountyReaderModal';
import HandbookModal from './components/HandbookModal';
import { Terminal as TerminalIcon } from 'lucide-react';
import { soundFx } from './utils/soundFx';
import type { Operation } from './data/operations';

export default function App() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [activeModalOp, setActiveModalOp] = useState<Operation | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPgpOpen, setIsPgpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBountyOpen, setIsBountyOpen] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);

  // Keyboard shortcut `~` or `Ctrl+K` to toggle cyber terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '`' && !e.target) || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        soundFx.playCyberBlip();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-[#080808] selection:bg-[#080808] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background Architectural Geometry */}
      <BackgroundDecoration />

      {/* Accessible skip link */}
      <a href="#overview" className="skip-link">
        Skip to main content
      </a>

      {/* Sticky Editorial Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          selectedDomain={selectedDomain}
          onSelectDomain={setSelectedDomain}
          onOpenTerminal={() => {
            soundFx.playCyberBlip();
            setIsTerminalOpen(true);
          }}
          onOpenPgp={() => {
            soundFx.playClick();
            setIsPgpOpen(true);
          }}
        />
        <StatsBar />
        <OperationsSection
          selectedDomain={selectedDomain}
          onOpenModal={(op) => {
            soundFx.playClick();
            setActiveModalOp(op);
          }}
          onResetDomain={() => setSelectedDomain(null)}
        />
        <ResearchSection
          onOpenBounties={() => {
            soundFx.playClick();
            setIsBountyOpen(true);
          }}
          onOpenHandbook={() => {
            soundFx.playClick();
            setIsHandbookOpen(true);
          }}
        />
        <LabSection />
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Cyber Terminal Trigger Button (Bottom Right) */}
      <button
        onClick={() => {
          soundFx.playCyberBlip();
          setIsTerminalOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 bg-[#080808] text-white px-4 py-2.5 rounded-full border border-[#333] shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:bg-[#1a1a1a] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 text-[11px] font-mono font-bold tracking-wider cursor-pointer"
        aria-label="Open cyber terminal"
      >
        <TerminalIcon size={14} className="text-[#4ade80]" />
        <span>&gt;_ TERMINAL</span>
      </button>

      {/* Interactive Cyber Terminal Modal */}
      <CyberTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Project Inspector & Attack Simulator Modal */}
      <ProjectModal
        operation={activeModalOp}
        onClose={() => setActiveModalOp(null)}
      />

      {/* PGP Public Key Verification Drawer */}
      <PgpKeyDrawer
        isOpen={isPgpOpen}
        onClose={() => setIsPgpOpen(false)}
      />

      {/* Contact Channel Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onOpenPgp={() => setIsPgpOpen(true)}
      />

      {/* Bug Bounty Case Studies Modal */}
      <BountyReaderModal
        isOpen={isBountyOpen}
        onClose={() => setIsBountyOpen(false)}
      />

      {/* Offensive Security Handbook Modal */}
      <HandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />
    </div>
  );
}
