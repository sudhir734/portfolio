import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';

interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  project: string;
  status: 'AUDITED' | 'MITIGATED' | 'RESEARCHED';
  details: string;
  cwe?: string;
}

const techniques: MitreTechnique[] = [
  {
    id: 'T1190',
    name: 'Exploit Public-Facing Application',
    tactic: 'Initial Access',
    project: 'SentinelShield / HackerOne',
    status: 'MITIGATED',
    cwe: 'CWE-89 / CWE-79',
    details:
      'Engineered token heuristic WAF rules to detect and intercept unauthorized SQL injection and stored XSS requests on live web endpoints.',
  },
  {
    id: 'T1059',
    name: 'Command & Scripting Interpreter',
    tactic: 'Execution',
    project: 'SentinelShield',
    status: 'MITIGATED',
    cwe: 'CWE-78',
    details:
      'Monitored anomalous shell command syntax delimiters (;, |, &&, backticks) passed through HTTP parameters and query strings.',
  },
  {
    id: 'T1048',
    name: 'Exfiltration Over Alternative Protocol',
    tactic: 'Exfiltration',
    project: 'Secure File Transfer Monitor (SFTM)',
    status: 'AUDITED',
    cwe: 'CWE-319',
    details:
      'Multi-protocol filesystem watchdog capturing unauthorized data movements across SFTP, FTPS, and HTTPS with SQLite audit logging.',
  },
  {
    id: 'T1565.001',
    name: 'Data Manipulation: Stored Data',
    tactic: 'Impact',
    project: 'Secure File Transfer Monitor (SFTM)',
    status: 'AUDITED',
    cwe: 'CWE-353',
    details:
      'Cryptographic pre/post transfer SHA-256 digest comparison flagging in-flight byte modifications or unauthorized file tampering.',
  },
  {
    id: 'T1596',
    name: 'Search Open Technical Databases',
    tactic: 'Reconnaissance',
    project: 'Bug Bounty Recon Pipeline',
    status: 'RESEARCHED',
    details:
      'Automated OSINT and passive reconnaissance using subfinder, certificate transparency logs, and ASN IP mapping for target enumeration.',
  },
  {
    id: 'T1552',
    name: 'Unauthenticated Metrics Exposure',
    tactic: 'Credential Access / Discovery',
    project: 'HackerOne (Bumba Scope)',
    status: 'RESEARCHED',
    cwe: 'CWE-200',
    details:
      'Discovered exposed Prometheus /metrics endpoint leaking cluster telemetry, memory statistics, and internal endpoint endpoints.',
  },
  {
    id: 'T1078',
    name: 'WebSocket Auth Handshake Bypass',
    tactic: 'Defense Evasion / Initial Access',
    project: 'HackerOne Vulnerability Research',
    status: 'RESEARCHED',
    cwe: 'CWE-306',
    details:
      'Disclosed High-severity vulnerability where internal WebSocket connection failed to validate session origin and token state during upgrade.',
  },
  {
    id: 'T1069',
    name: 'Active Directory Permission Enumeration',
    tactic: 'Discovery',
    project: 'Offensive Security Handbook',
    status: 'RESEARCHED',
    details:
      'Authored practical testing guides for Kerberoasting, AS-REP roasting, token impersonation, and BloodHound graph analysis.',
  },
];

export default function MitreMatrix() {
  const [selectedTech, setSelectedTech] = useState<MitreTechnique>(techniques[0]);

  const tactics = Array.from(new Set(techniques.map((t) => t.tactic)));

  return (
    <div className="bg-white border border-[#e8e8e8] rounded-[24px] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#f0f0f0] gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#999] mb-1">
            <ShieldAlert size={14} className="text-[#080808]" />
            FRAMEWORK ALIGNMENT
          </div>
          <h3 className="text-[20px] font-black uppercase text-[#080808]">
            MITRE ATT&CK® COVERAGE HEATMAP
          </h3>
        </div>
        <div className="text-[11px] font-mono font-bold text-[#666] bg-[#fafafa] border border-[#eee] px-3 py-1.5 rounded-lg shrink-0">
          8 TECHNIQUES MAPPED
        </div>
      </div>

      {/* Grid of Tactics & Techniques */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Technique Badges */}
        <div className="lg:col-span-7 space-y-4">
          {tactics.map((tactic) => {
            const items = techniques.filter((t) => t.tactic === tactic);
            return (
              <div key={tactic} className="space-y-1.5">
                <div className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[#888]">
                  {tactic}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => {
                    const isSelected = selectedTech.id === tech.id;
                    return (
                      <button
                        key={tech.id}
                        onClick={() => setSelectedTech(tech)}
                        className={`px-3 py-2 rounded-xl text-left transition-all text-[12px] font-mono flex items-center gap-2 border cursor-pointer ${
                          isSelected
                            ? 'bg-[#080808] text-white border-[#080808] shadow-md scale-[1.02]'
                            : 'bg-[#fafafa] text-[#333] border-[#e8e8e8] hover:border-[#080808] hover:bg-white'
                        }`}
                      >
                        <span className="font-bold">{tech.id}</span>
                        <span className="text-[11px] opacity-80 truncate max-w-[160px]">
                          {tech.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Technique Inspection Card */}
        <div className="lg:col-span-5 bg-[#fafafa] border border-[#e8e8e8] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded bg-[#080808] text-white">
                {selectedTech.id} // {selectedTech.tactic}
              </span>
              <span
                className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded ${
                  selectedTech.status === 'MITIGATED'
                    ? 'bg-[#dcfce7] text-[#15803d]'
                    : selectedTech.status === 'AUDITED'
                    ? 'bg-[#e0e7ff] text-[#4338ca]'
                    : 'bg-[#fef9c3] text-[#854d0e]'
                }`}
              >
                ● {selectedTech.status}
              </span>
            </div>

            <h4 className="text-[16px] font-black uppercase text-[#080808] mb-1">
              {selectedTech.name}
            </h4>

            {selectedTech.cwe && (
              <div className="text-[11px] font-mono text-[#777] mb-3">
                Weakness: {selectedTech.cwe}
              </div>
            )}

            <p className="text-[13px] text-[#555] leading-relaxed mb-4">
              {selectedTech.details}
            </p>
          </div>

          <div className="pt-3 border-t border-[#eaeaea] text-[11px] text-[#777] flex items-center justify-between">
            <span>Project: <strong className="text-[#080808]">{selectedTech.project}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
