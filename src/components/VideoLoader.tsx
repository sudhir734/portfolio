import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface VideoLoaderProps {
  onComplete: () => void;
}

export default function VideoLoader({ onComplete }: VideoLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING_SECURITY_FEED');
  const [hexCode, setHexCode] = useState('0x7F4A99');
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth 3D Mouse Parallax with Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 24, stiffness: 220, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-300, 300], [-18, 8]);
  const parallaxY = useTransform(smoothY, [-300, 300], [16, -4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleFinish = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setProgress(100);
    setStatusText('ACCESS_GRANTED // SUDHIR_GUNNAM');
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  useEffect(() => {
    // Dynamic Hex Stream
    const hexInterval = setInterval(() => {
      const chars = '0123456789ABCDEF';
      let res = '0x';
      for (let i = 0; i < 6; i++) {
        res += chars[Math.floor(Math.random() * 16)];
      }
      setHexCode(res);
    }, 100);

    const video = videoRef.current;
    if (video) {
      const setPlayback = () => {
        try {
          video.playbackRate = 2.0; // Locked 2x Speed
        } catch (e) {}
      };

      video.addEventListener('loadedmetadata', setPlayback);
      video.addEventListener('canplay', setPlayback);
      video.addEventListener('play', setPlayback);

      // Silky Smooth Progress Loop
      const updateLoop = () => {
        if (video && video.duration && !isNaN(video.duration) && video.duration > 0) {
          const current = video.currentTime;
          const total = video.duration;
          const pct = Math.min(100, Math.round((current / total) * 100));
          setProgress(pct);

          if (pct < 25) {
            setStatusText('INITIALIZING_SECURITY_FEED');
          } else if (pct < 65) {
            setStatusText('DECRYPTING_BIOMETRIC_TELEMETRY');
          } else if (pct < 95) {
            setStatusText('CLEARANCE_VERIFIED // SUDHIR_GUNNAM');
          } else {
            setStatusText('ACCESS_GRANTED // LAUNCHING_SYSTEM');
          }
        }
        animFrameRef.current = requestAnimationFrame(updateLoop);
      };

      video.play().then(() => {
        setPlayback();
        animFrameRef.current = requestAnimationFrame(updateLoop);
      }).catch(() => {
        video.muted = true;
        video.play().then(() => {
          setPlayback();
          animFrameRef.current = requestAnimationFrame(updateLoop);
        }).catch(() => {});
      });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === ' ') {
          handleFinish();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
        clearInterval(hexInterval);
        video.removeEventListener('loadedmetadata', setPlayback);
        video.removeEventListener('canplay', setPlayback);
        video.removeEventListener('play', setPlayback);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      const t = setTimeout(() => handleFinish(), 2000);
      return () => {
        clearInterval(hexInterval);
        clearTimeout(t);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onMouseMove={handleMouseMove}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(8px)',
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#fafafa] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 overflow-hidden select-none"
        >
          {/* Architectural Background Grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #000 1.5px, transparent 1.5px), linear-gradient(to bottom, #000 1.5px, transparent 1.5px)',
              backgroundSize: '72px 72px',
            }}
          />

          {/* Ambient Spotlight Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-35"
            style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.06) 0%, rgba(22,163,74,0.04) 40%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Top Brand Header Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-[1240px] flex items-center justify-between z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-[#080808] rotate-45 flex items-center justify-center shrink-0 shadow-sm">
                <div className="w-1.5 h-1.5 bg-white" />
              </div>
              <span className="text-[12px] font-black tracking-[0.18em] uppercase text-[#080808]">
                SUDHIR GUNNAM
              </span>
              <span className="text-[#cccccc] text-xs">/</span>
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#444444] font-mono hidden xs:inline">
                SECURITY INTERFACE
              </span>
            </div>

            {/* Top Right Live Telemetry Chip */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#dcdcdc] shadow-xs font-mono text-[10px] font-bold text-[#222]">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping" />
                <span>HASH: {hexCode}</span>
              </div>
              <div className="w-6 h-6 border-2 border-[#080808] rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#080808]" />
              </div>
            </div>
          </motion.div>

          {/* Center: Dynamic Framer Motion 3D Video Frame */}
          <div className="relative w-full max-w-[840px] aspect-video perspective-[1400px] flex items-center justify-center my-auto px-2">
            <motion.div
              style={{
                x: parallaxX,
                y: parallaxY,
                transformStyle: 'preserve-3d',
              }}
              initial={{
                rotateX: 32,
                rotateY: -24,
                rotateZ: -5,
                scale: 0.78,
                opacity: 0,
                y: 35,
              }}
              animate={{
                rotateX: progress > 85 ? 0 : progress > 45 ? 10 : 26,
                rotateY: progress > 85 ? 0 : progress > 45 ? -8 : -20,
                rotateZ: progress > 85 ? 0 : progress > 45 ? -1 : -4,
                scale: progress > 85 ? 1.02 : progress > 45 ? 0.98 : 0.88,
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full h-full rounded-[20px] sm:rounded-[26px] md:rounded-[28px] overflow-hidden border-2 border-[#111111] shadow-[0_28px_70px_rgba(0,0,0,0.18),0_0_40px_rgba(22,163,74,0.06)] bg-[#080808]"
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                src="./loader.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleFinish}
                onError={handleFinish}
                className="w-full h-full object-cover"
              />

              {/* Framer Motion Iridescent Flare Sweep */}
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2.0,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 0.5,
                }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] blur-[12px]"
              />

              {/* Corner Cyber Brackets */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-4 h-4 border-t-2 border-l-2 border-white pointer-events-none" />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 border-t-2 border-r-2 border-white pointer-events-none" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-4 h-4 border-b-2 border-l-2 border-white pointer-events-none" />
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-4 h-4 border-b-2 border-r-2 border-white pointer-events-none" />

              {/* Top-Left Clearance Badge */}
              <div className="absolute top-3 left-8 sm:top-4 sm:left-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/10 flex items-center gap-2 pointer-events-none shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-[#080808] uppercase">
                  SECURITY CLEARANCE VERIFIED
                </span>
              </div>

              {/* Bottom-Right Live Speed & Telemetry Tag */}
              <div className="absolute bottom-3 right-8 sm:bottom-4 sm:right-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 hidden sm:flex items-center gap-2 pointer-events-none text-[9px] font-mono font-bold text-[#4ade80]">
                <span>2X SPEED</span>
                <span className="text-white/60">//</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Telemetry & Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative z-10 text-center space-y-2.5 sm:space-y-3 max-w-[360px] w-full px-4 mb-2 sm:mb-4"
          >
            {/* Real-Time Status Text */}
            <div className="flex items-center justify-between text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#080808]">
              <span className="flex items-center gap-2 truncate max-w-[260px]">
                <span className="w-2 h-2 rounded-full bg-[#080808] animate-ping shrink-0" />
                {statusText}
              </span>
              <span className="font-mono text-[12px] font-black">{progress}%</span>
            </div>

            {/* Silky-Smooth Progress Bar */}
            <div className="w-full h-1.5 bg-[#e0e0e0] rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-[#080808] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Skip Button */}
            <div className="pt-1.5">
              <button
                onClick={handleFinish}
                className="inline-flex items-center gap-2 bg-[#080808] text-white text-[11px] font-black tracking-[0.14em] uppercase px-7 py-2 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:bg-[#1f1f1f] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>SKIP [ESC]</span>
                <span className="text-[9px]">◆</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
