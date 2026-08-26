import { Terminal, FlaskConical, Code2, ShieldCheck } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: string;
  subtitle: string;
}

const stats: StatItem[] = [
  {
    icon: Terminal,
    label: 'PROJECTS',
    value: '08+',
    subtitle: 'Completed & Ongoing',
  },
  {
    icon: FlaskConical,
    label: 'RESEARCH NOTES',
    value: '24+',
    subtitle: 'Published',
  },
  {
    icon: Code2,
    label: 'TECH STACK',
    value: '15+',
    subtitle: 'Technologies',
  },
  {
    icon: ShieldCheck,
    label: 'EXPERIENCE',
    value: '2+',
    subtitle: 'Years in Cybersecurity',
  },
];

export default function StatsBar() {
  return (
    <section className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 mb-14">
      <div className="bg-white border border-[#e8e8e8] rounded-[24px] shadow-[0_12px_36px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row items-stretch justify-between">
        {/* Stats Grid / Flex */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#f0f0f0]">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 px-7 py-6 lg:py-8 transition-colors duration-200 hover:bg-[#fafafa]/80"
              >
                {/* Icon box */}
                <div className="w-12 h-12 shrink-0 rounded-xl border border-[#ebebeb] bg-[#fafafa] flex items-center justify-center text-[#080808]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#999999] mb-1 truncate">
                    {stat.label}
                  </div>
                  <div className="text-[28px] font-black tracking-tight text-[#080808] leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[12px] text-[#777777] truncate font-medium">
                    {stat.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Card (Rightmost Panel) */}
        <div className="bg-[#080808] text-white px-8 py-6 lg:py-7 flex flex-col justify-center shrink-0 min-w-[240px] rounded-b-[24px] lg:rounded-b-none lg:rounded-r-[24px]">
          <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#888888] mb-2">
            STATUS
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-white">◆</span>
            <div className="text-[12px] font-extrabold tracking-[0.08em] uppercase text-white leading-tight">
              AVAILABLE FOR<br />OPPORTUNITIES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
