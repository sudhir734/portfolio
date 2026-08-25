import NetworkConnections from './NetworkConnections';
import BlackHat from './BlackHat';
import { Search, Crosshair, Layers, Shield } from 'lucide-react';

interface SystemVisualizationProps {
  selectedDomain?: string | null;
  onSelectDomain?: (domain: string | null) => void;
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
    <div
      onClick={onClick}
      className={`absolute ${className} cursor-pointer group transition-transform duration-300 hover:scale-110 active:scale-95`}
      title={`Click to filter operations: ${label.join(' ')}`}
    >
      <div
        className={`w-[72px] h-[72px] rotate-45 transition-colors duration-300 ${
          isSelected
            ? 'bg-[#080808] border border-[#080808] shadow-xl'
            : 'bg-white border border-[#ddd] shadow-md group-hover:border-[#080808]'
        }`}
      >
        <div className="-rotate-45 flex flex-col items-center justify-center w-full h-full">
          <Icon
            size={14}
            strokeWidth={1.5}
            className={`mb-1 transition-colors ${
              isSelected ? 'text-white' : 'text-[#080808] group-hover:text-black'
            }`}
          />
          {label.map((line, i) => (
            <span
              key={i}
              className={`text-[8px] font-bold tracking-[0.15em] uppercase leading-tight transition-colors ${
                isSelected ? 'text-white' : 'text-[#080808]'
              }`}
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
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
        backgroundImage: 'radial-gradient(circle, #bbb 1px, transparent 1px)',
        backgroundSize: '12px 12px',
        opacity: 0.12,
      }}
    />
  );
}

/* ── Main Visualization ── */
export default function SystemVisualization({
  selectedDomain,
  onSelectDomain,
}: SystemVisualizationProps) {
  const toggleDomain = (dom: string) => {
    if (onSelectDomain) {
      onSelectDomain(selectedDomain === dom ? null : dom);
    }
  };

  return (
    <div className="relative w-[520px] h-[520px] select-none mx-auto
      scale-100
      max-lg:scale-[0.72] max-md:scale-[0.6] max-sm:scale-[0.5]
      origin-center transition-transform duration-500"
    >
      {/* Network connections layer */}
      <NetworkConnections />

      {/* Dot grids */}
      <DotGrid className="top-[30px] left-[60px]" />
      <DotGrid className="bottom-[60px] right-[40px]" />
      <DotGrid className="top-[200px] right-[10px]" />

      {/* Central Diamond */}
      <div
        onClick={() => onSelectDomain && onSelectDomain(null)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
        title="Reset filter"
      >
        <div
          className="w-[200px] h-[200px] bg-[#080808] rotate-45 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.3)',
          }}
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
            <div className="text-[22px] font-extrabold tracking-[0.02em] leading-tight mb-2">
              A SYSTEM.
            </div>
            <div className="text-[8px] tracking-[0.18em] text-white/60 font-medium">
              UNDERSTAND IT.
            </div>
            <div className="text-[8px] tracking-[0.18em] text-white/60 font-medium">
              IMPROVE IT.
            </div>
          </div>
        </div>
      </div>

      {/* Satellite Diamonds */}
      {/* Top - Research */}
      <SatelliteDiamond
        icon={Search}
        label={['RESEARCH']}
        domain="research"
        isSelected={selectedDomain === 'research'}
        onClick={() => toggleDomain('research')}
        className="top-[20px] left-1/2 -translate-x-1/2"
      />

      {/* Left - Attack Surface */}
      <SatelliteDiamond
        icon={Crosshair}
        label={['ATTACK', 'SURFACE']}
        domain="attack"
        isSelected={selectedDomain === 'attack'}
        onClick={() => toggleDomain('attack')}
        className="top-1/2 left-[20px] -translate-y-1/2"
      />

      {/* Right - Systems */}
      <SatelliteDiamond
        icon={Layers}
        label={['SYSTEMS']}
        domain="systems"
        isSelected={selectedDomain === 'systems'}
        onClick={() => toggleDomain('systems')}
        className="top-1/2 right-[20px] -translate-y-1/2"
      />

      {/* Bottom - Defense */}
      <SatelliteDiamond
        icon={Shield}
        label={['DEFENSE']}
        domain="defense"
        isSelected={selectedDomain === 'defense'}
        onClick={() => toggleDomain('defense')}
        className="bottom-[20px] left-1/2 -translate-x-1/2"
      />

      {/* Floating Black Hats (Hacker Aesthetic) */}
      <BlackHat
        rotation={-18}
        scale={1.1}
        className="top-[45px] right-[40px] animate-float-1"
      />
      <BlackHat
        rotation={12}
        scale={0.9}
        className="top-[290px] left-[0px] animate-float-2"
      />
      <BlackHat
        rotation={-25}
        scale={0.85}
        className="bottom-[100px] left-[70px] animate-float-3"
      />
      <BlackHat
        rotation={15}
        scale={1.05}
        className="bottom-[50px] right-[100px] animate-float-1"
      />
      <BlackHat
        rotation={-8}
        scale={0.75}
        className="top-[95px] left-[40px] animate-float-2"
      />
    </div>
  );
}
