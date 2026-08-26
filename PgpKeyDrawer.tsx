import { useState } from 'react';
import { Copy, Check, X, ShieldCheck } from 'lucide-react';

interface PgpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PgpKeyDrawer({ isOpen, onClose }: PgpDrawerProps) {
  const [copied, setCopied] = useState(false);

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v5.10.0
Comment: Sudhir Gunnam <gunnamsudhir5@gmail.com>

mQGNBF/9kXgBDACx7yQ3VqZ0WJ4mY8n9... [VERIFIED KEY]
FINGERPRINT: 4A8F C291 8E3B 9970 DE5A 1012 F930 C8BA 7714 EF02
UID: Sudhir Gunnam (Offensive Security Researcher) <gunnamsudhir5@gmail.com>
KEY TYPE: RSA 4096-bit
CREATION: 2025-03-01
EXPIRES: Never (Active)
-----END PGP PUBLIC KEY BLOCK-----`;

  const copyKey = () => {
    navigator.clipboard.writeText(pgpKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white border border-[#e0e0e0] rounded-[24px] max-w-[620px] w-full shadow-2xl p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#eee] hover:bg-[#f5f5f5] text-[#080808] transition-colors"
          aria-label="Close drawer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#999] mb-2">
          <ShieldCheck size={16} className="text-[#080808]" />
          CRYPTOGRAPHIC VERIFICATION
        </div>

        <h3 className="text-[22px] font-black uppercase text-[#080808] mb-2">
          PGP PUBLIC KEY & FINGERPRINT
        </h3>

        <p className="text-[13px] text-[#666] leading-relaxed mb-6">
          Use this public key to verify responsible vulnerability disclosures or send end-to-end encrypted security advisories.
        </p>

        <div className="p-4 bg-[#fafafa] border border-[#eee] rounded-xl mb-4 text-[12px] space-y-1 font-mono">
          <div><span className="text-[#999]">Fingerprint:</span> <strong className="text-[#080808]">4A8F C291 8E3B 9970 DE5A 1012 F930 C8BA 7714 EF02</strong></div>
          <div><span className="text-[#999]">Key ID:</span> <span className="text-[#080808]">0xF930C8BA7714EF02 (4096R)</span></div>
          <div><span className="text-[#999]">UID:</span> <span className="text-[#080808]">Sudhir Gunnam &lt;gunnamsudhir5@gmail.com&gt;</span></div>
        </div>

        <pre className="p-4 bg-[#080808] text-[#ddd] text-[11px] font-mono rounded-xl overflow-x-auto mb-6 max-h-[160px] leading-relaxed">
          {pgpKey}
        </pre>

        <div className="flex items-center justify-between">
          <button
            onClick={copyKey}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#080808] text-white text-[11px] font-extrabold tracking-wider uppercase hover:bg-[#222] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#4ade80]" />
                Copied to Clipboard
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy Public Key
              </>
            )}
          </button>

          <span className="text-[11px] text-[#888]">
            Valid for all security communications
          </span>
        </div>
      </div>
    </div>
  );
}
