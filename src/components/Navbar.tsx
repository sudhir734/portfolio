import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

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

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fafafa]/90 backdrop-blur-md border-b border-[#e8e8e8] py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Section: Logo + Name + Monogram */}
        <div className="flex items-center gap-3">
          <a
            href="#overview"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            aria-label="Home"
          >
            {/* Minimal Geometric Logo Icon */}
            <div className="w-5 h-5 bg-[#080808] rotate-45 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-90">
              <div className="w-1.5 h-1.5 bg-white" />
            </div>

            {/* Name */}
            <span className="text-[13px] font-black tracking-[0.14em] uppercase text-[#080808]">
              SUDHIR GUNNAM
            </span>
          </a>

          {/* Forward slash separator */}
          <span className="text-[#d0d0d0] text-xs font-light select-none">/</span>

          {/* Sub-label */}
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#888888] hidden sm:inline">
            PORTFOLIO
          </span>
        </div>

        {/* Center Section: Navigation Links (Desktop) */}
        <ul className="hidden lg:flex items-center gap-8 text-[11px] font-extrabold tracking-[0.16em] uppercase list-none m-0 p-0">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`transition-colors duration-200 py-1 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#080808] font-black'
                      : 'text-[#888888] hover:text-[#080808]'
                  }`}
                >
                  {isActive && <span className="text-[8px] text-[#080808]">●</span>}
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Section: Contact Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => onOpenContact?.()}
            className="inline-flex items-center gap-2.5 bg-[#080808] text-white text-[11px] font-black tracking-[0.16em] uppercase px-7 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:bg-[#1a1a1a] hover:shadow-[0_6px_20px_rgba(0,0,0,0.26)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>CONTACT</span>
            <span className="text-[8px] text-white/90">◆</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-[#080808] hover:bg-[#f0f0f0] transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#fafafa]/98 backdrop-blur-lg z-40 px-6 py-8 flex flex-col justify-between border-t border-[#e8e8e8]">
          <ul className="flex flex-col gap-6 text-[14px] font-extrabold tracking-[0.18em] uppercase list-none p-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#080808] hover:text-[#555] block py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-[#e8e8e8] flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenContact?.();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#080808] text-white text-[12px] font-black tracking-[0.18em] uppercase py-3.5 rounded-full shadow-md"
            >
              <span>CONTACT</span>
              <span className="text-[8px]">◆</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
