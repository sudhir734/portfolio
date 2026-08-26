import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Wifi, Cpu, Lock } from 'lucide-react';

interface MotoCardIntroProps {
  onComplete: () => void;
}

export default function MotoCardIntro({ onComplete }: MotoCardIntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState<'emerge' | 'rotate' | 'flare' | 'unlock'>('emerge');
  const [progress, setProgress] = useState(0);

  const handleFinish = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenMotoIntro', 'true');
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  useEffect(() => {
    if (sessionStorage.getItem('hasSeenMotoIntro') === 'true') {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 60);

    // Sequence stages
    const t1 = setTimeout(() => setStage('rotate'), 600);
    const t2 = setTimeout(() => setStage('flare'), 1600);
    const t3 = setTimeout(() => setStage('unlock'), 2800);
    const t4 = setTimeout(() => handleFinish(), 3600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(14px)',
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#050608] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Ambient Lighting Dome */}
          <motion.div
            animate={{
              opacity: stage === 'flare' || stage === 'unlock' ? 0.4 : 0.2,
              scale: stage === 'flare' ? 1.3 : 1,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-b from-emerald-500/20 via-cyan-500/10 to-transparent blur-[160px] pointer-events-none"
          />

          {/* Perspective 3D Container */}
          <div className="relative w-[340px] sm:w-[420px] md:w-[480px] h-[220px] sm:h-[265px] md:h-[300px] perspective-[1200px] flex items-center justify-center">
            {/* The 3D Physical Titanium Security Card */}
            <motion.div
              initial={{
                rotateX: 45,
                rotateY: -35,
                rotateZ: -10,
                scale: 0.75,
                opacity: 0,
                y: 60,
              }}
              animate={{
                rotateX: stage === 'unlock' ? 0 : stage === 'flare' ? 8 : stage === 'rotate' ? 14 : 35,
                rotateY: stage === 'unlock' ? 0 : stage === 'flare' ? -10 : stage === 'rotate' ? -18 : -28,
                rotateZ: stage === 'unlock' ? 0 : stage === 'flare' ? -2 : -6,
                scale: stage === 'unlock' ? 1.05 : stage === 'flare' ? 1 : 0.9,
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full h-full rounded-[24px] p-7 md:p-8 bg-gradient-to-br from-[#1c2128] via-[#0d1117] to-[#05070a] border border-[#30363d] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.15)] flex flex-col justify-between overflow-hidden"
            >
              {/* Brushed Titanium Sheen Texture */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                }}
              />

              {/* Holographic Light Flare Sweep */}
              <motion.div
                animate={{
                  x: stage === 'flare' || stage === 'unlock' ? ['-100%', '200%'] : '-100%',
                }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] blur-[8px]"
              />

              {/* Card Header: Chip & Security Clearance */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  {/* EMV Microchip */}
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-[#e6c687] via-[#c49a45] to-[#997327] border border-[#d4af37]/60 p-1.5 flex flex-col justify-between shadow-inner">
                    <div className="w-full h-0.5 bg-black/40" />
                    <div className="flex justify-between">
                      <div className="w-2 h-2 rounded-full border border-black/30" />
                      <div className="w-2 h-2 rounded-full border border-black/30" />
                    </div>
                    <div className="w-full h-0.5 bg-black/40" />
                  </div>

                  {/* Contactless NFC Wave */}
                  <Wifi size={18} className="text-white/60 rotate-90" />
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#30363d] backdrop-blur-md">
                  <Lock size={11} className="text-[#10b981]" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#10b981] uppercase">
                    LVL-4 CLEARANCE
                  </span>
                </div>
              </div>

              {/* Card Number / Ident */}
              <div className="relative z-10 my-auto">
                <div className="text-[17px] sm:text-[20px] md:text-[22px] font-mono tracking-[0.24em] text-[#f0f3f6] drop-shadow-md">
                  4820 •••• •••• 7340
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#7e8794] uppercase mt-1">
                  OFFENSIVE SECURITY · RED TEAMING · IDS
                </div>
              </div>

              {/* Card Footer: Name, Role & Hologram */}
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <div className="text-[8px] font-mono tracking-widest text-[#7e8794] uppercase mb-0.5">
                    CARDHOLDER
                  </div>
                  <div className="text-[14px] sm:text-[16px] font-mono font-black tracking-[0.14em] text-white uppercase">
                    SUDHIR GUNNAM
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[8px] font-mono tracking-widest text-[#7e8794] uppercase mb-0.5">
                      VALID THRU
                    </div>
                    <div className="text-[11px] font-mono text-[#cad2dc]">
                      2024 - 2028
                    </div>
                  </div>

                  {/* Holographic Security Emblem */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#10b981]/40 via-[#38bdf8]/40 to-[#e2e8f0]/40 border border-white/30 backdrop-blur-md flex items-center justify-center shadow-lg">
                    <Shield size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Telemetry Progress & Decryption Status */}
          <div className="relative z-10 text-center space-y-3 mt-10 max-w-[340px] w-full px-6">
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#10b981]">
              <span className="flex items-center gap-2">
                <Cpu size={13} className="animate-spin-slow" />
                <span>INITIALIZING_INTERFACE</span>
              </span>
              <span>{progress}%</span>
            </div>

            {/* Glowing Telemetry Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#10b981] via-[#38bdf8] to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Skip Control */}
            <button
              onClick={handleFinish}
              className="mt-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white text-[9px] font-mono tracking-widest uppercase transition-all cursor-pointer"
            >
              SKIP [ESC]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
