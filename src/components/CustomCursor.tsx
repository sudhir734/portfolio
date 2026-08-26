import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 32, stiffness: 200, mass: 0.25 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cursor="project"]')) {
        setCursorType('project');
      } else if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('.cursor-pointer') ||
        target?.closest('[role="button"]')
      ) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Trailing Ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'project' ? 84 : cursorType === 'hover' ? 44 : 28,
          height: cursorType === 'project' ? 84 : cursorType === 'hover' ? 44 : 28,
          borderColor:
            cursorType === 'project'
              ? 'rgba(16, 185, 129, 0.8)'
              : cursorType === 'hover'
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(255, 255, 255, 0.25)',
          backgroundColor:
            cursorType === 'project'
              ? 'rgba(16, 185, 129, 0.12)'
              : cursorType === 'hover'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        className="rounded-full border backdrop-blur-[1px] flex items-center justify-center"
      >
        {cursorType === 'project' && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#10b981] uppercase">
            INSPECT
          </span>
        )}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'project' ? 0 : cursorType === 'hover' ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className="w-1.5 h-1.5 rounded-full bg-white"
      />
    </div>
  );
}
