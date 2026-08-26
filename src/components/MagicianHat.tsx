interface MagicianHatProps {
  className?: string;
  rotation?: number;
  scale?: number;
}

export default function MagicianHat({ className = '', rotation = 0, scale = 1 }: MagicianHatProps) {
  return (
    <div
      className={`absolute ${className} select-none pointer-events-none`}
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.45))',
      }}
    >
      {/* Precision Tiny Magician Top Hat */}
      <svg
        viewBox="0 0 60 55"
        className="w-9 h-8 select-none pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cylinder Crown Gradient */}
          <linearGradient id="magicCrown" x1="16" y1="6" x2="44" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2e2e2e" />
            <stop offset="35%" stopColor="#181818" />
            <stop offset="75%" stopColor="#080808" />
            <stop offset="100%" stopColor="#020202" />
          </linearGradient>

          {/* Magician Hat Flat Top Gradient */}
          <linearGradient id="magicTop" x1="18" y1="5" x2="42" y2="13" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#383838" />
            <stop offset="50%" stopColor="#222222" />
            <stop offset="100%" stopColor="#101010" />
          </linearGradient>

          {/* Curved Brim Gradient */}
          <linearGradient id="magicBrim" x1="4" y1="36" x2="56" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#282828" />
            <stop offset="40%" stopColor="#121212" />
            <stop offset="100%" stopColor="#040404" />
          </linearGradient>

          {/* Ribbon Band Gradient */}
          <linearGradient id="magicBand" x1="16" y1="32" x2="44" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="50%" stopColor="#111111" />
            <stop offset="100%" stopColor="#202020" />
          </linearGradient>
        </defs>

        {/* Ambient Under-Brim Shadow */}
        <ellipse cx="30" cy="43" rx="27" ry="6.5" fill="#000000" opacity="0.8" />

        {/* Wide Curved Magician Brim with Upturned Edge */}
        <path
          d="M3 41 C 6 32, 54 32, 57 41 C 54 50, 6 50, 3 41 Z"
          fill="url(#magicBrim)"
          stroke="#383838"
          strokeWidth="0.5"
        />

        {/* Brim Specular Reflection */}
        <path
          d="M8 39 C 16 35, 44 35, 52 39"
          stroke="#555555"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Tall Cylinder Top Hat Crown Body */}
        <path
          d="M17 38 L 19 10 L 41 10 L 43 38 Z"
          fill="url(#magicCrown)"
          stroke="#303030"
          strokeWidth="0.5"
        />

        {/* Magician Hat Flat Oval Top */}
        <ellipse
          cx="30"
          cy="10"
          rx="11"
          ry="4"
          fill="url(#magicTop)"
          stroke="#404040"
          strokeWidth="0.5"
        />

        {/* Silk Ribbon Band */}
        <path
          d="M17.5 33 C 22 35, 38 35, 42.5 33 L 42.8 38 C 38 40, 22 40, 17.2 38 Z"
          fill="url(#magicBand)"
          stroke="#333333"
          strokeWidth="0.4"
        />

        {/* Minimalist White/Silver Diamond Pin on Band */}
        <polygon points="22,35.5 23.5,33.5 25,35.5 23.5,37.5" fill="#ffffff" />
      </svg>
    </div>
  );
}
