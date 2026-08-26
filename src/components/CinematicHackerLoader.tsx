import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CinematicHackerLoaderProps {
  onComplete: () => void;
}

export default function CinematicHackerLoader({ onComplete }: CinematicHackerLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'emerge' | 'stare' | 'smile' | 'unlock'>('emerge');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('AUTHENTICATING_SESSION...');

  // Interactive mouse gaze parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-300, 300], [6, -6]);
  const rotateY = useTransform(smoothX, [-300, 300], [-8, 8]);

  const handleFinish = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenVideoLoader', 'true');
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  useEffect(() => {
    if (sessionStorage.getItem('hasSeenVideoLoader') === 'true') {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const middleX = window.innerWidth / 2;
      const middleY = window.innerHeight / 2;
      mouseX.set(e.clientX - middleX);
      mouseY.set(e.clientY - middleY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Progress bar ticker
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Cinematic sequence timeline
    const t1 = setTimeout(() => {
      setPhase('stare');
      setStatusText('TARGET_LOCKED // SUBJECT_ACQUIRED');
    }, 1200);

    const t2 = setTimeout(() => {
      setPhase('smile');
      setStatusText('IDENTITY_CONFIRMED // DECRYPTING');
    }, 2800);

    const t3 = setTimeout(() => {
      setPhase('unlock');
      setStatusText('ACCESS_GRANTED // SUDHIR_GUNNAM');
    }, 4500);

    const t4 = setTimeout(() => {
      handleFinish();
    }, 5400);

    // Keyboard ESC to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
            scale: 1.09,
            filter: 'blur(16px)',
            transition: {
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-[99999] bg-[#040507] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Volumetric Cyber Backlight Dome */}
          <motion.div
            animate={{
              opacity: phase === 'smile' || phase === 'unlock' ? [0.35, 0.6, 0.4] : 0.2,
              scale: phase === 'smile' ? [1, 1.2, 1.05] : 1,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-b from-cyan-500/20 via-emerald-500/10 to-transparent blur-[140px] pointer-events-none"
          />

          {/* CRT Fine Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
              backgroundSize: '100% 4px',
            }}
          />

          {/* Central 3D Interactive Animated Hacker Figure */}
          <motion.div
            style={{
              rotateX: phase !== 'emerge' ? rotateX : 0,
              rotateY: phase !== 'emerge' ? rotateY : 0,
              transformPerspective: 1000,
            }}
            className="relative w-[340px] md:w-[480px] aspect-square flex items-center justify-center"
          >
            {/* The Character Render */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(12px) brightness(0.2)' }}
              animate={{
                scale: phase === 'unlock' ? 1.05 : phase === 'smile' ? 1.02 : 1,
                opacity: 1,
                filter: 'blur(0px) brightness(1)',
              }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src="/hacker-mask.png"
                alt="Masked Protagonist"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
              />

              {/* Dynamic Animated Smile & Eye Gleam (Phase: Smile) */}
              {(phase === 'smile' || phase === 'unlock') && (
                <>
                  {/* Eye Neon Reflection Glimmer */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{
                      opacity: [0, 0.9, 0.35, 0.85, 0.2],
                      scaleX: [0.5, 1.1, 1],
                    }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                    className="absolute top-[43.5%] left-[42%] w-20 h-3 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-[3px] pointer-events-none rounded-full"
                  />

                  {/* The Smile Curve Flare Sweep */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.6 }}
                    animate={{
                      opacity: [0, 0.95, 0.45, 0.9, 0.2],
                      scaleX: [0.6, 1.15, 1],
                    }}
                    transition={{ duration: 1.6, ease: 'easeInOut' }}
                    className="absolute top-[52.5%] left-[43.5%] w-16 h-7 bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent blur-[5px] pointer-events-none rounded-full"
                  />
                </>
              )}

              {/* Target Locking Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: phase === 'smile' || phase === 'unlock' ? 0.6 : 0.2,
                  scale: 1,
                }}
                transition={{ duration: 0.8 }}
                className="absolute inset-6 pointer-events-none border border-white/10 rounded-2xl"
              >
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#10b981]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#10b981]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#10b981]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#10b981]" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Decryption HUD & Progress Bar */}
          <div className="relative z-10 text-center space-y-3 mt-6 max-w-[360px] w-full px-6">
            {/* Decrypting Status Stream */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#10b981]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                {statusText}
              </span>
              <span>{progress}%</span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#10b981] via-[#38bdf8] to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Subtitle */}
            <div className="pt-2 text-[10px] font-mono text-white/50 tracking-widest uppercase">
              SUDHIR GUNNAM // OFFENSIVE SECURITY PORTFOLIO
            </div>

            {/* Skip Button */}
            <button
              onClick={handleFinish}
              className="mt-3 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white text-[9px] font-mono tracking-widest uppercase transition-all cursor-pointer"
            >
              SKIP [ESC]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
