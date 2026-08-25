import { ExternalLink } from 'lucide-react';

export default function AboutSection() {
  const quickFacts = [
    { label: 'STATUS', value: 'B.Tech IT Student & Offensive Security Enthusiast' },
    { label: 'EDUCATION', value: 'B.Tech Information Technology (2024–2028)' },
    { label: 'INSTITUTION', value: 'DVR & Dr. HS MIC College of Technology, AP, India' },
    { label: 'FOCUS', value: 'Penetration Testing, Red Teaming, Bug Bounty' },
    { label: 'INTERNSHIP', value: 'Cybersecurity Intern at Unified Mentor Pvt Ltd' },
    { label: 'CERTIFICATIONS', value: 'Cisco Ethical Hacker · HackerRank SQL · Anthropic' },
    { label: 'CURRENT PURSUIT', value: 'eJPT (In Progress) → Target: OSCP' },
    { label: 'LANGUAGES', value: 'English · Telugu · Hindi' },
  ];

  return (
    <section id="about" className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-[#eeeeee]">
      <div className="flex flex-col xl:flex-row items-start gap-12 lg:gap-14">
        {/* Left column */}
        <div className="w-full xl:w-[280px] shrink-0">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#999999] mb-4">
            BACKGROUND & BIO
          </div>
          <h2 className="text-[38px] md:text-[44px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#080808] mb-6">
            ENGINEERING<br />& ETHICS
          </h2>
          <p className="text-[14px] text-[#666666] leading-relaxed mb-8 max-w-[280px]">
            Aspiring penetration tester building hands-on skills through bug bounty hunting, independent security tooling, and vulnerability research.
          </p>

          <a
            href="/Sudhir_Gunnam_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#080808] text-white text-[10px] font-extrabold tracking-[0.14em] uppercase hover:bg-[#222222] transition-colors"
          >
            DOWNLOAD RESUME
            <ExternalLink size={12} strokeWidth={2.5} />
          </a>
        </div>

        {/* Right column */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Narrative Bio */}
          <div className="bg-white border border-[#e8e8e8] rounded-[24px] p-8 space-y-5 text-[#444444] text-[14px] leading-relaxed">
            <h3 className="text-[16px] font-black uppercase text-[#080808] tracking-wide mb-2">
              Adversarial Mindset, Practical Tooling
            </h3>
            <p>
              I am an Information Technology student at <strong className="text-[#080808]">DVR & Dr. HS MIC College of Technology</strong>, Andhra Pradesh, India, dedicated to offensive cybersecurity, red teaming, and vulnerability research.
            </p>
            <p>
              During my internship at <strong className="text-[#080808]">Unified Mentor Private Limited</strong>, I engineered <strong className="text-[#080808]">SentinelShield</strong> (a real-time intrusion detection system) and the initial version of a Python-based <strong className="text-[#080808]">Secure File Transfer Monitor</strong>.
            </p>
            <p>
              On <strong className="text-[#080808]">HackerOne</strong>, I perform continuous recon across bounty scopes using structured pipelines (<code className="text-[12px] bg-[#f0f0f0] px-1.5 py-0.5 rounded font-mono">subfinder → httpx → nuclei</code>), uncovering high-impact misconfigurations and auth bypasses. I am currently preparing for the <strong className="text-[#080808]">eJPT</strong> credential, with <strong className="text-[#080808]">OSCP</strong> as my primary long-term milestone.
            </p>
          </div>

          {/* Quick Facts List */}
          <div className="bg-[#fafafa] border border-[#e8e8e8] rounded-[24px] p-8 flex flex-col justify-between">
            <h3 className="text-[12px] font-black uppercase text-[#080808] tracking-[0.14em] mb-6">
              SPECIFICATIONS & PROFILE
            </h3>

            <div className="space-y-4">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#ededed] pb-3 gap-1">
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#999999]">
                    {fact.label}
                  </span>
                  <span className="text-[12px] font-semibold text-[#080808] sm:text-right">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between text-[11px] text-[#777777]">
              <span>Email: gunnamsudhir5@gmail.com</span>
              <span>Phone: +91 8919882181</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
