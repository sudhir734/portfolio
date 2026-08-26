import { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

export default function PayloadEncoder() {
  const [input, setInput] = useState("<script>alert(document.domain)</script>");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const base64Encoded = btoa(input);
  const urlEncoded = encodeURIComponent(input);
  const doubleUrlEncoded = encodeURIComponent(encodeURIComponent(input));
  const hexEncoded = input
    .split('')
    .map((c) => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
  const htmlEntityEncoded = input
    .split('')
    .map((c) => `&#x${c.charCodeAt(0).toString(16)};`)
    .join('');
  const sqlCharEncoded = `CHAR(${input
    .split('')
    .map((c) => c.charCodeAt(0))
    .join(',')})`;

  const encodings = [
    { label: 'URL Encoded (Standard)', value: urlEncoded, key: 'url' },
    { label: 'Double URL Encoded', value: doubleUrlEncoded, key: 'double_url' },
    { label: 'Base64 Encoded', value: base64Encoded, key: 'b64' },
    { label: 'Hex String (\\xNN)', value: hexEncoded, key: 'hex' },
    { label: 'HTML Hex Entities', value: htmlEntityEncoded, key: 'html' },
    { label: 'SQL CHAR() Sequence', value: sqlCharEncoded, key: 'sql' },
  ];

  return (
    <div className="bg-white border border-[#e8e8e8] rounded-[24px] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#f0f0f0] gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#999] mb-1">
            <Code2 size={14} className="text-[#080808]" />
            OFFENSIVE SECURITY UTILITY
          </div>
          <h3 className="text-[20px] font-black uppercase text-[#080808]">
            PAYLOAD ENCODER & OBFUSCATOR
          </h3>
        </div>
        <div className="text-[11px] font-mono text-[#666] bg-[#fafafa] border border-[#eee] px-3 py-1.5 rounded-lg shrink-0">
          6 REAL-TIME ENCODINGS
        </div>
      </div>

      {/* Input Field */}
      <div className="mb-6">
        <label className="block text-[11px] font-bold tracking-wider uppercase text-[#666] mb-2">
          Source Payload Input:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type payload to encode..."
            className="flex-1 bg-[#fafafa] border border-[#dcdcdc] rounded-xl px-4 py-2.5 text-[13px] font-mono text-[#080808] outline-none focus:border-[#080808] transition-colors"
          />
          <button
            onClick={() => setInput("<script>alert('XSS')</script>")}
            className="px-3 py-2 border border-[#dcdcdc] bg-white rounded-xl text-[11px] font-bold text-[#666] hover:text-[#080808] hover:border-[#080808] transition-colors cursor-pointer"
            title="Reset to default payload"
          >
            Preset
          </button>
        </div>
      </div>

      {/* Encodings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {encodings.map((enc) => (
          <div
            key={enc.key}
            className="p-3.5 bg-[#fafafa] border border-[#e8e8e8] rounded-xl flex items-center justify-between gap-3 group hover:border-[#111] transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#888] mb-1">
                {enc.label}
              </div>
              <div className="text-[12px] font-mono text-[#080808] truncate font-medium">
                {enc.value}
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(enc.key, enc.value)}
              className="p-2 rounded-lg bg-white border border-[#e0e0e0] group-hover:border-[#080808] text-[#080808] shrink-0 transition-colors cursor-pointer"
              title="Copy encoded payload"
            >
              {copiedKey === enc.key ? (
                <Check size={14} className="text-[#10b981]" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
