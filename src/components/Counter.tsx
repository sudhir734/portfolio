import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: string;
  duration?: number;
}

export default function Counter({ value, duration = 1.2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('00');

  useEffect(() => {
    if (!inView) return;

    // Extract numeric part and suffix
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const padLength = match[1].length;

    let startTime: number | null = null;

    const updateCounter = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNum = Math.floor(easeProgress * targetNum);
      const padded = currentNum.toString().padStart(padLength, '0');

      setDisplayValue(`${padded}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [inView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}
