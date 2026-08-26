import { useState } from 'react';
import { X, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Chapter {
  number: string;
  title: string;
  category: string;
  summary: string;
  keyTopics: string[];
}

const chapters: Chapter[] = [
  {
    number: '01',
    title: 'Networking & Packet Level Analysis',
    category: 'Foundations',
    summary: 'Deep dive into TCP/IP handshake anomalies, Wireshark filters, ARP poisoning, and sub-layer protocol telemetry.',
    keyTopics: ['TCP SYN/ACK Scans', 'Wireshark Custom Display Filters', 'VLAN Hopping & MITM'],
  },
  {
    number: '02',
    title: 'Passive & Active OSINT Reconnaissance',
    category: 'Reconnaissance',
    summary: 'Automating asset mapping through certificate transparency, ASN lookup, subfinder chains, and cloud bucket enumeration.',
    keyTopics: ['Subdomain Bruteforcing', 'DNS Zone Transfers', 'Amass & Subfinder Workflows'],
  },
  {
    number: '03',
    title: 'Web Application Security: SQL Injection',
    category: 'Web Exploitation',
    summary: 'Advanced exploitation of in-band, error-based, blind time-based, and out-of-band (OOB) SQL injection flaws.',
    keyTopics: ['Union-based Extraction', 'Time-based Blind Automation', 'WAF Filter Obfuscation'],
  },
  {
    number: '04',
    title: 'Web Application Security: XSS & CSRF',
    category: 'Web Exploitation',
    summary: 'Stored, reflected, and DOM-based Cross-Site Scripting exploitation, session cookie hijacking, and CSP bypasses.',
    keyTopics: ['DOM Invaders', 'Cookie Stealer Payloads', 'CORS Misconfiguration Abuse'],
  },
  {
    number: '05',
    title: 'Active Directory: Kerberos Attacks',
    category: 'Enterprise / Red Team',
    summary: 'Adversarial tradecraft against Kerberos authentication protocols in Active Directory enterprise domains.',
    keyTopics: ['Kerberoasting (TGS Request)', 'AS-REP Roasting', 'Golden / Silver Ticket Forgery'],
  },
  {
    number: '06',
    title: 'Active Directory: Lateral Movement',
    category: 'Enterprise / Red Team',
    summary: 'Post-compromise movement methodologies across Windows domain members.',
    keyTopics: ['Pass-the-Hash (PtH)', 'WMI / WinRM Remote Execution', 'BloodHound Path Analysis'],
  },
  {
    number: '07',
    title: 'Linux & Windows Privilege Escalation',
    category: 'Exploitation',
    summary: 'Systematic privilege escalation techniques on POSIX and NT kernels.',
    keyTopics: ['SUID / Sudo Misconfigurations', 'Windows Service Permission Weaknesses', 'SeImpersonate Token Abuse'],
  },
  {
    number: '08',
    title: 'Bug Bounty Hunting Methodology',
    category: 'Vulnerability Research',
    summary: 'End-to-end bug bounty playbook covering scope analysis, rapid triage, proof-of-concept drafting, and responsible disclosure.',
    keyTopics: ['Nuclei Template Customization', 'Business Logic Flaw Identification', 'Report Quality & CVSS Scoring'],
  },
];

interface HandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HandbookModal({ isOpen, onClose }: HandbookModalProps) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white border border-[#e5e5e5] rounded-[28px] max-w-[860px] w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#eee] hover:bg-[#f5f5f5] text-[#080808] transition-colors cursor-pointer"
          aria-label="Close handbook modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-[#080808] text-white">
              OFFLINE REFERENCE SYSTEM
            </span>
            <span className="text-[10px] font-mono text-[#666]">
              15 VOLUMES // SELF-AUTHORED
            </span>
          </div>
          <h2 className="text-[26px] md:text-[32px] font-black uppercase text-[#080808]">
            OFFENSIVE SECURITY HANDBOOK
          </h2>
          <p className="text-[14px] text-[#555] leading-relaxed">
            Compiled reference handbook covering modern penetration testing, red teaming tradecraft, Active Directory vectors, and bug bounty methodologies.
          </p>
        </div>

        {/* Chapters Grid & Reader */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Chapter List */}
          <div className="md:col-span-5 space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {chapters.map((ch) => {
              const isSelected = selectedChapter.number === ch.number;
              return (
                <button
                  key={ch.number}
                  onClick={() => setSelectedChapter(ch)}
                  className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#080808] text-white border-[#080808] shadow-sm'
                      : 'bg-[#fafafa] text-[#333] border-[#e8e8e8] hover:border-[#111] hover:bg-white'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-[9px] font-mono font-bold uppercase opacity-80">
                      CHAPTER {ch.number} // {ch.category}
                    </div>
                    <div className="text-[12px] font-bold truncate">
                      {ch.title}
                    </div>
                  </div>
                  <ChevronRight size={14} className={isSelected ? 'text-white' : 'text-[#888]'} />
                </button>
              );
            })}
          </div>

          {/* Chapter Content Details */}
          <div className="md:col-span-7 bg-[#fafafa] border border-[#e8e8e8] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono font-extrabold uppercase text-[#888] mb-1">
                CHAPTER {selectedChapter.number} // {selectedChapter.category}
              </div>
              <h3 className="text-[20px] font-black uppercase text-[#080808] mb-3 leading-tight">
                {selectedChapter.title}
              </h3>
              <p className="text-[13px] text-[#555] leading-relaxed mb-6">
                {selectedChapter.summary}
              </p>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-2">
                  CURATED CORE TECHNIQUES & LABS:
                </div>
                <ul className="space-y-1.5">
                  {selectedChapter.keyTopics.map((topic, i) => (
                    <li key={i} className="text-[12px] text-[#333] flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#10b981] shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#eaeaea] mt-6 flex items-center justify-between">
              <span className="text-[11px] text-[#777] font-mono">
                Full 15-Volume Edition Available in Portfolio PDF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
