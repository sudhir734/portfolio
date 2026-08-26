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
      {/* Background radial gradient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #080808 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-4">
          {/* Left Content */}
          <div className="w-full lg:w-[42%] shrink-0 relative z-10">
            {/* Top Label */}
            <div className="animate-fade-in-up flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2.5 h-2.5 bg-[#080808] rotate-45 shrink-0" />
              <span className="text-[12px] font-black tracking-[0.16em] uppercase text-[#080808]">
                OFFENSIVE SECURITY SPECIALIST · B.TECH IT
              </span>
            </div>

            {/* Display Headline */}
            <h1
              className="animate-fade-in-up delay-100 font-[900] uppercase text-[#080808] mb-5 sm:mb-6"
              style={{
                fontSize: 'clamp(44px, 6.8vw, 104px)',
                lineHeight: '0.9',
                letterSpacing: '-0.05em',
              }}
            >
              SUDHIR<br />
              GUNNAM.
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-200 text-[16px] text-[#222222] leading-relaxed max-w-[460px] mb-8 font-medium">
              B.Tech IT student specializing in offensive security, web application penetration testing, red teaming, HackerOne bug bounty research, and real-time intrusion detection engineering.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={scrollToOperations}
                className="group inline-flex items-center gap-2.5 bg-[#080808] text-white rounded-full px-8 py-3.5 text-[12px] font-black uppercase tracking-[0.12em] shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#1f1f1f] hover:shadow-[0_8px_24px_rgba(0,0,0,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span className="text-[10px] text-white/90">◆</span>
                <span>EXPLORE OPERATIONS</span>
              </button>
              <a
                href="./Sudhir_Gunnam_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Sudhir_Gunnam_Resume.pdf"
                className="group inline-flex items-center gap-2.5 bg-white text-[#080808] border-2 border-[#d0d0d0] rounded-full px-8 py-3.5 text-[12px] font-black uppercase tracking-[0.12em] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#080808] hover:bg-[#f7f7f7] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span className="text-[10px] text-[#080808]">◆</span>
                <span>VIEW RESUME (PDF)</span>
              </a>
            </div>

            {/* Focus Areas & Quick Action Links */}
            <div className="animate-fade-in-up delay-400 space-y-4">
              <div>
                <div className="text-[11px] font-black tracking-[0.18em] uppercase text-[#333333] mb-3">
                  CORE SPECIALIZATIONS
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                  {[
                    'Penetration Testing',
                    'Red Teaming',
                    'HackerOne Bug Bounty',
                    'Real-Time IDS/WAF',
                    'Active Directory Security',
                  ].map((area) => (
                    <span
                      key={area}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f0f0f0] border border-[#d8d8d8] text-[12px] font-bold text-[#111111]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Terminal & PGP Action Links */}
              <div className="pt-3 flex items-center gap-4 text-[12px] font-black tracking-wider text-[#222222]">
                <button
                  onClick={onOpenTerminal}
                  className="hover:text-black underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>&gt;_ Launch Security CLI (Ctrl+K)</span>
                </button>
                <span className="text-[#999] font-bold">/</span>
                <button
                  onClick={onOpenPgp}
                  className="hover:text-black underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>PGP Key (4096R)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Visualization */}
          <div className="w-full lg:w-[58%] flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
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
