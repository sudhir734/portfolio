import { motion, type Variants } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function KineticText({ text, className = '', delay = 0 }: KineticTextProps) {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: '0%',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className={`overflow-hidden flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block leading-[1.05]">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
