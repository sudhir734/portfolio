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
    <section id="research" className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20 border-t-2 border-[#e5e5e5]">
      <div className="flex flex-col xl:flex-row items-start gap-10 lg:gap-14">
        {/* Left column */}
        <div className="w-full xl:w-[300px] shrink-0">
          <div className="text-[11px] font-black tracking-[0.2em] uppercase text-[#333333] mb-3">
            SECURITY RESEARCH
          </div>
          <h2 className="text-[38px] md:text-[44px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#080808] mb-6">
            ADVISORIES &amp;<br />PUBLICATIONS
          </h2>
          <p className="text-[15px] text-[#333333] leading-relaxed mb-6 max-w-[290px] font-medium">
            Responsible vulnerability disclosures on HackerOne, adversarial tradecraft research, and red team field manuals.
          </p>

          <button
            onClick={onOpenBounties}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#080808] text-white text-[11px] font-black uppercase tracking-wider hover:bg-[#222] transition-colors cursor-pointer shadow-sm"
          >
            <span>View All Bounties</span>
            <span className="text-[9px]">◆</span>
          </button>
        </div>

        {/* Right column list */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {researchItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#e0e0e0] rounded-[24px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#111111] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.12em] bg-[#080808] text-white uppercase">
                    <CheckCircle2 size={12} strokeWidth={2.5} />
                    {item.type}
                  </span>
                  <span className="text-[12px] font-bold text-[#444444]">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-[19px] font-[900] tracking-tight uppercase text-[#080808] mb-2 leading-snug">
                  {item.title}
                </h3>

                <div className="text-[13px] font-bold text-[#333333] mb-3">
                  Scope: {item.target}
                </div>

                <p className="text-[14px] text-[#444444] leading-relaxed mb-6 font-medium">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-[#eeeeee]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold tracking-wide uppercase px-3 py-1 bg-[#f4f4f4] border border-[#d8d8d8] text-[#111111] rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {item.action && (
                  <button
                    onClick={item.action}
                    className="text-[12px] font-black uppercase tracking-wider text-[#080808] hover:underline flex items-center gap-1.5 cursor-pointer"
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
