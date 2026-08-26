import { Binary, Award, Shield } from 'lucide-react';
import MitreMatrix from './MitreMatrix';
import PayloadEncoder from './PayloadEncoder';

export default function Scene04System() {
  const certifications = [
    {
      title: 'Ethical Hacker',
      issuer: 'Cisco Networking Academy',
      year: 'Completed March 2026',
      badge: 'VERIFIED CREDENTIAL',
    },
    {
      title: 'SQL (Advanced Level)',
      issuer: 'HackerRank',
      year: 'Completed',
      badge: 'TECHNICAL ASSESSMENT',
    },
    {
      title: 'Claude Code in Action',
      issuer: 'Anthropic (Skilljar)',
      year: 'Completed',
      badge: 'AI & TOOLING WORKFLOW',
    },
    {
      title: 'eJPT (Junior Penetration Tester)',
      issuer: 'INE Security',
      year: 'Active Pursuit',
      badge: 'BENCHMARK',
    },
  ];

  const skillGroups = [
    {
      category: 'Recon & OSINT',
      skills: ['subfinder', 'httpx', 'nuclei', 'nmap', 'Burp Suite', 'Wireshark', 'Passive DNS'],
    },
    {
      category: 'Platforms & Systems',
      skills: ['Kali Linux', 'Ubuntu / Debian', 'Windows Security', 'Bash Shell', 'Docker'],
    },
    {
      category: 'Languages & Scripting',
      skills: ['Python', 'SQL (Advanced)', 'TypeScript', 'JavaScript', 'SQLite', 'Bash Scripting'],
    },
    {
      category: 'Security Domains',
      skills: [
        'Web App Security',
        'Penetration Testing',
        'Vulnerability Assessment',
        'Bug Bounty Research',
        'Intrusion Detection (WAF/IDS)',
        'Active Directory Kerberos',
      ],
    },
  ];

  return (
    <section
      id="system"
      className="relative min-h-[90vh] py-20 px-6 md:px-12 border-t border-[#1a1e24] bg-[#060709] overflow-hidden z-10"
    >
      <div className="max-w-[1400px] w-full mx-auto space-y-16">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#10b981] uppercase mb-2">
            <Binary size={14} />
            <span>SCENE 04 // THE SECURITY SYSTEM & LAB</span>
          </div>
          <h2 className="text-[36px] md:text-[54px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#f0f3f6]">
            CAPABILITIES &<br />ADVERSARIAL MATRIX
          </h2>
        </div>

        {/* 2-Column Bento: Certifications & Technical Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certifications Card */}
          <div className="bg-[#0e1014] border border-[#1a1e24] rounded-[24px] p-8 space-y-6">
            <div className="flex items-center gap-2 text-[12px] font-mono font-bold text-[#f0f3f6] uppercase">
              <Award size={16} className="text-[#10b981]" />
              <span>Verified Credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="bg-[#14181e] border border-[#1e242d] rounded-xl p-4 hover:border-[#10b981] transition-colors"
                >
                  <div className="text-[9px] font-mono font-bold text-[#10b981] uppercase mb-1">
                    {cert.badge}
                  </div>
                  <div className="text-[14px] font-bold text-[#f0f3f6] uppercase mb-0.5">
                    {cert.title}
                  </div>
                  <div className="text-[11px] text-[#7e8794] flex justify-between">
                    <span>{cert.issuer}</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies Card */}
          <div className="bg-[#0e1014] border border-[#1a1e24] rounded-[24px] p-8 space-y-6">
            <div className="flex items-center gap-2 text-[12px] font-mono font-bold text-[#f0f3f6] uppercase">
              <Shield size={16} className="text-[#10b981]" />
              <span>Domain Toolsets</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillGroups.map((group) => (
                <div key={group.category} className="bg-[#14181e] border border-[#1e242d] rounded-xl p-4">
                  <div className="text-[11px] font-mono font-bold text-[#cad2dc] uppercase mb-2">
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 bg-[#0e1014] border border-[#222832] rounded text-[#8e99a8]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Tools: Payload Encoder & MITRE ATT&CK Matrix */}
        <div className="space-y-10">
          <PayloadEncoder />
          <MitreMatrix />
        </div>
      </div>
    </section>
  );
}
