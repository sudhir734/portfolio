import { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import { operations } from '../data/operations';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function CyberTerminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialBanner: CommandHistory = {
    command: 'init --verbose',
    output: (
      <div className="text-[#b0b0b0] text-[12px] leading-relaxed font-mono space-y-3 select-text">
        <div className="text-white font-bold text-[13px] border-b border-[#262626] pb-2 flex items-center justify-between">
          <span>SUDHIR GUNNAM // OFFENSIVE SECURITY TERMINAL [v2.6.4]</span>
          <span className="text-[#4ade80] text-[11px]">● SESSION ACTIVE</span>
        </div>

        <div className="text-[#888888] italic">
          // All available terminal commands and parameters are documented below.
          <br />// Click any preset or type a command in the prompt to execute.
        </div>

        {/* Commented Command Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 bg-[#111111]/80 p-3.5 rounded-xl border border-[#222222]">
          {/* Group 1 */}
          <div className="space-y-1.5">
            <div className="text-[#4ade80] font-bold text-[11px] tracking-wider">
              # --- IDENTITY & PROFILE ---
            </div>
            <div>
              <code className="text-white font-bold">whoami</code>{' '}
              <span className="text-[#777]">// Operator identity, college & goals</span>
            </div>
            <div>
              <code className="text-white font-bold">skills</code>{' '}
              <span className="text-[#777]">// Recon, tools, languages & platforms</span>
            </div>
            <div>
              <code className="text-white font-bold">certs</code>{' '}
              <span className="text-[#777]">// Cisco, HackerRank, eJPT & OSCP status</span>
            </div>
            <div>
              <code className="text-white font-bold">contact</code>{' '}
              <span className="text-[#777]">// Verified email, phone & profiles</span>
            </div>
          </div>

          {/* Group 2 */}
          <div className="space-y-1.5">
            <div className="text-[#4ade80] font-bold text-[11px] tracking-wider">
              # --- SECURITY WORK & LABS ---
            </div>
            <div>
              <code className="text-white font-bold">projects</code>{' '}
              <span className="text-[#777]">// SentinelShield, SFTM & Handbook</span>
            </div>
            <div>
              <code className="text-white font-bold">bounties</code>{' '}
              <span className="text-[#777]">// HackerOne confirmed disclosures</span>
            </div>
            <div>
              <code className="text-white font-bold">handbook</code>{' '}
              <span className="text-[#777]">// 15-chapter offensive security index</span>
            </div>
            <div>
              <code className="text-white font-bold">test &lt;payload&gt;</code>{' '}
              <span className="text-[#777]">// Live SentinelShield IDS payload tester</span>
            </div>
          </div>

          {/* Group 3 */}
          <div className="space-y-1.5">
            <div className="text-[#4ade80] font-bold text-[11px] tracking-wider">
              # --- SIMULATION & UTILITIES ---
            </div>
            <div>
              <code className="text-white font-bold">recon &lt;target&gt;</code>{' '}
              <span className="text-[#777]">// Simulate subfinder → httpx → nuclei</span>
            </div>
            <div>
              <code className="text-white font-bold">sftm --audit</code>{' '}
              <span className="text-[#777]">// Run SFTM SHA-256 integrity check</span>
            </div>
            <div>
              <code className="text-white font-bold">help</code>{' '}
              <span className="text-[#777]">// Re-print this command reference manual</span>
            </div>
            <div>
              <code className="text-white font-bold">clear</code> | <code className="text-white font-bold">exit</code>{' '}
              <span className="text-[#777]">// Wipe screen or exit terminal</span>
            </div>
          </div>

          {/* Group 4: Quick Examples */}
          <div className="space-y-1.5">
            <div className="text-[#4ade80] font-bold text-[11px] tracking-wider">
              # --- QUICK TEST EXAMPLES ---
            </div>
            <div className="text-[#aaa] text-[11px]">
              <div>• <code>test ' OR '1'='1' --</code></div>
              <div>• <code>test &lt;script&gt;alert(1)&lt;/script&gt;</code></div>
              <div>• <code>recon target.com</code></div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  const [history, setHistory] = useState<CommandHistory[]>([initialBanner]);

  useEffect(() => {
    if (isOpen) {
      // Fresh start on every open
      setHistory([initialBanner]);
      setInput('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = input.trim();
    if (!rawCmd) return;

    const [cmd, ...args] = rawCmd.split(' ');
    const argStr = args.join(' ');

    let output: React.ReactNode = null;

    switch (cmd.toLowerCase()) {
      case 'help':
        output = initialBanner.output;
        break;

      case 'whoami':
        output = (
          <div className="space-y-2 text-[#ccc] text-[12px] bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div className="text-white font-bold text-[13px]">OPERATOR: Sudhir Gunnam</div>
            <div><span className="text-[#888]">Title:</span> Offensive Security Enthusiast | B.Tech IT Student (2024–2028)</div>
            <div><span className="text-[#888]">Institution:</span> DVR & Dr. HS MIC College of Technology, Andhra Pradesh, India</div>
            <div><span className="text-[#888]">Tagline:</span> "B.Tech IT student specializing in offensive security — penetration testing and red teaming."</div>
            <div><span className="text-[#888]">Focus Areas:</span> Penetration testing, red teaming, bug bounty hunting, security tooling, intrusion detection</div>
            <div><span className="text-[#888]">Active Track:</span> Preparing for eJPT (INE Security) with OSCP as long-term milestone</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3 text-[12px] bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div>
              <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">RECON & ENUMERATION:</div>
              <div className="text-[#aaa]">subfinder, httpx, nuclei, nmap, Burp Suite, Wireshark, Passive OSINT</div>
            </div>
            <div>
              <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">ENVIRONMENTS & PLATFORMS:</div>
              <div className="text-[#aaa]">Kali Linux (Termux/proot), Ubuntu Server, Linux Shell, Windows Security</div>
            </div>
            <div>
              <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">LANGUAGES & SCRIPTING:</div>
              <div className="text-[#aaa]">Python, SQL (Advanced), JavaScript, TypeScript, SQLite, Bash Scripting</div>
            </div>
            <div>
              <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">SECURITY DOMAINS:</div>
              <div className="text-[#aaa]">Web Application Security, Network Security, Vulnerability Assessment, Bug Bounty Methodology, Red Teaming</div>
            </div>
          </div>
        );
        break;

      case 'certs':
        output = (
          <div className="space-y-2 text-[12px] bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">CREDENTIAL & CERTIFICATION MATRIX:</div>
            <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
              <span><strong className="text-white">Ethical Hacker</strong> (Cisco Networking Academy)</span>
              <span className="text-[#4ade80] font-bold text-[11px]">✓ COMPLETED (MARCH 2026)</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
              <span><strong className="text-white">SQL (Advanced Level)</strong> (HackerRank)</span>
              <span className="text-[#4ade80] font-bold text-[11px]">✓ COMPLETED</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
              <span><strong className="text-white">Claude Code in Action</strong> (Anthropic / Skilljar)</span>
              <span className="text-[#4ade80] font-bold text-[11px]">✓ COMPLETED</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
              <span><strong className="text-white">eJPT (Junior Penetration Tester)</strong> (INE Security)</span>
              <span className="text-[#facc15] font-bold text-[11px]">⏳ IN PROGRESS</span>
            </div>
            <div className="flex items-center justify-between">
              <span><strong className="text-white">OSCP (Certified Professional)</strong> (Offensive Security)</span>
              <span className="text-[#60a5fa] font-bold text-[11px]">🎯 TARGET GOAL</span>
            </div>
          </div>
        );
        break;

      case 'resume':
        output = (
          <div className="space-y-2 bg-[#111] p-3.5 rounded-xl border border-[#222] text-[12px]">
            <div className="text-white font-bold text-[12px] flex items-center justify-between">
              <span>OFFICIAL RESUME // SUDHIR GUNNAM</span>
              <span className="text-[#4ade80]">PDF READY</span>
            </div>
            <div className="text-[#aaa]">B.Tech IT · Offensive Security Enthusiast · Penetration Testing</div>
            <div className="pt-1">
              <a
                href="./Sudhir_Gunnam_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                download="Sudhir_Gunnam_Resume.pdf"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4ade80] text-black font-bold text-[11px] hover:bg-[#22c55e] transition-colors"
              >
                <span>Download / Open Resume (PDF)</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2.5 bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">ENGINEERED PROJECTS:</div>
            {operations.map((op) => (
              <div key={op.id} className="border-l-2 border-[#4ade80] pl-3 py-1 bg-[#161616] rounded-r-lg">
                <div className="text-white font-bold">[{op.number}] {op.title} <span className="text-[10px] text-[#888] font-normal">({op.category})</span></div>
                <div className="text-[#aaa] text-[12px] mt-0.5">{op.description}</div>
                <div className="text-[#777] text-[11px] mt-1 font-mono">Stack: {op.technologies.join(' · ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'bounties':
        output = (
          <div className="space-y-2.5 text-[12px] bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">CONFIRMED VULNERABILITY DISCLOSURES (HACKERONE):</div>
            <div className="bg-[#1a0f0f] border border-[#f87171]/40 p-3 rounded-lg">
              <div className="text-[#f87171] font-bold text-[12px]">HIGH: WebSocket Broken Authentication (CWE-306)</div>
              <div className="text-[#bbb] text-[11px] mt-1">Identified missing handshake authorization on internal WebSocket endpoint allowing unauthorized session hijack and data scraping.</div>
            </div>
            <div className="bg-[#1f150f] border border-[#fb923c]/40 p-3 rounded-lg">
              <div className="text-[#fb923c] font-bold text-[12px]">MEDIUM: Exposed Docker Registry Catalog (Fly.io Scope)</div>
              <div className="text-[#bbb] text-[11px] mt-1">Discovered unauthenticated public access to Docker v2 container manifest catalogue.</div>
            </div>
            <div className="bg-[#1f150f] border border-[#fb923c]/40 p-3 rounded-lg">
              <div className="text-[#fb923c] font-bold text-[12px]">MEDIUM: Unauthenticated Prometheus Metrics Endpoint (Bumba Scope)</div>
              <div className="text-[#bbb] text-[11px] mt-1">Discovered public access to cluster telemetry exposing internal server metrics and operational data.</div>
            </div>
          </div>
        );
        break;

      case 'handbook':
        output = (
          <div className="space-y-2 text-[12px] bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">OFFENSIVE SECURITY HANDBOOK // 15 CHAPTERS:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-[#aaa] text-[11px]">
              <div>01. Networking & Traffic Analysis</div>
              <div>02. Passive & Active OSINT Recon</div>
              <div>03. Web Security: Injection Vectors</div>
              <div>04. Web Security: Auth & Session Flaws</div>
              <div>05. Active Directory: Kerberos Attacks</div>
              <div>06. Active Directory: Lateral Movement</div>
              <div>07. Privilege Escalation (Linux/Windows)</div>
              <div>08. Exploit Development Fundamentals</div>
              <div>09. Bug Bounty Hunting Methodology</div>
              <div>10. Nuclei & Custom Template Crafting</div>
              <div>11. Multi-Protocol Auditing & SFTM</div>
              <div>12. IDS & Detection Bypass Research</div>
              <div>13. Purple Team Validation Harnesses</div>
              <div>14. Cryptographic Hash Integrity Verification</div>
              <div>15. Responsible Disclosure & Advisory Drafting</div>
            </div>
          </div>
        );
        break;

      case 'test':
        if (!argStr) {
          output = <div className="text-[#f87171]">Usage: test &lt;payload&gt;  (e.g., test ' OR '1'='1' --)</div>;
        } else {
          const isSQLi = /('|"|--|union|select|insert|update|delete|drop|or\s+1=1)/i.test(argStr);
          const isXSS = /(<script|javascript:|onerror=|onload=|alert\(|<img|<svg)/i.test(argStr);
          const isPathTraversal = /(\.\.\/|\.\.\\|\/etc\/passwd)/i.test(argStr);

          if (isSQLi || isXSS || isPathTraversal) {
            output = (
              <div className="bg-[#1a0f0f] border border-[#f87171]/40 p-3.5 rounded-xl text-[12px] space-y-1.5">
                <div className="text-[#f87171] font-bold flex items-center justify-between">
                  <span>🚨 SENTINELSHIELD: THREAT DETECTED & BLOCKED</span>
                  <span className="text-[10px] bg-[#f87171] text-black px-2 py-0.5 rounded font-mono font-black">HTTP 403</span>
                </div>
                <div><span className="text-[#888]">Evaluated Payload:</span> <code className="text-white bg-[#000] px-1.5 py-0.5 rounded">{argStr}</code></div>
                <div><span className="text-[#888]">Identified Vector:</span> <strong className="text-white">{isSQLi ? 'CWE-89 SQL Injection' : isXSS ? 'CWE-79 Cross-Site Scripting (XSS)' : 'CWE-22 Path Traversal'}</strong></div>
                <div><span className="text-[#888]">Confidence Score:</span> 0.98 (High Threat Anomaly)</div>
                <div className="text-[#4ade80] text-[11px] pt-1 font-mono">Enforced Defense: Sanitized input stream // Tokenizer isolated attack signature</div>
              </div>
            );
          } else {
            output = (
              <div className="bg-[#0f1a0f] border border-[#4ade80]/40 p-3.5 rounded-xl text-[12px] space-y-1">
                <div className="text-[#4ade80] font-bold">✓ SENTINELSHIELD: PAYLOAD EVALUATED BENIGN (HTTP 200 OK)</div>
                <div><span className="text-[#888]">Payload:</span> <code className="text-white bg-[#000] px-1.5 py-0.5 rounded">{argStr}</code></div>
                <div><span className="text-[#888]">Anomaly Score:</span> 0.02 (Clean traffic) // Request forwarded to upstream</div>
              </div>
            );
          }
        }
        break;

      case 'recon':
        const target = argStr || 'target-system.local';
        output = (
          <div className="space-y-1.5 text-[11px] font-mono bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div className="text-white font-bold text-[12px] flex items-center justify-between">
              <span>RECON PIPELINE SIMULATOR: {target}</span>
              <span className="text-[#4ade80]">DONE (1.2s)</span>
            </div>
            <div className="text-[#888]">[+] Phase 1: subfinder -d {target} -silent &rarr; 4 subdomains resolved</div>
            <div className="text-[#888]">[+] Phase 2: httpx -l subs.txt -status-code -tech-detect &rarr; 2 active endpoints (nginx 1.24, Node.js)</div>
            <div className="text-[#888]">[+] Phase 3: nuclei -t http/cves -u https://{target} &rarr; 0 critical CVEs, 1 info disclosure</div>
            <div className="text-[#4ade80] pt-1 font-bold">✓ Triage Complete: Attack surface mapped & logged.</div>
          </div>
        );
        break;

      case 'sftm':
        output = (
          <div className="space-y-1.5 text-[11px] font-mono bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div className="text-white font-bold text-[12px]">SECURE FILE TRANSFER MONITOR (SFTM) AUDIT</div>
            <div>[+] Hooked Protocols: <span className="text-white">SFTP (Port 22), FTPS (Port 990), HTTPS (Port 443)</span></div>
            <div>[+] Spool Directory: <span className="text-white">/var/secure_transfers/spool</span></div>
            <div>[+] SHA-256 Engine: <span className="text-[#4ade80]">ACTIVE (Bit-level integrity verification enabled)</span></div>
            <div>[+] MITRE ATT&CK Watchdog: <span className="text-white">T1048 (Exfiltration) & T1565 (Data Manipulation)</span></div>
            <div className="text-[#4ade80] pt-1">✓ Status: Normal operation // Zero modified hash discrepancies.</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-[12px] bg-[#111] p-3.5 rounded-xl border border-[#222]">
            <div className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">OPERATOR CHANNELS:</div>
            <div>Email: <a href="mailto:gunnamsudhir5@gmail.com" className="text-white underline">gunnamsudhir5@gmail.com</a></div>
            <div>Phone: <span className="text-white">+91 8919882181</span></div>
            <div>GitHub: <a href="https://github.com/sudhir734" target="_blank" rel="noreferrer" className="text-white underline">github.com/sudhir734</a></div>
            <div>LinkedIn: <a href="https://linkedin.com/in/sudhirgunnam" target="_blank" rel="noreferrer" className="text-white underline">linkedin.com/in/sudhirgunnam</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        output = (
          <div className="text-[#f87171] text-[12px]">
            Command not recognized: "{cmd}". Type <span className="text-white underline font-bold cursor-pointer" onClick={() => handleCommand({ preventDefault: () => {} } as any)}>help</span> for the command manual.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInput('');
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMaximized
          ? 'inset-4 bg-[#080808]/98 backdrop-blur-md rounded-2xl border border-[#333]'
          : 'bottom-6 right-6 w-[94vw] max-w-[680px] h-[520px] bg-[#080808]/98 backdrop-blur-md rounded-2xl border border-[#262626] shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
      } flex flex-col overflow-hidden text-white font-mono text-[13px]`}
    >
      {/* Terminal Title Bar */}
      <div className="bg-[#121212] px-4 py-3 border-b border-[#222] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-[#4ade80]" />
          <span className="text-[11px] font-bold tracking-wider text-[#bbb]">
            sudhir@sec-terminal:~ (bash)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:bg-[#222] rounded text-[#888] hover:text-white transition-colors cursor-pointer"
            aria-label="Maximize terminal"
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#222] rounded text-[#888] hover:text-white transition-colors cursor-pointer"
            aria-label="Close terminal"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 select-text">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-[#4ade80]">
              <span>guest@sudhir-portfolio:~$</span>
              <span className="text-white font-semibold">{h.command}</span>
            </div>
            <div className="pl-2">{h.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Bar */}
      <form
        onSubmit={handleCommand}
        className="bg-[#0f0f0f] border-t border-[#1f1f1f] px-4 py-3 flex items-center gap-2"
      >
        <span className="text-[#4ade80] font-bold">guest@sudhir-portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command (e.g. whoami, certs, test '<script>', recon target.com)..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[13px] placeholder:text-[#555]"
          autoFocus
        />
      </form>
    </div>
  );
}
