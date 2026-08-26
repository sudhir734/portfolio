export default function StatsBar() {
  const stats = [
    {
      value: '04',
      label: 'SECURITY SYSTEMS BUILT',
      sublabel: 'WAF / IDS / Protocol Integrity Audit',
    },
    {
      value: '03+',
      label: 'HACKERONE DISCLOSURES',
      sublabel: 'High CWE-306 / Recon Bug Bounty',
    },
    {
      value: '03',
      label: 'VERIFIED CREDENTIALS',
      sublabel: 'Cisco Ethical Hacker / HackerRank SQL',
    },
  ];

  return (
    <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8">
      <div className="bg-white border-2 border-[#e0e0e0] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-center">
          {/* 3 Metric Columns */}
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index < 2
                  ? 'lg:border-r lg:border-[#e5e5e5] lg:pr-6'
                  : index === 2
                  ? 'sm:border-r-0 lg:border-r lg:border-[#e5e5e5] lg:pr-6'
                  : ''
              }`}
            >
              <div className="text-[38px] md:text-[46px] font-[900] tracking-[-0.03em] text-[#080808] leading-none mb-2 font-mono">
                {stat.value}
              </div>
              <div className="text-[12px] font-black tracking-[0.12em] uppercase text-[#080808] mb-1">
                {stat.label}
              </div>
              <div className="text-[13px] text-[#444444] font-medium">
                {stat.sublabel}
              </div>
            </div>
          ))}

          {/* 4th Column: Black Status Card */}
          <div className="bg-[#080808] text-white rounded-2xl p-5 flex flex-col justify-between h-full min-h-[115px] shadow-md border border-[#222]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#38bdf8]">
                RECRUITMENT STATUS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              </span>
            </div>
            <div>
              <div className="text-[13px] font-black tracking-[0.08em] uppercase mb-0.5 text-white">
                OPEN TO REMOTE &amp; ONSITE ROLES
              </div>
              <div className="text-[11px] text-[#cccccc] font-medium">
                Offensive Security · Pentesting · Internships
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
