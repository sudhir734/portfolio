import { motion } from 'framer-motion';

interface FilmAtmosphereProps {
  lightingState?: 'emerald' | 'cyan' | 'crimson' | 'charcoal' | 'white';
}

export default function FilmAtmosphere({ lightingState = 'emerald' }: FilmAtmosphereProps) {
  const getLightColors = () => {
    switch (lightingState) {
      case 'cyan':
        return 'from-cyan-500/10 via-blue-600/5 to-transparent';
      case 'crimson':
        return 'from-rose-500/10 via-red-600/5 to-transparent';
      case 'charcoal':
        return 'from-zinc-500/10 via-slate-600/5 to-transparent';
      case 'white':
        return 'from-white/10 via-zinc-400/5 to-transparent';
      case 'emerald':
      default:
        return 'from-emerald-500/10 via-teal-600/5 to-transparent';
    }
  };

  return (
    <>
      {/* Film Grain Layer */}
      <div className="film-grain" />

      {/* Cinematic Vignette */}
      <div className="cinema-vignette" />

      {/* Dynamic Ambient Atmospheric Glow */}
      <motion.div
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b ${getLightColors()} blur-[140px] pointer-events-none z-0 transition-colors duration-1000`}
      />
    </>
  );
}
