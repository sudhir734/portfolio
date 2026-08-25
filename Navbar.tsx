import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

const navLinks = [
  { label: 'OVERVIEW', href: '#overview' },
  { label: 'OPERATIONS', href: '#operations' },
  { label: 'RESEARCH', href: '#research' },
  { label: 'LAB', href: '#lab' },
  { label: 'ABOUT', href: '#about' },
];

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    const sections = navLinks.map((l) => l.href.slice(1));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 120) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
        {/* Logo + Name */}
        <a
          href="#overview"
          onClick={(e) => { e.preventDefault(); scrollTo('#overview'); }}
          className="flex items-center gap-3 group"
        >
          {/* Diamond Logo */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="shrink-0">
            <rect
              x="15" y="1" width="18" height="18"
              transform="rotate(45 15 1)"
              fill="#080808"
              stroke="#080808"
              strokeWidth="0.5"
            />
            <rect
              x="15" y="5" width="12" height="12"
              transform="rotate(45 15 5)"
              fill="#222"
            />
            <polygon points="15,4 20,15 15,26 10,15" fill="#080808" opacity="0.8" />
          </svg>
          <div className="leading-tight">
            <div className="text-[13px] font-extrabold tracking-[0.08em] text-[#080808]">
              SUDHIR GUNNAM
            </div>
            <div className="text-[9px] font-semibold tracking-[0.18em] text-[#999] uppercase">
              Security Engineer
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`relative text-[11px] font-semibold tracking-[0.14em] transition-colors duration-200 pb-1 ${
                    isActive ? 'text-[#080808]' : 'text-[#999] hover:text-[#080808]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <>
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#080808]" />
                      <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[#080808]" />
                    </>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Section: Sound Toggle + Contact Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.enabled = !soundFx.enabled;
              setSoundActive(soundFx.enabled);
              if (soundFx.enabled) soundFx.playCyberBlip();
            }}
            className={`p-2 rounded-full border text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
              soundActive
                ? 'bg-[#fafafa] border-[#e0e0e0] text-[#080808] hover:border-[#080808]'
                : 'bg-transparent border-transparent text-[#999] hover:text-[#080808]'
            }`}
            title={`Cyber Audio FX: ${soundActive ? 'ENABLED' : 'MUTED'}`}
          >
            {soundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="text-[9px] font-bold uppercase">{soundActive ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          {/* Desktop Contact Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenContact?.();
            }}
            className="inline-flex items-center gap-2.5 bg-[#080808] text-white text-[11px] font-black tracking-[0.16em] uppercase px-7 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:bg-[#1a1a1a] hover:shadow-[0_6px_20px_rgba(0,0,0,0.26)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>CONTACT</span>
            <span className="text-[8px] text-white/90">◆</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[#080808] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#080808] rounded"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-2xl font-bold tracking-[0.1em] text-[#080808] hover:text-[#666] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenContact?.();
            }}
            className="mt-4 bg-[#080808] text-white text-sm font-bold tracking-[0.12em] uppercase px-8 py-3 rounded-full"
          >
            CONTACT ◆
          </button>
        </div>
      )}
    </nav>
  );
}
