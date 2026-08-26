import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal as TerminalIcon } from 'lucide-react';
import { soundFx } from '../utils/soundFx';
import Magnetic from './Magnetic';

interface CinematicNavbarProps {
  onOpenTerminal: () => void;
  onOpenContact: () => void;
  activeScene?: string;
}

export default function CinematicNavbar({
  onOpenTerminal,
  onOpenContact,
  activeScene = 'identity',
}: CinematicNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [timeStr, setTimeStr] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'IDENTITY', href: '#identity' },
    { label: 'WORK', href: '#work' },
    { label: 'SYSTEM', href: '#system' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#060709]/80 backdrop-blur-xl border-b border-[#1a1e24] shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <Magnetic strength={0.25}>
            <a
              href="#identity"
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            >
              {/* Minimal Geometric Mask Icon */}
              <div className="w-5 h-5 bg-[#10b981] rotate-45 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-90">
                <div className="w-1.5 h-1.5 bg-[#060709]" />
              </div>
              <span className="text-[12px] font-mono font-bold tracking-[0.2em] text-[#f0f3f6] uppercase">
                SUDHIR GUNNAM
              </span>
            </a>
          </Magnetic>

          <span className="text-[#333] text-xs select-none">/</span>

          {/* Time Telemetry */}
          <span className="text-[10px] font-mono tracking-wider text-[#7e8794] hidden md:inline">
            IST {timeStr}
          </span>
        </div>

        {/* Center Scene Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeScene === link.label.toLowerCase();
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-[11px] font-mono tracking-[0.2em] uppercase transition-colors py-1 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#10b981] font-bold'
                    : 'text-[#7e8794] hover:text-[#f0f3f6]'
                }`}
              >
                {isActive && <span className="w-1 h-1 rounded-full bg-[#10b981]" />}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Terminal Launcher */}
          <button
            onClick={() => {
              soundFx.playCyberBlip();
              onOpenTerminal();
            }}
            className="p-2 rounded-full border border-[#1a1e24] bg-[#0e1014] text-[#7e8794] hover:text-[#10b981] hover:border-[#10b981] text-[10px] font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Launch Terminal (>_)"
          >
            <TerminalIcon size={13} />
            <span className="hidden sm:inline text-[9px] font-bold tracking-wider">&gt;_ CLI</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              soundFx.enabled = !soundFx.enabled;
              setSoundActive(soundFx.enabled);
              if (soundFx.enabled) soundFx.playCyberBlip();
            }}
            className="p-2 rounded-full border border-[#1a1e24] bg-[#0e1014] text-[#7e8794] hover:text-[#f0f3f6] text-[10px] font-mono transition-colors cursor-pointer"
            title={`Cyber Audio: ${soundActive ? 'ON' : 'MUTED'}`}
          >
            {soundActive ? <Volume2 size={13} className="text-[#10b981]" /> : <VolumeX size={13} />}
          </button>

          {/* Magnetic Contact Button */}
          <Magnetic strength={0.3}>
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenContact();
              }}
              className="inline-flex items-center gap-2 bg-[#f0f3f6] text-[#060709] text-[11px] font-mono font-bold tracking-[0.16em] uppercase px-5 py-2 rounded-full hover:bg-[#10b981] hover:text-[#060709] transition-all duration-200 cursor-pointer shadow-lg"
            >
              <span>CONTACT</span>
              <span className="text-[8px]">◆</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
