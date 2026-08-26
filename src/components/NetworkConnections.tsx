import { motion } from 'framer-motion';

export default function NetworkConnections() {
  return (
    <svg
      viewBox="0 0 520 520"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#080808" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Primary connecting network lines */}
      {/* Center (260, 260) to Top Satellite (260, 56) */}
      <path
        d="M260 160 L260 92"
        stroke="#111111"
        strokeWidth="1.2"
      />
      <path
        d="M260 20 L260 0"
        stroke="#d0d0d0"
        strokeWidth="1"
      />

      {/* Center to Bottom Satellite (260, 464) */}
      <path
        d="M260 360 L260 428"
        stroke="#111111"
        strokeWidth="1.2"
      />
      <path
        d="M260 500 L260 520"
        stroke="#d0d0d0"
        strokeWidth="1"
      />

      {/* Center to Left Satellite (56, 260) */}
      <path
        d="M160 260 L92 260"
        stroke="#111111"
        strokeWidth="1.2"
      />
      <path
        d="M20 260 L0 260"
        stroke="#d0d0d0"
        strokeWidth="1"
      />

      {/* Center to Right Satellite (464, 260) */}
      <path
        d="M360 260 L428 260"
        stroke="#111111"
        strokeWidth="1.2"
      />
      <path
        d="M500 260 L520 260"
        stroke="#d0d0d0"
        strokeWidth="1"
      />

      {/* Technical curved & angled interconnects */}
      <path
        d="M260 56 Q380 90 464 260"
        stroke="#e2e2e2"
        strokeWidth="1"
      />
      <path
        d="M260 56 Q140 90 56 260"
        stroke="#e2e2e2"
        strokeWidth="1"
      />
      <path
        d="M56 260 Q140 430 260 464"
        stroke="#e2e2e2"
        strokeWidth="1"
      />
      <path
        d="M464 260 Q380 430 260 464"
        stroke="#e2e2e2"
        strokeWidth="1"
      />

      {/* Radiating technical diagonal rays */}
      <path
        d="M190 190 Q120 140 30 110"
        stroke="#ebebeb"
        strokeWidth="0.8"
      />
      <path
        d="M330 190 Q400 130 500 80"
        stroke="#ebebeb"
        strokeWidth="0.8"
      />
      <path
        d="M190 330 Q100 390 20 440"
        stroke="#ebebeb"
        strokeWidth="0.8"
      />
      <path
        d="M330 330 Q420 380 510 410"
        stroke="#ebebeb"
        strokeWidth="0.8"
      />

      {/* Extended technical circuitry paths */}
      <path
        d="M260 92 L360 40 L450 40"
        stroke="#e0e0e0"
        strokeWidth="0.8"
      />
      <path
        d="M92 260 L40 180 L40 120"
        stroke="#e0e0e0"
        strokeWidth="0.8"
      />
      <path
        d="M428 260 L490 320 L510 320"
        stroke="#e0e0e0"
        strokeWidth="0.8"
      />
      <path
        d="M260 428 L180 490 L120 490"
        stroke="#e0e0e0"
        strokeWidth="0.8"
      />

      {/* Animated Data Packets (Pulsing Signals) */}
      <motion.circle
        cx="260"
        cy="126"
        r="3"
        fill="#080808"
        animate={{ y: [-34, 34, -34], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="260"
        cy="394"
        r="3"
        fill="#080808"
        animate={{ y: [34, -34, 34], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="126"
        cy="260"
        r="3"
        fill="#080808"
        animate={{ x: [-34, 34, -34], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.circle
        cx="394"
        cy="260"
        r="3"
        fill="#080808"
        animate={{ x: [34, -34, 34], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Network Nodes (Circles & Diamonds) */}
      <circle cx="260" cy="120" r="3" fill="#080808" />
      <circle cx="260" cy="400" r="3" fill="#080808" />
      <circle cx="120" cy="260" r="3" fill="#080808" />
      <circle cx="400" cy="260" r="3" fill="#080808" />

      {/* Peripheral intersection points */}
      <circle cx="360" cy="40" r="2.5" fill="#080808" />
      <circle cx="40" cy="180" r="2.5" fill="#080808" />
      <circle cx="490" cy="320" r="2.5" fill="#080808" />
      <circle cx="180" cy="490" r="2.5" fill="#080808" />

      {/* Subtle hollow nodes */}
      <circle cx="380" cy="140" r="3" stroke="#080808" strokeWidth="1" fill="#ffffff" />
      <circle cx="140" cy="380" r="3" stroke="#080808" strokeWidth="1" fill="#ffffff" />
      <circle cx="140" cy="140" r="2" fill="#aaaaaa" />
      <circle cx="380" cy="380" r="2" fill="#aaaaaa" />

      {/* Tiny pulse nodes */}
      <circle cx="425" cy="190" r="2.5" fill="#080808" className="animate-pulse-node" />
      <circle cx="95" cy="330" r="2.5" fill="#080808" className="animate-pulse-node" />
      <circle cx="210" cy="85" r="2" fill="#666666" />
      <circle cx="310" cy="435" r="2" fill="#666666" />

      {/* Little crosshairs / technical markers */}
      <path d="M450 36 V44 M446 40 H454" stroke="#888888" strokeWidth="0.8" />
      <path d="M70 410 V418 M66 414 H74" stroke="#888888" strokeWidth="0.8" />
      <path d="M460 450 V458 M456 454 H464" stroke="#aaaaaa" strokeWidth="0.8" />
    </svg>
  );
}
