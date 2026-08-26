import { ExternalLink } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20 border-t-2 border-[#e5e5e5]">
      <div className="flex flex-col xl:flex-row items-start gap-10 lg:gap-14">
        {/* Left column */}
        <div className="w-full xl:w-[300px] shrink-0">
          <div className="text-[11px] font-black tracking-[0.2em] uppercase text-[#333333] mb-3">
            BACKGROUND &amp; BIO
          </div>
          <h2 className="text-[38px] md:text-[44px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#080808] mb-6">
            ENGINEERING<br />&amp; ETHICS
          </h2>
          <p className="text-[15px] text-[#333333] leading-relaxed mb-8 max-w-[290px] font-medium">
            Aspiring penetration tester building verified hands-on skills through bug bounty hunting, independent security tooling, and vulnerability research.
          </p>

          <a
            href="./Sudhir_Gunnam_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Sudhir_Gunnam_Resume.pdf"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#080808] text-white text-[12px] font-black tracking-[0.12em] uppercase hover:bg-[#222222] transition-colors shadow-sm"
          >
            DOWNLOAD RESUME (PDF)
            <ExternalLink size={13} strokeWidth={2.5} />
          </a>
        </div>

        {/* Right column */}
        <div className="flex-1 space-y-8 sm:space-y-10 w-full">
          {/* Main Narrative */}
          <div className="bg-white border-2 border-[#e0e0e0] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 shadow-sm">
            <h3 className="text-[20px] sm:text-[22px] font-[900] uppercase text-[#080808] mb-4">
              Sudhir Gunnam — Offensive Security Enthusiast
            </h3>
            <div className="space-y-4 text-[14px] sm:text-[15px] text-[#333333] leading-relaxed font-medium">
              <p>
                Currently pursuing a B.Tech in Information Technology (2024–2028) at DVR &amp; Dr. HS MIC College of Technology, Andhra Pradesh, India. My primary technical focus is offensive security, penetration testing, and defensive intrusion detection engineering.
              </p>
              <p>
                Through independent vulnerability research and responsible disclosure on HackerOne, I analyze application attack surfaces, discovering security flaws ranging from exposed Docker registries to High-severity WebSocket authentication bypasses (CWE-306).
              </p>
              <p>
                Complementing my offensive research, I develop defensive architectures including real-time WAF intrusion detection engines and cryptographic file transfer integrity monitors. Actively working toward eJPT certification with OSCP as a long-term goal.
              </p>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-[#f5f5f5] border-2 border-[#e0e0e0] rounded-[18px] sm:rounded-[20px] p-5 sm:p-6">
              <div className="text-[11px] font-black tracking-[0.15em] text-[#555555] uppercase mb-2">
                ACADEMIC PROGRAM
              </div>
              <div className="text-[14px] sm:text-[15px] font-black text-[#080808]">
                B.Tech in Information Technology
              </div>
              <div className="text-[12px] text-[#444444] font-medium mt-1">
                DVR &amp; Dr. HS MIC College (2024–2028)
              </div>
            </div>

            <div className="bg-[#f5f5f5] border-2 border-[#e0e0e0] rounded-[18px] sm:rounded-[20px] p-5 sm:p-6">
              <div className="text-[11px] font-black tracking-[0.15em] text-[#555555] uppercase mb-2">
                LOCATION
              </div>
              <div className="text-[14px] sm:text-[15px] font-black text-[#080808]">
                Andhra Pradesh, India
              </div>
              <div className="text-[12px] text-[#444444] font-medium mt-1">
                Available for Remote &amp; Onsite Roles
              </div>
            </div>

            <div className="bg-[#f5f5f5] border-2 border-[#e0e0e0] rounded-[18px] sm:rounded-[20px] p-5 sm:p-6">
              <div className="text-[11px] font-black tracking-[0.15em] text-[#555555] uppercase mb-2">
                TARGET CERTIFICATIONS
              </div>
              <div className="text-[14px] sm:text-[15px] font-black text-[#080808]">
                eJPT (In Progress)
              </div>
              <div className="text-[12px] text-[#444444] font-medium mt-1">
                OSCP Target Benchmark
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
