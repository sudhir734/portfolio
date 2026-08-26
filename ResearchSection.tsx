import { CheckCircle2 } from 'lucide-react';

interface ResearchSectionProps {
  onOpenBounties?: () => void;
  onOpenHandbook?: () => void;
}

export default function ResearchSection({ onOpenBounties, onOpenHandbook }: ResearchSectionProps) {
  const researchItems = [
    {
      title: 'WebSocket Broken Authentication (CWE-306)',
      type: 'DISCLOSED & RESOLVED (HIGH)',
      target: 'Production Comms Microservice',
      date: 'Jan 2026',
      description:
        'Identified missing token verification during WebSocket HTTP Upgrade handshakes. Demonstrated unauthorized socket connection and internal telemetry subscription leading to a High-severity vendor remediation.',
      tags: ['WebSocket Auth', 'CWE-306', 'Session Hijacking', 'HackerOne'],
      action: onOpenBounties,
      actionLabel: 'Read Full Case Study',
    },
    {
      title: 'Offensive Security Handbook (15 Chapters)',
      type: 'SELF-AUTHORED COMPILATION',
      target: 'Red Teaming & Tradecraft Methodology',
      date: 'Continuous 2025–2026',
      description:
        'Comprehensive technical reference manual synthesizing practical exploitation tradecraft, Active Directory Kerberos attack chains, pivoting, and bug bounty triage methodologies.',
      tags: ['Active Directory', 'Kerberoasting', 'Privilege Escalation', 'Red Teaming'],
      action: onOpenHandbook,
      actionLabel: 'Browse Chapter Index',
    },
  ];

  return (
    <section id="research" className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-[#eeeeee]">
      <div className="flex flex-col xl:flex-row items-start gap-12 lg:gap-14">
        {/* Left column */}
        <div className="w-full xl:w-[280px] shrink-0">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#999999] mb-4">
            SECURITY RESEARCH
          </div>
          <h2 className="text-[38px] md:text-[44px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#080808] mb-6">
            ADVISORIES &<br />PUBLICATIONS
          </h2>
          <p className="text-[14px] text-[#666666] leading-relaxed mb-6 max-w-[280px]">
            Responsible vulnerability disclosures, adversarial tradecraft research, and offline security reference manuals.
          </p>

          <button
            onClick={onOpenBounties}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#080808] text-white text-[10px] font-extrabold uppercase tracking-wider hover:bg-[#222] transition-colors cursor-pointer"
          >
            <span>View All Bounties</span>
            <span className="text-[8px]">◆</span>
          </button>
        </div>

        {/* Right column list */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {researchItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e8e8e8] rounded-[24px] p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#111111] hover:shadow-[0_16px_36px_rgba(0,0,0,0.04)] group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-[0.14em] bg-[#080808] text-white uppercase">
                    <CheckCircle2 size={11} strokeWidth={2.5} />
                    {item.type}
                  </span>
                  <span className="text-[11px] font-semibold text-[#888888]">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-[18px] font-extrabold tracking-tight uppercase text-[#080808] mb-2 leading-snug">
                  {item.title}
                </h3>

                <div className="text-[12px] font-semibold text-[#666666] mb-4">
                  Scope: {item.target}
                </div>

                <p className="text-[13px] text-[#555555] leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-[#f5f5f5]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-[#fafafa] border border-[#ececec] text-[#555555] rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {item.action && (
                  <button
                    onClick={item.action}
                    className="text-[11px] font-black uppercase tracking-wider text-[#080808] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{item.actionLabel}</span>
                    <span>&rarr;</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
