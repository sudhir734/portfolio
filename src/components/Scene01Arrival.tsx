import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { soundFx } from '../utils/soundFx';

interface Scene01ArrivalProps {
  onComplete: () => void;
}

export default function Scene01Arrival({ onComplete }: Scene01ArrivalProps) {
  // Timeline Stages: 'black' -> 'materialize' -> 'tracking' -> 'lock' -> 'smile' -> 'welcome' -> 'exit'
  const [stage, setStage] = useState<'black' | 'materialize' | 'tracking' | 'lock' | 'smile' | 'welcome' | 'exit'>('black');
  const [statusText, setStatusText] = useState('SYSTEM INITIATION');

  // Mouse tracking physics for character gaze
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-300, 300], [5, -5]);
  const rotateY = useTransform(smoothX, [-300, 300], [-7, 7]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const middleX = window.innerWidth / 2;
      const middleY = window.innerHeight / 2;
      mouseX.set(e.clientX - middleX);
      mouseY.set(e.clientY - middleY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // 0.20s: Atmosphere begins
    const t0 = setTimeout(() => {
      setStage('materialize');
      setStatusText('ACQUIRING SUBJECT...');
      soundFx.playCyberBlip();
    }, 300);

    // 1.50s: Tracking visitor
    const t1 = setTimeout(() => {
      setStage('tracking');
      setStatusText('SUBJECT LOCATED // TRACKING');
    }, 1500);

    // 2.70s: Direct Gaze Lock ("It noticed me")
    const t2 = setTimeout(() => {
      setStage('lock');
      setStatusText('GAZE LOCKED // ANALYZING');
      mouseX.set(0);
      mouseY.set(0);
    }, 2700);

    // 3.20s: The Signature Smile
    const t3 = setTimeout(() => {
      setStage('smile');
      setStatusText('IDENTITY VERIFIED');
    }, 3200);

    // 4.20s: Minimal Welcome Reveal
    const t4 = setTimeout(() => {
      setStage('welcome');
      setStatusText('ACCESS GRANTED // SUDHIR GUNNAM');
      soundFx.playClick();
    }, 4200);

    // 5.20s: Camera Pulls Back / Portfolio Emerges
    const t5 = setTimeout(() => {
      setStage('exit');
      onComplete();
    }, 5400);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete, mouseX, mouseY]);

  // Keyboard skip
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        setStage('exit');
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => {
            setStage('exit');
            onComplete();
          }}
          className="fixed inset-0 z-[99998] bg-[#050608] flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
        >
          {/* Ambient Lighting Dome */}
          <motion.div
            animate={{
              opacity: stage === 'smile' || stage === 'welcome' ? 0.35 : stage === 'materialize' ? 0.15 : 0.25,
              scale: stage === 'smile' ? 1.2 : 1,
            }}
            transition={{ duration: 1.5 }}
            className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-b from-emerald-500/20 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none"
          />

          {/* CRT Fine Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
              backgroundSize: '100% 4px',
            }}
          />

          {/* Central Cinematic Character Rig */}
          <motion.div
            style={{
              rotateX: stage === 'tracking' ? rotateX : 0,
              rotateY: stage === 'tracking' ? rotateY : 0,
              transformPerspective: 1000,
            }}
            className="relative w-[340px] md:w-[480px] aspect-square flex items-center justify-center"
          >
            {/* The Character (Fedora & Anonymous Mask) */}
            <motion.div
              initial={{ opacity: 0, scale: 1.08, filter: 'blur(10px) brightness(0.2)' }}
              animate={{
                opacity: stage === 'black' ? 0 : 1,
                scale: stage === 'welcome' ? 1.04 : stage === 'lock' || stage === 'smile' ? 1.02 : 1,
                filter: stage === 'black' ? 'blur(10px) brightness(0.2)' : 'blur(0px) brightness(1)',
              }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src="/hacker-mask.png"
                alt="Masked Protagonist"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
              />

              {/* The Signature Smile Flare & Eye Glimmer */}
              {(stage === 'smile' || stage === 'welcome') && (
                <>
                  {/* Subtle Eye Reflection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.9, 0.4, 0.8, 0] }}
                    transition={{ duration: 1.2 }}
                    className="absolute top-[43.5%] left-[42%] w-20 h-3 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-[3px] pointer-events-none rounded-full"
                  />

                  {/* Smile Curvature Glow */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.7 }}
                    animate={{
                      opacity: [0, 0.95, 0.5, 0.85, 0],
                      scaleX: [0.7, 1.1, 1],
                    }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                    className="absolute top-[52.5%] left-[43.5%] w-16 h-7 bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent blur-[5px] pointer-events-none rounded-full"
                  />
                </>
              )}

              {/* Cinematic Framing Brackets */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === 'lock' || stage === 'smile' ? 0.6 : 0.2 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-6 pointer-events-none border border-white/10 rounded-2xl"
              >
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-emerald-500" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-emerald-500" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Minimal Editorial Telemetry HUD */}
          <div className="relative z-10 text-center space-y-2 mt-6 max-w-[360px] w-full px-6">
            <div className="text-[11px] font-mono tracking-[0.2em] text-[#10b981] flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              <span>{statusText}</span>
            </div>

            {/* Welcome Typography Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: stage === 'welcome' ? 1 : 0,
                y: stage === 'welcome' ? 0 : 10,
              }}
              transition={{ duration: 0.6 }}
              className="text-[12px] font-mono font-bold tracking-[0.25em] text-white uppercase pt-1"
            >
              WELCOME // SUDHIR GUNNAM
            </motion.div>

            {/* Skip hint */}
            <div className="text-[9px] font-mono text-white/30 pt-3">
              [ CLICK OR PRESS ESC TO ENTER ]
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
