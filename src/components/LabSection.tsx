import { Award, Binary } from 'lucide-react';
import MitreMatrix from './MitreMatrix';
import PayloadEncoder from './PayloadEncoder';

export default function LabSection() {
  const certifications = [
    {
      title: 'Ethical Hacker',
      issuer: 'Cisco Networking Academy',
      year: 'Completed March 2026',
      badge: 'VERIFIED CREDENTIAL',
      status: 'completed',
    },
    {
      title: 'SQL (Advanced Level)',
      issuer: 'HackerRank',
      year: 'Completed',
      badge: 'TECHNICAL ASSESSMENT',
      status: 'completed',
    },
    {
      title: 'Claude Code in Action',
      issuer: 'Anthropic (Skilljar)',
      year: 'Completed',
      badge: 'AI & SECURITY TOOLING',
      status: 'completed',
    },
    {
      title: 'eJPT (Junior Penetration Tester)',
      issuer: 'INE Security',
      year: 'In Progress',
      badge: 'ACTIVE PURSUIT',
      status: 'in-progress',
    },
    {
      title: 'OSCP (Certified Professional)',
      issuer: 'Offensive Security',
      year: 'Long-Term Goal',
      badge: 'TARGET MILESTONE',
      status: 'goal',
    },
  ];

  const skillGroups = [
    {
      category: 'Recon & Enumeration',
      skills: ['subfinder', 'httpx', 'nuclei', 'nmap', 'Burp Suite', 'Wireshark', 'Passive OSINT'],
    },
    {
      category: 'Environments & Platforms',
      skills: ['Kali Linux (Termux/proot)', 'Linux / Ubuntu', 'Windows Security', 'Bash Shell'],
    },
    {
      category: 'Languages & Scripting',
      skills: ['Python', 'SQL (Advanced)', 'JavaScript', 'TypeScript', 'SQLite', 'Bash Scripting'],
    },
    {
      category: 'Security Domains',
      skills: [
        'Web Application Security',
        'Network Penetration Testing',
        'Vulnerability Assessment',
        'Bug Bounty Methodology',
        'Red Teaming',
        'Intrusion Detection (IDS)',
      ],
    },
  ];

  return (
    <section id="lab" className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-24 border-t border-[#eeeeee]">
      <div className="flex flex-col xl:flex-row items-start gap-10 lg:gap-14 mb-12 sm:mb-16">
        {/* Left column */}
        <div className="w-full xl:w-[280px] shrink-0">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#999999] mb-4">
            SECURITY LAB
          </div>
          <h2 className="text-[38px] md:text-[44px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#080808] mb-6">
            CAPABILITIES &<br />CREDENTIALS
          </h2>
          <p className="text-[14px] text-[#666666] leading-relaxed mb-8 max-w-[280px]">
            Verified credentials, continuous adversarial tooling practice, and standard security matrices.
          </p>
        </div>

        {/* Right column */}
        <div className="flex-1 space-y-12 w-full">
          {/* Certifications Grid */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#080808] mb-6 flex items-center gap-2">
              <Award size={16} strokeWidth={2} />
              Certifications & Career Milestones
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e8e8e8] rounded-[20px] p-6 transition-all duration-300 hover:border-[#080808] hover:shadow-[0_10px_24px_rgba(0,0,0,0.03)]"
                >
                  <div className="text-[9px] font-extrabold tracking-[0.15em] text-[#888888] uppercase mb-2">
                    {cert.badge}
                  </div>
                  <h4 className="text-[15px] font-black uppercase text-[#080808] mb-1">
                    {cert.title}
                  </h4>
                  <div className="text-[12px] text-[#666666] font-medium flex justify-between items-center">
                    <span>{cert.issuer}</span>
                    <span className="text-[#999999]">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Capabilities Matrix */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#080808] mb-6 flex items-center gap-2">
              <Binary size={16} strokeWidth={2} />
              Core Competencies & Toolsets
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skillGroups.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-[#fafafa] border border-[#ebebeb] rounded-[20px] p-6"
                >
                  <h4 className="text-[12px] font-extrabold tracking-[0.08em] uppercase text-[#080808] mb-4">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-3 py-1.5 bg-white border border-[#e4e4e4] rounded-lg text-[#333333]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Interactive Labs: Payload Encoder + MITRE Matrix */}
      <div className="space-y-10">
        <PayloadEncoder />
        <MitreMatrix />
      </div>
    </section>
  );
}
