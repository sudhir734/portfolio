import { useState, useRef } from 'react';
import { Shield, Cpu, Wifi, Lock } from 'lucide-react';

export default function CyberCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      className="relative perspective-[1200px] w-full max-w-[460px] mx-auto select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative aspect-[1.586/1] w-full rounded-[24px] p-6 md:p-8 bg-gradient-to-br from-[#1c1f24] via-[#111317] to-[#0a0b0d] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-transform duration-150 ease-out overflow-hidden"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic dynamic glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-color-dodge"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, rgba(130, 180, 255, 0.15) 30%, transparent 60%)`,
          }}
        />

        {/* Brushed metallic hairline texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 4px)',
          }}
        />

        {/* Ambient subtle circuit watermark */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 opacity-10 pointer-events-none">
          <Shield size={176} strokeWidth={1} className="text-white" />
        </div>

        {/* Card Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <div className="text-[11px] font-black tracking-[0.2em] uppercase text-white font-mono">
                SUDHIR GUNNAM
              </div>
              <div className="text-[9px] font-mono tracking-wider text-white/50 uppercase">
                OFFENSIVE SECURITY · ID 8919-882
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wifi size={16} className="text-white/60 rotate-90" />
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          </div>
        </div>

        {/* Smart EMV Security Chip */}
        <div className="mb-6 relative z-10 flex items-center justify-between">
          <div className="w-12 h-9 rounded-md bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa8010] border border-[#d4af37]/60 shadow-md relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-[1px] bg-black/30 absolute top-3" />
            <div className="w-full h-[1px] bg-black/30 absolute bottom-3" />
            <div className="h-full w-[1px] bg-black/30 absolute left-4" />
            <div className="h-full w-[1px] bg-black/30 absolute right-4" />
            <Cpu size={14} className="text-black/60 relative z-10" />
          </div>

          <div className="text-right">
            <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/40 uppercase">
              SECURITY PROTOCOL
            </div>
            <div className="text-[12px] font-mono font-extrabold text-white tracking-widest">
              RED TEAM // LEVEL 01
            </div>
          </div>
        </div>

        {/* Card Number & Clearance */}
        <div className="mb-4 relative z-10">
          <div className="text-[14px] md:text-[16px] font-mono font-bold tracking-[0.28em] text-white/90 drop-shadow-sm">
            4096 •••• •••• 7340
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/10">
          <div>
            <div className="text-[8px] font-mono tracking-widest uppercase text-white/40 mb-0.5">
              CLEARANCE & SPECIALIZATION
            </div>
            <div className="text-[11px] font-bold text-white tracking-wider uppercase">
              PENETRATION TESTING / WAF / IDS
            </div>
          </div>

          <div className="text-right flex items-center gap-2">
            <div className="text-[9px] font-mono font-bold text-white/70">
              EXP: <span className="text-white">2028</span>
            </div>
            <div className="w-6 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center">
              <Lock size={11} className="text-white/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
