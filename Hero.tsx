import SystemVisualization from './SystemVisualization';

interface HeroProps {
  selectedDomain: string | null;
  onSelectDomain: (domain: string | null) => void;
  onOpenTerminal: () => void;
  onOpenPgp: () => void;
}

export default function Hero({
  selectedDomain,
  onSelectDomain,
  onOpenTerminal,
  onOpenPgp,
}: HeroProps) {
  const scrollToOperations = () => {
    document.getElementById('operations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="overview"
      className="relative pt-[88px] pb-8 md:pt-[104px] md:pb-10 lg:pt-[110px] lg:pb-12 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle at center, #080808 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-4">
          {/* Left Content — 38% */}
          <div className="w-full lg:w-[38%] shrink-0 relative z-10">
            {/* Label */}
            <div className="animate-fade-in-up flex items-center gap-2 mb-8">
              <span className="text-[#080808] text-sm">◆</span>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#080808]">
                OFFENSIVE SECURITY ENTHUSIAST · B.TECH IT
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-in-up delay-100 font-[800] uppercase text-[#080808] mb-7 whitespace-nowrap"
              style={{
                fontSize: 'clamp(58px, 7vw, 105px)',
                lineHeight: '0.88',
                letterSpacing: '-0.055em',
              }}
            >
              BUILD.<br />
              BREAK.<br />
              SECURE.
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-200 text-[15px] text-[#555555] leading-relaxed max-w-[440px] mb-8 font-normal">
              B.Tech IT student specializing in offensive security — penetration testing, red teaming, bug bounty hunting, and defensive security engineering.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={scrollToOperations}
                className="group inline-flex items-center gap-2.5 bg-[#080808] text-white rounded-full px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#181818] hover:shadow-[0_8px_24px_rgba(0,0,0,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span className="text-[9px] text-white/90">◆</span>
                <span>EXPLORE OPERATIONS</span>
              </button>
              <a
                href="/Sudhir_Gunnam_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-white text-[#080808] border border-[#dcdcdc] rounded-full px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#080808] hover:bg-[#f7f7f7] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span className="text-[9px] text-[#080808]/80">◆</span>
                <span>VIEW RESUME</span>
              </a>
            </div>

            {/* Focus Areas & Quick Interactive Badges */}
            <div className="animate-fade-in-up delay-400 space-y-4">
              <div>
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#999] mb-3">
                  FOCUS AREAS
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {[
                    'Penetration Testing',
                    'Red Teaming',
                    'Bug Bounty (HackerOne)',
                    'Intrusion Detection (IDS)',
                  ].map((area) => (
                    <span key={area} className="flex items-center gap-1.5 text-[13px] text-[#555]">
                      <span className="text-[10px] text-[#999]">◇</span>
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Terminal & PGP Action Links */}
              <div className="pt-2 flex items-center gap-4 text-[11px] font-bold tracking-wider text-[#666]">
                <button
                  onClick={onOpenTerminal}
                  className="hover:text-black underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>&gt;_ Launch Cyber Terminal</span>
                </button>
                <span className="text-[#ccc]">/</span>
                <button
                  onClick={onOpenPgp}
                  className="hover:text-black underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>PGP Key (4096R)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Visualization — 62% */}
          <div className="w-full lg:w-[62%] flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <SystemVisualization
              selectedDomain={selectedDomain}
              onSelectDomain={onSelectDomain}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
