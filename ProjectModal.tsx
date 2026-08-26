import { useState } from 'react';
import { X, ExternalLink, ShieldAlert, Cpu, Terminal, Play } from 'lucide-react';
import type { Operation } from '../data/operations';

interface ProjectModalProps {
  operation: Operation | null;
  onClose: () => void;
}

export default function ProjectModal({ operation, onClose }: ProjectModalProps) {
  const [testPayload, setTestPayload] = useState("' OR '1'='1' --");
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  if (!operation) return null;

  const runSimulation = () => {
    const isSQLi = /('|"|--|union|select|insert|update|delete|drop|or\s+1=1)/i.test(testPayload);
    const isXSS = /(<script|javascript:|onerror=|onload=|alert\(|<img|<svg)/i.test(testPayload);
    const isPathTraversal = /(\.\.\/|\.\.\\|\/etc\/passwd)/i.test(testPayload);

    if (isSQLi || isXSS || isPathTraversal) {
      setSimulationResult(
        `🚨 BLOCKED (HTTP 403 Forbidden)\nSignature Match: ${
          isSQLi ? 'CWE-89 SQL Injection' : isXSS ? 'CWE-79 Stored/Reflected XSS' : 'CWE-22 Path Traversal'
        }\nEntropy Score: 0.94 (High Anomalous Confidence)\nAction: Request sanitized, IP rate-limited, incident alert dispatched.`
      );
    } else {
      setSimulationResult(
        `✓ PASSED (HTTP 200 OK)\nAnomaly Score: 0.04 (Benign)\nAction: Traffic routed to backend upstream.`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white border border-[#e0e0e0] rounded-[28px] max-w-[760px] w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-10 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#eee] hover:bg-[#f5f5f5] text-[#080808] transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold tracking-[0.16em] uppercase px-2.5 py-1 rounded bg-[#080808] text-white">
              {operation.number} // {operation.category}
            </span>
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase">
              ● {operation.status}
            </span>
          </div>

          <h2 className="text-[26px] md:text-[32px] font-black uppercase text-[#080808] leading-tight mb-2">
            {operation.title}
          </h2>

          <p className="text-[14px] text-[#555] leading-relaxed">
            {operation.description}
          </p>
        </div>

        {/* Key Metrics / Specs */}
        {operation.stats && (
          <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-[#fafafa] border border-[#f0f0f0] rounded-2xl">
            {operation.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#999]">{s.label}</div>
                <div className="text-[16px] font-black text-[#080808]">{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Architecture */}
        {operation.details && (
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#080808] mb-3 flex items-center gap-2">
                <Cpu size={15} /> System Architecture & Methodology
              </h3>
              <ul className="space-y-2">
                {operation.details.architecture.map((item, idx) => (
                  <li key={idx} className="text-[13px] text-[#444] flex items-start gap-2">
                    <span className="text-[#080808] font-bold">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {operation.details.mitreMapping && (
              <div>
                <h3 className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#080808] mb-2.5 flex items-center gap-2">
                  <ShieldAlert size={15} /> MITRE ATT&CK Mapping
                </h3>
                <div className="flex flex-wrap gap-2">
                  {operation.details.mitreMapping.map((mitre) => (
                    <span
                      key={mitre}
                      className="text-[11px] font-mono px-3 py-1 bg-[#111] text-white rounded-lg"
                    >
                      {mitre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Live Attack Simulator (if SentinelShield) */}
        {operation.id === 'sentinelshield' && (
          <div className="mb-8 p-5 bg-[#080808] rounded-2xl text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 text-[#aaa]">
                <Terminal size={14} className="text-[#4ade80]" />
                Interactive WAF/IDS Inspector
              </div>
              <span className="text-[9px] text-[#666] font-mono">LIVE ENGINE</span>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testPayload}
                  onChange={(e) => setTestPayload(e.target.value)}
                  placeholder="Enter test payload..."
                  className="flex-1 bg-[#161616] border border-[#333] rounded-lg px-3 py-2 text-[12px] font-mono text-white outline-none focus:border-[#555]"
                />
                <button
                  onClick={runSimulation}
                  className="px-4 py-2 bg-white text-black font-extrabold text-[11px] uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-[#e0e0e0] transition-colors cursor-pointer"
                >
                  <Play size={12} fill="currentColor" /> Test
                </button>
              </div>

              {/* Sample Payload Presets */}
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="text-[#666] self-center">Presets:</span>
                {operation.details?.samplePayloads?.map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTestPayload(sample);
                      setSimulationResult(null);
                    }}
                    className="px-2 py-0.5 bg-[#222] hover:bg-[#333] rounded text-[#ccc] font-mono"
                  >
                    {sample.slice(0, 22)}...
                  </button>
                ))}
              </div>

              {simulationResult && (
                <pre className="p-3 bg-[#111] border border-[#262626] rounded-lg text-[11px] font-mono text-[#eee] whitespace-pre-wrap leading-relaxed">
                  {simulationResult}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0]">
          <div className="text-[11px] text-[#888]">
            Technologies: {operation.technologies.join(' · ')}
          </div>

          {operation.link && (
            <a
              href={operation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#080808] text-white text-[11px] font-extrabold tracking-wider uppercase hover:bg-[#222] transition-colors"
            >
              View Repository
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
