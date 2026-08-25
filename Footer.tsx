export default function Footer() {
  return (
    <footer className="border-t border-[#e8e8e8] bg-white relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-[#080808] rotate-45 shrink-0" />
          <div className="text-[12px] font-extrabold tracking-[0.1em] text-[#080808] uppercase">
            SUDHIR GUNNAM
          </div>
          <span className="text-[12px] text-[#cccccc]">/</span>
          <div className="text-[11px] font-semibold text-[#888888] tracking-wider uppercase">
            SECURITY RESEARCH & ENGINEERING
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center flex-wrap gap-8 text-[11px] font-bold tracking-[0.14em] uppercase text-[#666666]">
          <a
            href="https://github.com/sudhir734"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#080808] transition-colors"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/sudhirgunnam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#080808] transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href="/Sudhir_Gunnam_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#080808] transition-colors"
          >
            RESUME
          </a>
          <a
            href="mailto:gunnamsudhir5@gmail.com"
            className="hover:text-[#080808] transition-colors"
          >
            CONTACT
          </a>
        </div>

        {/* Right copyright */}
        <div className="text-[11px] text-[#999999] tracking-wide">
          © 2026 · ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
