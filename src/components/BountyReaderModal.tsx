import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface BountyFinding {
  id: string;
  title: string;
  scope: string;
  severity: 'HIGH' | 'MEDIUM';
  cvss: string;
  cwe: string;
  date: string;
  status: 'CONFIRMED & RESOLVED';
  summary: string;
  attackVector: string;
  proofOfConcept: string;
  remediation: string;
}

const findings: BountyFinding[] = [
  {
    id: 'h1-01',
    title: 'WebSocket Broken Authentication / Session Hijack',
    scope: 'Production Real-Time Comms Service',
    severity: 'HIGH',
    cvss: '8.2 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:N)',
    cwe: 'CWE-306: Missing Authentication for Critical Function',
    date: 'Jan 2026',
    status: 'CONFIRMED & RESOLVED',
    summary:
      'During reconnaissance of a WebSocket endpoint, identified that HTTP Upgrade handshakes failed to validate bearer tokens or origin headers, permitting unauthenticated clients to establish persistent sockets and subscribe to sensitive message queues.',
    attackVector:
      '1. Target application initiated WebSocket connection to wss://target.com/events/v1\n2. Intercepted request via Burp Suite and stripped Sec-WebSocket-Protocol and Authorization headers.\n3. Server accepted connection with HTTP 101 Switching Protocols.\n4. Sent subscription payload {"action":"subscribe","channel":"internal_telemetry"} without credentials, resulting in unauthorized data emission.',
    proofOfConcept:
      'wscat -c "wss://target.com/events/v1"\n> {"action": "subscribe", "feed": "admin_audit_stream"}\n< {"status": "subscribed", "events": [{"id": 10842, "user": "admin", "token": "[REDACTED]"}]}',
    remediation:
      'Implemented mandatory JWT session token verification inside the WebSocket upgrade hook prior to establishing the TCP connection socket.',
  },
  {
    id: 'h1-02',
    title: 'Exposed Docker Registry v2 Catalog & Manifests',
    scope: 'Fly.io Scope Target',
    severity: 'MEDIUM',
    cvss: '6.5 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N)',
    cwe: 'CWE-200: Exposure of Sensitive Information to Unauthorized Actor',
    date: 'Dec 2025',
    status: 'CONFIRMED & RESOLVED',
    summary:
      'Discovered an unauthenticated public-facing Docker v2 API endpoint allowing external actors to list internal container repositories, tags, and manifest digests.',
    attackVector:
      '1. Ran subfinder + httpx discovering registry-internal.target.com\n2. Sent GET /v2/_catalog HTTP request.\n3. Server returned full list of internal staging container image names without requiring basic auth.',
    proofOfConcept:
      'curl -i -s "https://registry-internal.target.com/v2/_catalog"\nHTTP/2 200\nContent-Type: application/json\n\n{"repositories":["core-auth-service","db-migrator","internal-api"]}',
    remediation:
      'Restricted registry endpoint access behind strict mTLS authentication and internal subnet IP allowlists.',
  },
  {
    id: 'h1-03',
    title: 'Unauthenticated Prometheus Metrics Endpoint',
    scope: 'Bumba Scope Target',
    severity: 'MEDIUM',
    cvss: '5.3 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N)',
    cwe: 'CWE-200: Information Disclosure',
    date: 'Nov 2025',
    status: 'CONFIRMED & RESOLVED',
    summary:
      'Identified public exposure of the /metrics scraping endpoint exposing internal node health, thread pool metrics, database connection pool statistics, and internal IP topology.',
    attackVector:
      '1. Fuzzing standard telemetry paths on live subdomains.\n2. GET /metrics returned complete Prometheus text format telemetry.',
    proofOfConcept:
      'curl -s "https://metrics.target.com/metrics" | head -n 15\n# HELP http_requests_total The total number of HTTP requests.\n# TYPE http_requests_total counter\nhttp_requests_total{method="POST",handler="/api/v1/login",status="200"} 48102',
    remediation:
      'Enforced reverse proxy routing rules blocking external requests to /metrics and bound Prometheus listener to localhost.',
  },
];

interface BountyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BountyReaderModal({ isOpen, onClose }: BountyModalProps) {
  const [activeFinding, setActiveFinding] = useState<BountyFinding>(findings[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white border border-[#e5e5e5] rounded-[28px] max-w-[880px] w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#eee] hover:bg-[#f5f5f5] text-[#080808] transition-colors cursor-pointer"
          aria-label="Close case studies modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-[#080808] text-white">
              HACKERONE RESEARCH
            </span>
            <span className="text-[10px] font-mono text-[#666]">
              CONFIRMED VULNERABILITY DISCLOSURES
            </span>
          </div>
          <h2 className="text-[26px] md:text-[32px] font-black uppercase text-[#080808]">
            BUG BOUNTY CASE STUDIES
          </h2>
        </div>

        {/* Tabs for findings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
          {findings.map((f) => {
            const isSelected = activeFinding.id === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFinding(f)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#080808] text-white border-[#080808] shadow-md'
                    : 'bg-[#fafafa] text-[#333] border-[#e8e8e8] hover:border-[#111] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                  <span className={isSelected ? 'text-white/80' : 'text-[#888]'}>{f.date}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                      f.severity === 'HIGH'
                        ? 'bg-[#f87171] text-black'
                        : 'bg-[#fb923c] text-black'
                    }`}
                  >
                    {f.severity}
                  </span>
                </div>
                <div className="text-[12px] font-bold truncate leading-tight">
                  {f.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Finding Detail Body */}
        <div className="space-y-6">
          {/* Overview Bar */}
          <div className="p-4 bg-[#fafafa] border border-[#eee] rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase text-[#999]">TARGET SCOPE</div>
              <div className="text-[13px] font-bold text-[#080808]">{activeFinding.scope}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-[#999]">CVSS SCORE</div>
              <div className="text-[13px] font-mono font-bold text-[#080808]">{activeFinding.cvss}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-[#999]">WEAKNESS</div>
              <div className="text-[13px] font-mono text-[#080808]">{activeFinding.cwe}</div>
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#15803d] bg-[#dcfce7] px-2.5 py-1 rounded-full">
                <CheckCircle2 size={12} strokeWidth={2.5} />
                {activeFinding.status}
              </span>
            </div>
          </div>

          {/* Vulnerability Summary */}
          <div>
            <h3 className="text-[12px] font-black uppercase tracking-[0.14em] text-[#080808] mb-2">
              VULNERABILITY SUMMARY
            </h3>
            <p className="text-[14px] text-[#444] leading-relaxed">
              {activeFinding.summary}
            </p>
          </div>

          {/* Attack Path */}
          <div>
            <h3 className="text-[12px] font-black uppercase tracking-[0.14em] text-[#080808] mb-2">
              ATTACK PATH & METHODOLOGY
            </h3>
            <pre className="p-4 bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl text-[12px] font-mono text-[#333] whitespace-pre-wrap leading-relaxed">
              {activeFinding.attackVector}
            </pre>
          </div>

          {/* Proof of Concept */}
          <div>
            <h3 className="text-[12px] font-black uppercase tracking-[0.14em] text-[#080808] mb-2">
              PROOF OF CONCEPT (REDACTED)
            </h3>
            <pre className="p-4 bg-[#080808] rounded-xl text-[12px] font-mono text-[#ddd] whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {activeFinding.proofOfConcept}
            </pre>
          </div>

          {/* Remediation */}
          <div className="p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#166534] mb-1">
              REMEDIATION & VENDOR FIX
            </h4>
            <p className="text-[13px] text-[#14532d] leading-relaxed">
              {activeFinding.remediation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
