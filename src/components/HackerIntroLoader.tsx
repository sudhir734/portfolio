import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/soundFx';

interface HackerIntroLoaderProps {
  onComplete: () => void;
}

export default function HackerIntroLoader({ onComplete }: HackerIntroLoaderProps) {
  const [phase, setPhase] = useState<'emerge' | 'smile' | 'unlock' | 'done'>('emerge');
  const [progress, setProgress] = useState(0);
  const [telemetry, setTelemetry] = useState('INITIATING_ZERO_TRUST_SESSION');

  useEffect(() => {
    // Sound on start
    soundFx.playCyberBlip();

    // Progress counter timer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    // Sequence stages
    const timer1 = setTimeout(() => {
      setPhase('smile');
      setTelemetry('TARGET_ACQUIRED // RECOGNITION_VERIFIED');
    }, 900);

    const timer2 = setTimeout(() => {
      setPhase('unlock');
      setTelemetry('ACCESS_GRANTED // SUDHIR_GUNNAM');
      soundFx.playClick();
    }, 2000);

    const timer3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2700);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#050608] flex flex-col items-center justify-center overflow-hidden select-none"
          onClick={() => {
            setPhase('done');
            onComplete();
          }}
        >
          {/* Ambient Lighting Behind Hacker Figure */}
          <motion.div
            animate={{
              opacity: phase === 'smile' ? [0.2, 0.5, 0.3] : 0.15,
              scale: phase === 'smile' ? [1, 1.15, 1.05] : 1,
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#10b981]/20 via-[#3b82f6]/10 to-transparent blur-[120px] pointer-events-none"
          />

          {/* CRT Scanline Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              backgroundSize: '100% 4px, 6px 100%',
            }}
          />

          {/* Center Hacker Figure Container with Smooth 3D & Scale Motions */}
          <div className="relative w-[340px] md:w-[460px] aspect-square flex items-center justify-center">
            {/* The Hacker Image */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{
                scale: phase === 'unlock' ? 1.04 : 1,
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src="/hacker-mask.png"
                alt="Black Hat Hacker"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />

              {/* Glowing Grin / Smile Light Sweep Animation (Phase: Smile) */}
              <AnimatePresence>
                {phase === 'smile' && (
                  <>
                    {/* Dynamic Iridescent Smile Flare */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: [0, 0.85, 0.4, 0.9, 0],
                        scale: [0.85, 1.08, 1],
                      }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      className="absolute top-[52%] left-[44%] w-16 h-8 bg-gradient-to-r from-transparent via-[#22c55e]/70 to-transparent blur-[6px] pointer-events-none rounded-full"
                    />

                    {/* Mask Eyes Neon Glimmer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.9, 0.3, 0.8, 0] }}
                      transition={{ duration: 1.0, delay: 0.1 }}
                      className="absolute top-[43%] left-[42%] w-20 h-4 bg-gradient-to-r from-transparent via-[#38bdf8]/80 to-transparent blur-[4px] pointer-events-none rounded-full"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Holographic Target Lock Brackets around Mask */}
              <motion.div
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: phase === 'smile' ? 0.7 : 0.25, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-8 pointer-events-none border border-white/10 rounded-3xl"
              >
                {/* Corner crosshairs */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#10b981]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#10b981]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#10b981]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#10b981]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Telemetry HUD */}
          <div className="relative z-10 text-center space-y-3 mt-4 max-w-[380px] w-full px-6">
            {/* Decrypting Status Stream */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#10b981]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                {telemetry}
              </span>
              <span>{Math.min(progress, 100)}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#10b981] via-[#38bdf8] to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Name / Subtitle */}
            <div className="pt-2 text-[10px] font-mono text-white/50 tracking-widest uppercase">
              SUDHIR GUNNAM // OFFENSIVE SECURITY PORTFOLIO
            </div>

            {/* Skip hint */}
            <div className="text-[9px] font-mono text-white/30 pt-1">
              [ CLICK ANYWHERE TO SKIP ]
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
