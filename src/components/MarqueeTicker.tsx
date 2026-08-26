export default function MarqueeTicker() {
  const items = [
    'OFFENSIVE SECURITY',
    'PENETRATION TESTING',
    'WEBSOCKET AUTHENTICATION BYPASS',
    'REAL-TIME IDS & WAF ENGINE',
    'SHA-256 INTEGRITY MONITORING',
    'ACTIVE DIRECTORY KERBEROS TRADECRAFT',
    'BUG BOUNTY VULNERABILITY RESEARCH',
    'MITRE ATT&CK MATRIX AUDIT',
    'HEURISTIC PAYLOAD DEFENSE',
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#1a1e24] bg-[#060709] py-4 select-none my-4">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060709] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060709] to-transparent z-10" />

      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-[11px] font-mono font-bold tracking-[0.2em] text-[#7e8794] uppercase">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="hover:text-[#f0f3f6] transition-colors">{text}</span>
            <span className="text-[8px] text-[#10b981]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
