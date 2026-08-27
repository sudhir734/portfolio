import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import NetworkConnections from './NetworkConnections';
import { Search, Crosshair, Layers, Shield } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

interface SystemVisualizationProps {
  selectedDomain?: string | null;
  onSelectDomain?: (domain: string | null) => void;
}

/* ── Tactical Telemetry Node ── */
function TelemetryBadge({
  tag,
  metric,
  status,
  className,
  offset,
}: {
  tag: string;
  metric: string;
  status: 'ACTIVE' | 'BLOCKED' | 'VALIDATED';
  className?: string;
  offset?: { x: any; y: any };
}) {
  const statusColors = {
    ACTIVE: 'text-[#16a34a] border-[#16a34a]/40 bg-[#16a34a]/10',
    BLOCKED: 'text-[#dc2626] border-[#dc2626]/40 bg-[#dc2626]/10',
    VALIDATED: 'text-[#0284c7] border-[#0284c7]/40 bg-[#0284c7]/10',
  };

  return (
    <motion.div
      style={offset ? { x: offset.x, y: offset.y } : undefined}
      className={`absolute ${className} pointer-events-none z-30`}
    >
      <div className="bg-white border-2 border-[#d0d0d0] shadow-[0_6px_16px_rgba(0,0,0,0.08)] rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 flex items-center gap-2 font-mono">
        <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping shrink-0" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-[11px] font-black text-[#080808] tracking-tight">{tag}</span>
            <span className={`text-[8px] font-black px-1.5 py-0.2 rounded border ${statusColors[status]}`}>
              {status}
            </span>
          </div>
          <span className="text-[9px] font-bold text-[#444]">{metric}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Satellite Diamond ── */
function SatelliteDiamond({
  icon: Icon,
  label,
  className,
  isSelected,
  onClick,
}: {
  icon: React.ElementType;
  label: string[];
  className?: string;
  domain?: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={() => soundFx.playHover()}
      onClick={() => {
        soundFx.playClick();
        onClick?.();
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      className={`absolute ${className} cursor-pointer group z-20`}
      title={`Click to filter operations: ${label.join(' ')}`}
    >
      <div
        className={`w-[72px] h-[72px] sm:w-[76px] sm:h-[76px] rotate-45 transition-colors duration-300 ${
          isSelected
            ? 'bg-[#080808] border border-[#080808] shadow-2xl'
            : 'bg-white border-2 border-[#d0d0d0] shadow-md group-hover:border-[#080808]'
        }`}
      >
        <div className="-rotate-45 flex flex-col items-center justify-center w-full h-full">
          <Icon
            size={16}
            strokeWidth={2.2}
            className={`mb-1 transition-colors ${
              isSelected ? 'text-white' : 'text-[#080808] group-hover:text-black'
            }`}
          />
          {label.map((line, i) => (
            <span
              key={i}
              className={`text-[8.5px] sm:text-[9px] font-black tracking-[0.14em] uppercase leading-tight transition-colors ${
                isSelected ? 'text-white' : 'text-[#080808]'
              }`}
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Dot Grid ── */
function DotGrid({ className }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: 100,
        height: 80,
        backgroundImage: 'radial-gradient(circle, #999 1.5px, transparent 1.5px)',
        backgroundSize: '12px 12px',
        opacity: 0.18,
      }}
    />
  );
}

/* ── Main Visualization ── */
export default function SystemVisualization({
  selectedDomain,
  onSelectDomain,
}: SystemVisualizationProps) {
  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-200, 200], [8, -8]);
  const rotateY = useTransform(smoothX, [-200, 200], [-8, 8]);

  const offset1 = {
    x: useTransform(smoothX, [-200, 200], [-12, 12]),
    y: useTransform(smoothY, [-200, 200], [-12, 12]),
  };
  const offset2 = {
    x: useTransform(smoothX, [-200, 200], [14, -14]),
    y: useTransform(smoothY, [-200, 200], [14, -14]),
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleDomain = (dom: string) => {
    if (onSelectDomain) {
      onSelectDomain(selectedDomain === dom ? null : dom);
    }
  };

  return (
    <div className="w-full max-w-[520px] h-[380px] sm:h-[460px] md:h-[520px] flex items-center justify-center relative overflow-visible">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[520px] h-[520px] select-none
          scale-[0.68] xs:scale-[0.74] sm:scale-[0.88] md:scale-[0.92] lg:scale-100
          origin-center perspective-[1000px]"
      >
        {/* Network connections layer */}
        <NetworkConnections />

        {/* Dot grids */}
        <DotGrid className="top-[30px] left-[60px]" />
        <DotGrid className="bottom-[60px] right-[40px]" />
        <DotGrid className="top-[200px] right-[10px]" />

        {/* Central Diamond */}
        <motion.div
          onClick={() => onSelectDomain && onSelectDomain(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
          title="Reset filter"
        >
          <div
            className="w-[190px] h-[190px] sm:w-[200px] sm:h-[200px] bg-[#080808] rotate-45 flex items-center justify-center transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <div className="-rotate-45 text-center text-white">
              {/* Mini logo */}
              <div className="flex justify-center mb-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="9" y="0.5" width="11" height="11" transform="rotate(45 9 0.5)" fill="white" opacity="0.3" />
                  <rect x="9" y="3" width="7" height="7" transform="rotate(45 9 3)" fill="white" opacity="0.5" />
                </svg>
              </div>
              <div className="text-[13px] font-bold tracking-[0.04em] leading-tight">
                SECURITY IS
              </div>
              <div className="text-[21px] font-extrabold tracking-[0.02em] leading-tight mb-2">
                A SYSTEM.
              </div>
              <div className="text-[9px] tracking-[0.18em] text-white/80 font-bold">
                UNDERSTAND IT.
              </div>
              <div className="text-[9px] tracking-[0.18em] text-white/80 font-bold">
                IMPROVE IT.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Satellite Diamonds */}
        <SatelliteDiamond
          icon={Search}
          label={['RESEARCH']}
          domain="research"
          isSelected={selectedDomain === 'research'}
          onClick={() => toggleDomain('research')}
          className="top-[20px] left-1/2 -translate-x-1/2"
        />

        <SatelliteDiamond
          icon={Crosshair}
          label={['ATTACK', 'SURFACE']}
          domain="attack"
          isSelected={selectedDomain === 'attack'}
          onClick={() => toggleDomain('attack')}
          className="top-1/2 left-[20px] -translate-y-1/2"
        />

        <SatelliteDiamond
          icon={Layers}
          label={['SYSTEMS']}
          domain="systems"
          isSelected={selectedDomain === 'systems'}
          onClick={() => toggleDomain('systems')}
          className="top-1/2 right-[20px] -translate-y-1/2"
        />

        <SatelliteDiamond
          icon={Shield}
          label={['DEFENSE']}
          domain="defense"
          isSelected={selectedDomain === 'defense'}
          onClick={() => toggleDomain('defense')}
          className="bottom-[20px] left-1/2 -translate-x-1/2"
        />

        {/* 5 Tactical Telemetry Badges */}
        <TelemetryBadge
          tag="SENTINELSHIELD"
          metric="LATENCY: <3.2ms"
          status="BLOCKED"
          className="top-[35px] right-[20px]"
          offset={offset1}
        />

        <TelemetryBadge
          tag="HACKERONE ADVISORY"
          metric="CWE-306 // HIGH"
          status="VALIDATED"
          className="top-[270px] left-[-20px]"
          offset={offset2}
        />

        <TelemetryBadge
          tag="SFTM AUDIT ENGINE"
          metric="SHA-256 DIGEST"
          status="VALIDATED"
          className="bottom-[60px] left-[30px]"
          offset={offset1}
        />

        <TelemetryBadge
          tag="ACTIVE DIRECTORY"
          metric="KERBEROS ATTACK CHAIN"
          status="ACTIVE"
          className="bottom-[35px] right-[35px]"
          offset={offset2}
        />

        <TelemetryBadge
          tag="MITRE ATT&CK"
          metric="T1190 · EXPLOIT DEFENSE"
          status="ACTIVE"
          className="top-[85px] left-[10px]"
          offset={offset1}
        />
      </motion.div>
    </div>
  );
}
