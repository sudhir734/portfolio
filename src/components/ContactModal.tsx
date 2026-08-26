import { useState } from 'react';
import { Mail, Phone, Copy, Check, X, Shield, ArrowUpRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPgp: () => void;
}

export default function ContactModal({ isOpen, onClose, onOpenPgp }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const email = 'gunnamsudhir5@gmail.com';
  const phone = '+91 8919882181';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white border border-[#e5e5e5] rounded-[28px] max-w-[560px] w-full shadow-[0_25px_70px_rgba(0,0,0,0.25)] p-6 md:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#e5e5e5] hover:bg-[#f5f5f5] text-[#080808] transition-colors cursor-pointer"
          aria-label="Close contact modal"
        >
          <X size={18} />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#666]">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[26px] md:text-[30px] font-black uppercase tracking-tight text-[#080808] mb-2 leading-tight">
          CONNECT // SUDHIR GUNNAM
        </h2>

        <p className="text-[14px] text-[#555] leading-relaxed mb-6 font-normal">
          Available for cybersecurity roles, penetration testing internships, red teaming research, and responsible disclosure inquiries.
        </p>

        {/* Primary Contact Channels */}
        <div className="space-y-3 mb-6">
          {/* Email Row */}
          <div className="flex items-center justify-between p-3.5 bg-[#fafafa] border border-[#eaeaea] rounded-2xl transition-colors hover:border-[#111]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e0e0e0] flex items-center justify-center text-[#080808] shrink-0">
                <Mail size={18} strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#999]">EMAIL ADDRESS</div>
                <a href={`mailto:${email}`} className="text-[13px] font-bold text-[#080808] truncate hover:underline block">
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-white border border-[#e0e0e0] hover:border-[#080808] text-[#080808] transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail ? <Check size={14} className="text-[#10b981]" /> : <Copy size={14} />}
              </button>
              <a
                href={`mailto:${email}`}
                className="px-3 py-1.5 rounded-lg bg-[#080808] text-white text-[11px] font-extrabold uppercase tracking-wider hover:bg-[#222] transition-colors"
              >
                Send
              </a>
            </div>
          </div>

          {/* Phone Row */}
          <div className="flex items-center justify-between p-3.5 bg-[#fafafa] border border-[#eaeaea] rounded-2xl transition-colors hover:border-[#111]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e0e0e0] flex items-center justify-center text-[#080808] shrink-0">
                <Phone size={18} strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#999]">PHONE // WHATSAPP</div>
                <a href={`tel:${phone}`} className="text-[13px] font-bold text-[#080808] truncate hover:underline block">
                  {phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                onClick={copyPhone}
                className="p-2 rounded-lg bg-white border border-[#e0e0e0] hover:border-[#080808] text-[#080808] transition-colors cursor-pointer"
                title="Copy phone number"
              >
                {copiedPhone ? <Check size={14} className="text-[#10b981]" /> : <Copy size={14} />}
              </button>
              <a
                href={`tel:${phone}`}
                className="px-3 py-1.5 rounded-lg bg-[#080808] text-white text-[11px] font-extrabold uppercase tracking-wider hover:bg-[#222] transition-colors"
              >
                Call
              </a>
            </div>
          </div>
        </div>

        {/* Secondary Channels & PGP Key */}
        <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#f0f0f0]">
          <a
            href="https://github.com/sudhir734"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#fafafa] border border-[#eaeaea] hover:border-[#080808] rounded-xl flex flex-col items-center justify-center gap-1.5 text-center transition-all group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#080808]">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#080808] flex items-center gap-1">
              GitHub <ArrowUpRight size={11} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>

          <a
            href="https://linkedin.com/in/sudhirgunnam"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#fafafa] border border-[#eaeaea] hover:border-[#080808] rounded-xl flex flex-col items-center justify-center gap-1.5 text-center transition-all group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#080808]">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#080808] flex items-center gap-1">
              LinkedIn <ArrowUpRight size={11} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenPgp();
            }}
            className="p-3 bg-[#080808] text-white rounded-xl flex flex-col items-center justify-center gap-1.5 text-center hover:bg-[#222] transition-all cursor-pointer"
          >
            <Shield size={16} className="text-white" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">
              PGP Key
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
