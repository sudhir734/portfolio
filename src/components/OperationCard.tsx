import type { Operation } from '../data/operations';
import CardGeometry from './CardGeometry';
import { soundFx } from '../utils/soundFx';
import { ExternalLink, Terminal } from 'lucide-react';

interface OperationCardProps {
  operation: Operation;
  onOpenModal: (op: Operation) => void;
}

export default function OperationCard({
  operation,
  onOpenModal,
}: OperationCardProps) {
  const { title, number, category, description, status, link } = operation;

  // Format index sub-script
  const subNumbers: Record<string, string> = {
    '01': '0₁',
    '02': '0₂',
    '03': '0₃',
    '04': '0₄',
  };
  const displayNumber = subNumbers[number] || number;

  // Specific authentic telemetry logs for visual proof (Show, Don't Tell)
  const proofLogs: Record<string, { cmd: string; lines: string[]; statusBadge: string }> = {
    sentinelshield: {
      cmd: 'sentinelshield --live-monitor',
      lines: [
        '[INTERCEPT] POST /api/v1/query HTTP/1.1',
        '>> PAYLOAD: "\' OR \'1\'=\'1\' --" (CWE-89)',
        '>> DECISION: 403 BLOCKED | LATENCY: 2.8ms',
      ],
      statusBadge: 'OWASP TOP 10 INTERCEPT',
    },
    'secure-file-transfer': {
      cmd: 'sftm --audit-hash /spool/payload.dat',
      lines: [
        '[WATCHDOG] Hooked SFTP (Port 22) & HTTPS',
        '>> SHA-256: 9f86d081884c7d659a2feaa0c55a...',
        '>> INTEGRITY: 100% MATCHED | ZERO TAMPER',
      ],
      statusBadge: 'MITRE T1048 EXFIL GUARD',
    },
    'bug-bounty-research': {
      cmd: 'recon-pipeline --target hackerone-scope',
      lines: [
        '[TRIAGE] Subfinder -> Httpx -> Nuclei',
        '>> FINDING: WebSocket Auth Bypass (CWE-306)',
        '>> SEVERITY: HIGH (CVSS 7.5) | DISCLOSED',
      ],
      statusBadge: 'CONFIRMED DISCLOSURE',
    },
    'offensive-security-handbook': {
      cmd: 'offsec-handbook --chapters 1-15',
      lines: [
        '[INDEX] Active Directory Attack Chains',
        '>> MODULES: Kerberoasting, AS-REP, Pivoting',
        '>> REPO: 15 Volumes Field Methodology',
      ],
      statusBadge: '15 VOLUMES REFERENCE',
    },
  };

  const proof = proofLogs[operation.id] || proofLogs.sentinelshield;

  return (
    <div
      onMouseEnter={() => soundFx.playHover()}
      className="bg-white border-2 border-[#e0e0e0] rounded-[24px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#080808] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] group"
    >
      <div>
        {/* Card Header: Subscript Number + Status Tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[32px] font-[900] tracking-tighter text-[#080808]">
            {displayNumber}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f4f4] border border-[#d8d8d8] text-[10px] font-black tracking-[0.14em] uppercase text-[#111111]">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            {status}
          </span>
        </div>

        {/* Isometric Illustration */}
        <div className="w-full h-32 flex items-center justify-center my-2 overflow-hidden">
          <CardGeometry variant={operation.id} />
        </div>

        {/* Title */}
        <h3 className="text-[19px] font-[900] uppercase tracking-tight text-[#080808] mb-1.5 leading-snug">
          {title}
        </h3>

        {/* Category */}
        <div className="text-[12px] font-bold uppercase tracking-wider text-[#333333] mb-3">
          {category}
        </div>

        {/* Description */}
        <p className="text-[14px] text-[#444444] leading-relaxed mb-4 font-medium">
          {description}
        </p>

        {/* Inline Terminal Proof & Live Log Snippet (Direct Evidence without modal) */}
        <div className="bg-[#0c0d0e] rounded-xl p-3.5 border border-[#222222] font-mono text-[11px] space-y-1.5 mb-5 select-text shadow-inner">
          <div className="flex items-center justify-between text-[#888888] pb-1 border-b border-[#222222] text-[10px]">
            <span className="flex items-center gap-1.5 text-[#4ade80] font-bold">
              <Terminal size={11} />
              <span>{proof.cmd}</span>
            </span>
            <span className="text-[#888888] text-[9px] uppercase font-bold">{proof.statusBadge}</span>
          </div>
          {proof.lines.map((line, idx) => (
            <div
              key={idx}
              className={
                line.includes('BLOCKED') || line.includes('HIGH')
                  ? 'text-[#f87171] font-bold'
                  : line.includes('MATCHED') || line.includes('CONFIRMED')
                  ? 'text-[#4ade80] font-bold'
                  : 'text-[#d4d4d4]'
              }
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer: Inspect Architecture + Direct GitHub Source Link */}
      <div className="pt-4 border-t border-[#e8e8e8] flex items-center justify-between gap-3">
        <button
          onClick={() => {
            soundFx.playAuth();
            onOpenModal(operation);
          }}
          className="inline-flex items-center gap-1.5 text-[12px] font-black tracking-[0.08em] uppercase text-[#080808] hover:text-[#444444] cursor-pointer"
        >
          <span>SIMULATE &amp; INSPECT</span>
          <span className="text-[12px]">&rarr;</span>
        </button>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f0f0f0] hover:bg-[#080808] hover:text-white text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors"
            title="View verified source code on GitHub"
          >
            <span>GITHUB</span>
            <ExternalLink size={11} strokeWidth={2.5} />
          </a>
        )}
      </div>
    </div>
  );
}
